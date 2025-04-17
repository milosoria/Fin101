package database

import (
	"fin101/models"
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	// Check if database exists, if not create it
	dbName := os.Getenv("DB_NAME")
	createDBDsn := fmt.Sprintf("host=%s user=%s password=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_PORT"),
	)
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		dbName,
		os.Getenv("DB_PORT"),
	)

	tempDB, err := gorm.Open(postgres.Open(createDBDsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to postgres:", err)
	}

	var count int64
	tempDB.Raw("SELECT COUNT(*) FROM pg_database WHERE datname = ?", dbName).Scan(&count)

	if count == 0 {
		log.Printf("Database %s does not exist, creating...", dbName)
		createSQL := fmt.Sprintf("CREATE DATABASE %s", dbName)
		if err := tempDB.Exec(createSQL).Error; err != nil {
			log.Fatal("Failed to create database:", err)
		}
		log.Printf("Database %s created successfully", dbName)
	}
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate the schema
	err = db.AutoMigrate(&models.User{}, &models.Transaction{}, &models.UserEmail{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	DB = db
}
