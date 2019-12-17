package db

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/module/model"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
)

var Db *gorm.DB

func Init() {
	log.Println("init db")
	var err error
	mysqlConn := config.Config.Mysql.Conn
	Db, err = gorm.Open("mysql", mysqlConn)
	//Db, err = gorm.Open("mysql", "root:123456@/kt_test?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	// 使用单数表名
	Db.SingularTable(true)
	Db.AutoMigrate(&model.ClGpsLs{})
	Db.LogMode(true)
}
