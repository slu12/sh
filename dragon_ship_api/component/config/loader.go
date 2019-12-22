/**
@Name : chenwei
@Time : 2019/12/15 11:33 上午
**/
package config

import (
	"gopkg.in/ini.v1"
	"log"
)

var Config *AllConfig

func Load(path string) {
	log.Println("path:", path)
	Config = new(AllConfig)
	if err := ini.MapTo(Config, path); err != nil {
		log.Panic("load config fail:", err.Error())
	}
}
