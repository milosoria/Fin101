package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email      string      `gorm:"unique;not null" json:"email"`
	Password   string      `gorm:"not null" json:"-"`
	UserEmails []UserEmail `gorm:"foreignKey:UserID" json:"user_emails"`
}
