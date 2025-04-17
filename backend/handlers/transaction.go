package handlers

import (
	"net/http"
	"time"

	"fin101/database"
	"fin101/models"

	"github.com/labstack/echo/v4"
)

type CreateTransactionRequest struct {
	Category models.TransactionCategory `json:"category"`
	Type     models.TransactionType     `json:"type"`
	Amount   float64                    `json:"amount"`
	BankName models.BankName            `json:"bank_name"`
}

func CreateTransaction(c echo.Context) error {
	var req CreateTransactionRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	}

	userID := c.Get("user_id").(uint)
	transaction := models.Transaction{
		Category:  req.Category,
		Type:      req.Type,
		Amount:    req.Amount,
		BankName:  req.BankName,
		UserID:    userID,
		CreatedAt: time.Now(),
	}

	if err := database.DB.Create(&transaction).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create transaction")
	}

	return c.JSON(http.StatusCreated, transaction)
}

func GetTransactions(c echo.Context) error {
	userID := c.Get("user_id").(uint)
	var transactions []models.Transaction

	if err := database.DB.Where("user_id = ?", userID).Find(&transactions).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to fetch transactions")
	}

	return c.JSON(http.StatusOK, transactions)
}
