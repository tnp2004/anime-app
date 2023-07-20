package repository

type Account struct {
	AccountID  string
	Name       string
	Gender     string
	Age        int
	Money      int
	Image_uri  string
	Created_at string
}

type AccountRepository interface {
	Create(Account) (*Account, error)
	GetAccount(id string) (*Account, error)
}
