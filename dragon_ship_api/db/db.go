package db

import (
	"dragon_ship_api/iniUtil"
	"dragon_ship_api/model"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
)

var Db *gorm.DB

func init() {
	log.Println("init db")
	var err error
	mysqlConn := iniUtil.GetString("mysqlConn")
	Db, err = gorm.Open("mysql", mysqlConn)
	//Db, err = gorm.Open("mysql", "root:123456@/kt_test?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	// 使用单数表名
	Db.SingularTable(true)
	Db.AutoMigrate(&model.ShipInfo{})
	//Db.AutoMigrate(&model.AwardConf{})
	//Db.AutoMigrate(&model.CommonConf{})
	//Db.AutoMigrate(&model.Area{})
	//Db.AutoMigrate(&model.Shop{},&model.Ad{},&model.Admin{},&model.Screen{},&model.ScreenAd{})
	//Db.AutoMigrate(&model.Ad{})
	Db.LogMode(true)
}
