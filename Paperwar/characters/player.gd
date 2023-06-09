extends CharacterBody2D

@export var speed = 300.0
@export var jump_force = 400.0

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
	if not is_on_floor():
		velocity.y += gravity * delta

	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = -jump_force

	var direction = Input.get_axis("move_left", "move_right")
	if direction:
		velocity.x = direction * speed
		$AnimatedSprite2D.flip_h = true if direction == -1 else false
		$AnimationPlayer.play("walk")
	else:
		velocity.x = move_toward(velocity.x, 0, speed)
		$AnimationPlayer.play("idle")

	move_and_slide()
