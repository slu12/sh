/**
@Name : chenwei
@Time : 2019/12/10 11:55 下午
**/
package main

import (
	"dragon_ship_api/shapis"
	"log"
)

func main() {
	res, err := shapis.QueryShip("福远渔")
	log.Println(string(res), err)
}
