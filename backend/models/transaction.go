package models

import (
	"time"
)

type TransactionType string
type TransactionCategory string
type BankName string

const (
	Egress  TransactionType = "egress"
	Ingress TransactionType = "ingress"
)

const (
	Food          TransactionCategory = "food"
	Transport     TransactionCategory = "transport"
	Entertainment TransactionCategory = "entertainment"
	Utilities     TransactionCategory = "utilities"
	Salary        TransactionCategory = "salary"
	Other         TransactionCategory = "other"
)

const (
	BancoDeChile    BankName = "Banco de Chile"
	BancoEstado     BankName = "Banco Estado"
	BancoSantander  BankName = "Banco Santander"
	BancoBCI        BankName = "Banco BCI"
	BancoItau       BankName = "Banco Itaú"
	BancoScotiabank BankName = "Banco Scotiabank"
	BancoBICE       BankName = "Banco BICE"
	BancoSecurity   BankName = "Banco Security"
	BancoFalabella  BankName = "Banco Falabella"
	BancoConsorcio  BankName = "Banco Consorcio"
	BancoRipley     BankName = "Banco Ripley"
	BancoBBVA       BankName = "Banco BBVA"
	BancoMACH       BankName = "Banco MACH"
	BancoTenpo      BankName = "Banco Tenpo"
)

type Transaction struct {
	ID        uint                `gorm:"primaryKey" json:"id"`
	Category  TransactionCategory `json:"category"`
	Type      TransactionType     `json:"type"`
	Amount    float64             `json:"amount"`
	BankName  BankName            `json:"bank_name"`
	UserID    uint                `json:"user_id"`
	CreatedAt time.Time           `json:"created_at"`
}
