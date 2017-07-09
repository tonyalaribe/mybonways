package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/markbates/validate/validators"
	"github.com/satori/go.uuid"
)

type Reservation struct {
	ID        uuid.UUID `json:"id" db:"id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	PromoID   uuid.UUID `json:"promo_id" db:"promo_id"`
	PromoSlug string    `json:"promo_slug" db:"promo_slug"`
}

// String is not required by pop and may be deleted
func (r Reservation) String() string {
	jr, _ := json.Marshal(r)
	return string(jr)
}

// Reservations is not required by pop and may be deleted
type Reservations []Reservation

// String is not required by pop and may be deleted
func (r Reservations) String() string {
	jr, _ := json.Marshal(r)
	return string(jr)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (r *Reservation) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.Validate(
		&validators.StringIsPresent{Field: r.PromoSlug, Name: "PromoSlug"},
	), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (r *Reservation) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (r *Reservation) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}
