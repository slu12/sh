/**
@Name : chenwei
@Time : 2019/12/15 11:44 上午
**/
package main

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/db"
	"dragon_ship_api/component/logs"
	"dragon_ship_api/module/api"
	"dragon_ship_api/module/jobs"
	"flag"
	"os"
	"os/signal"
	"syscall"
)

var configPath string

func main() {
	flag.StringVar(&configPath, "c", "./conf/cfg_test.ini", "config path")
	flag.Parse()
	config.Load(configPath)
	logs.Init()
	db.Init()
	jobs.StartShipPotisionJob()
	jobs.StartGetTokenJob()
	api.Start()

	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
}
