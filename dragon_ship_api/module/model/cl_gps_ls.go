/**
@Name : chenwei
@Time : 2019/12/15 11:15 下午
**/
package model

type ClGpsLs struct {
	Zdbh        string  `gorm:"ZDBH",json:"mmsi"`
	JD          string  `gorm:"JD",json:"longitude"`
	WD          string  `gorm:"WD",json:"latitude"`
	FXJ         float32 `gorm:"FXJ",json:"heading"`
	YXSD        string  `gorm:"YXSD",json:"speed"`
	COURSE      string  `gorm:"COURSE",json:"course"`
	NAVSTATUS   string  `gorm:"NAVSTATUS",json:"navStatus"`
	TEMPERATURE string  `gorm:"TEMPERATURE",json:""`
	GSM         string  `gorm:"GSM",json:""`
}
