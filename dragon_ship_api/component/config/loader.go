/**
@Name : chenwei
@Time : 2019/12/15 11:33 上午
**/
package config

import (
	"fmt"
	"gopkg.in/ini.v1"
	"log"
)

var Config *AllConfig

func Load(env string) {
	p := fmt.Sprintf("./conf/cfg_%s.ini", env)
	log.Println("path:", p)
	Config = new(AllConfig)
	if err := ini.MapTo(Config, p); err != nil {
		log.Panic("load config fail:", err.Error())
	}
}
