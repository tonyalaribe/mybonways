package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/satori/go.uuid"
)

type MerchantPromo struct {
	ID          uuid.UUID `json:"id" db:"id"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
	ItemName    string    `json:"item_name" db:"item_name"`
	CompanyID   string    `json:"company_id" db:"company_id"`
	Category    string    `json:"category" db:"category"`
	OldPrice    int       `json:"old_price" db:"old_price"`
	NewPrice    int       `json:"new_price" db:"new_price"`
	StartDate   time.Time `json:"start_date" db:"start_date"`
	EndDate     time.Time `json:"end_date" db:"end_date"`
	Description string    `json:"description" db:"description"`
	Image1      string    `json:"image_1" db:"image_1"`
	Image2      string    `json:"image_2" db:"image_2"`
	Image3      string    `json:"image_3" db:"image_3"`
	Image4      string    `json:"image_4" db:"image_4"`
}

// String is not required by pop and may be deleted
func (m MerchantPromo) String() string {
	jm, _ := json.Marshal(m)
	return string(jm)
}

// MerchantPromos is not required by pop and may be deleted
type MerchantPromos []MerchantPromo

// String is not required by pop and may be deleted
func (m MerchantPromos) String() string {
	jm, _ := json.Marshal(m)
	return string(jm)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (m *MerchantPromo) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (m *MerchantPromo) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (m *MerchantPromo) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}