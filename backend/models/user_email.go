package models

import (
	"gorm.io/gorm"
)

type UserEmail struct {
	gorm.Model
	Email  string `gorm:"not null" json:"email"`
	UserID uint   `gorm:"not null" json:"user_id"`
	User   User   `gorm:"foreignKey:UserID" json:"-"`
}
