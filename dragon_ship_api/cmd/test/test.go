/**
@Name : chenwei
@Time : 2019/12/10 11:55 下午
**/
package main

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/db"
	"dragon_ship_api/component/logs"
	"dragon_ship_api/module/jobs"
	"dragon_ship_api/module/shipapis"
	"flag"
	"os"
	"os/signal"
	"syscall"
	"time"
)

var ids string
var operation string
var st string
var et string

var tk = time.NewTicker(5 * time.Second)

var configPath string

func main() {
	flag.StringVar(&configPath, "c", "./conf/cfg_test.ini", "config path")
	flag.StringVar(&operation, "o", "ShipLatest", "operation")
	flag.StringVar(&ids, "ids", "", "ids")
	flag.StringVar(&st, "st", "1511008577", "st")
	flag.StringVar(&et, "et", "1512972577", "et")
	flag.Parse()
	config.Load(configPath)
	db.Init()
	logs.Init()

	switch operation {
	case "HistoryTrack":
		shipapis.GetShipHistoryTrack(ids, st, et)
	case "HistoryVoyage":
		shipapis.GetShipHistoryVoyage(ids, st, et, "")
	case "ShipLatest":
		go startTk()
	}

	//testGetShipPosition(ids)
	//res, err := shapis.QueryShip("福远渔")
	//log.Println(string(res), err)

	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
}
func testGetShipHistoryTrack() {
	//list, err := shipapis.GetShipHistoryTrack(ids, st, et)

}
func testGetShipPosition(ids string) {
	jobs.UpdateShipPosition(ids)
}
func startTk() {
	for {
		select {
		case <-tk.C:
			testGetShipPosition(ids)
		}
	}
}
