/**
@Name : chenwei
@Time : 2019/12/15 11:15 下午
**/
package model

import (
	"strconv"
	"time"
)

type ClGps struct {
	Zdbh        string    `gorm:"primary_key;column:ZDBH",json:"mmsi"`
	JD          string    `gorm:"JD",json:"longitude"`
	WD          string    `gorm:"WD",json:"latitude"`
	FXJ         float64   `gorm:"FXJ",json:"heading"`
	YXSD        string    `gorm:"YXSD",json:"speed"`
	COURSE      string    `gorm:"COURSE",json:"course"`
	NAVSTATUS   string    `gorm:"NAVSTATUS",json:"navStatus"`
	TEMPERATURE string    `gorm:"TEMPERATURE",json:""`
	GSM         string    `gorm:"GSM",json:""`
	CJSJ        time.Time `gorm:"CJSJ",json:"CJSJ"`
}

func MapToClGps(m map[string]interface{}) *ClGps {
	mmsi := m["mmsi"].(string)
	longitude := m["longitude"].(float64)
	latitude := m["latitude"].(float64)
	headingStr := m["heading"].(string)
	speed := m["speed"].(string)
	course := m["course"].(string)
	navStatus := m["navStatus"].(string)
	postime := m["postime"].(int64)
	if longitude < 0 {
		longitude = 0
	} else {
		longitude = longitude / 1e4 / 60
	}
	if latitude < 0 {
		latitude = 0
	} else {
		latitude = latitude / 1e4 / 60
	}

	heading, err := strconv.ParseFloat(headingStr, 64)
	if err != nil {
		heading = 0
	}
	//t := time.Now()
	t := time.Unix(postime, 0)
	c := ClGps{
		Zdbh:        mmsi,
		JD:          strconv.FormatFloat(longitude, 'E', -1, 64),
		WD:          strconv.FormatFloat(latitude, 'E', -1, 64),
		FXJ:         heading,
		YXSD:        speed,
		COURSE:      course,
		NAVSTATUS:   navStatus,
		TEMPERATURE: "",
		GSM:         "",
		CJSJ:        t,
	}
	return &c
}
