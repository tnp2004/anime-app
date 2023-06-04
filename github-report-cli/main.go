package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/fatih/color"
	"github.com/joho/godotenv"
)

type Commit struct {
	CommitInfo struct {
		Committer struct {
			Name string `json:"name"`
			Date string `json:"date"`
		} `json:"committer"`
		Message string `json:"message"`
	} `json:"commit"`
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(".env file couldn't to be loaded")
	}

	tokens := os.Getenv("GITHUB_TOKENS")
	// Github account owner
	owner := "tnp2004"
	// The repository that you want to watch commits
	repo := "poller"

	client := http.Client{}
	endpoint := fmt.Sprintf("https://api.github.com/repos/%s/%s/commits", owner, repo)
	req, err := http.NewRequest("GET", endpoint, nil)
	if err != nil {
		panic(err)
	}
	req.Header = http.Header{
		"Authorization": {"Bearer " + tokens},
	}
	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		panic("Github API not available")
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}
	var commits []Commit
	err = json.Unmarshal(body, &commits)
	if err != nil {
		panic(err)
	}
	for i := len(commits) - 1; i >= 0; i-- {
		commitTime, _ := time.Parse(time.RFC3339, commits[i].CommitInfo.Committer.Date)
		timee := commitTime.Format("Monday, 2 January, 2006 3:04:05 PM")
		text := fmt.Sprintf("🪅%s 🕒%s \n=> %v \n\n", commits[i].CommitInfo.Committer.Name, timee, commits[i].CommitInfo.Message)

		today := time.Now().Format("2006-01-02")
		commitDate := commitTime.Format("2006-01-02")

		if commitDate == today {
			// Highlight today
			color.HiCyan(text)
		} else {
			fmt.Print(text)
		}
	}
}
