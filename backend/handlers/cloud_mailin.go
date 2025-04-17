package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type CloudMailinRequest struct {
	Headers struct {
		To      string `json:"to"`
		From    string `json:"from"`
		Subject string `json:"subject"`
	} `json:"headers"`
	Plain string `json:"plain"`
	HTML  string `json:"html"`
}

func HandleCloudMailin(c echo.Context) error {
	var req CloudMailinRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	}

	// Print the received email content
	c.Logger().Printf("Received email from Cloud Mailin:")
	c.Logger().Printf("To: %s", req.Headers.To)
	c.Logger().Printf("From: %s", req.Headers.From)
	c.Logger().Printf("Subject: %s", req.Headers.Subject)
	c.Logger().Printf("Plain text content: %s", req.Plain)
	c.Logger().Printf("HTML content: %s", req.HTML)

	return c.JSON(http.StatusOK, map[string]string{
		"status":  "success",
		"message": "Email received successfully",
	})
}
