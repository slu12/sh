package db

import (
	"dragon_ship_api/component/config"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
)

var Db *gorm.DB

func Init() {
	log.Println("init db")
	var err error
	//mysqlConn := config.Config.Mysql.Conn
	//Db, err = gorm.Open("mysql", mysqlConn)
	Db, err = gorm.Open("mysql", "ops_beidou:shen2020HAI!@#@(119.3.78.139:3306)/beidou_platform?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	// 使用单数表名
	Db.SingularTable(true)
	//Db.AutoMigrate(&model.ClGpsLs{})
	Db.LogMode(config.Config.Mysql.LogMode)
}
