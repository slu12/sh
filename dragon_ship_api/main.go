/**
@Name : chenwei
@Time : 2019/12/15 11:44 上午
**/
package main

import (
	"dragon_ship_api/config"
	"flag"
	"log"
)

var env string

func main() {
	flag.StringVar(&env, "e", "test", "environment")
	flag.Parse()
	config.Load(env)
	log.Println(config.Config.User)
}
