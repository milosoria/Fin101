package main

import (
	"fin101/database"
	"fin101/handlers"
	"fin101/middleware"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		panic("Error loading .env file")
	}

	// Initialize database
	database.InitDB()

	// Create Echo instance
	e := echo.New()

	// Middleware
	e.Use(echomiddleware.Logger())
	e.Use(echomiddleware.Recover())
	e.Use(echomiddleware.CORS())

	// Routes
	e.POST("/signup", handlers.Signup)
	e.POST("/login", handlers.Login)
	e.POST("/webhook/cloud-mailin", handlers.HandleCloudMailin)

	// Protected routes
	api := e.Group("/api")
	api.Use(middleware.JWTAuth())
	{
		api.POST("/transactions", handlers.CreateTransaction)
		api.GET("/transactions", handlers.GetTransactions)
		api.POST("/emails", handlers.AddUserEmails)
		api.GET("/emails", handlers.GetUserEmails)
		api.DELETE("/emails/:id", handlers.DeleteUserEmail)
	}

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
