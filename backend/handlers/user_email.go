package handlers

import (
	"net/http"

	"fin101/database"
	"fin101/models"

	"github.com/labstack/echo/v4"
)

type AddEmailsRequest struct {
	Emails []string `json:"emails"`
}

func AddUserEmails(c echo.Context) error {
	var req AddEmailsRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	}

	userID := c.Get("user_id").(uint)
	userEmails := []models.UserEmail{}
	for _, email := range req.Emails {
		userEmail := models.UserEmail{
			Email:  email,
			UserID: userID,
		}
		userEmails = append(userEmails, userEmail)

		if err := database.DB.Create(&userEmail).Error; err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Failed to add email")
		}
	}

	return c.JSON(http.StatusCreated, userEmails)
}

func GetUserEmails(c echo.Context) error {
	userID := c.Get("user_id").(uint)
	var user models.User

	if err := database.DB.Preload("UserEmails").First(&user, userID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	return c.JSON(http.StatusOK, user.UserEmails)
}

func DeleteUserEmail(c echo.Context) error {
	userID := c.Get("user_id").(uint)
	emailID := c.Param("id")

	var userEmail models.UserEmail
	if err := database.DB.Where("id = ? AND user_id = ?", emailID, userID).First(&userEmail).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Email not found")
	}

	if err := database.DB.Delete(&userEmail).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete email")
	}

	return c.NoContent(http.StatusNoContent)
}
