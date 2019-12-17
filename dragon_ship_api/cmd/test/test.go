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
	"flag"
)

var env string
var ids string

func main() {
	flag.StringVar(&env, "e", "test", "environment")
	flag.StringVar(&ids, "ids", "", "ids")
	flag.Parse()
	config.Load(env)
	db.Init()
	logs.Init()

	testGetShipPosition(ids)
	//res, err := shapis.QueryShip("福远渔")
	//log.Println(string(res), err)
}
func testGetShipPosition(ids string) {
	jobs.TestUpdateShipPosition(ids)
}
