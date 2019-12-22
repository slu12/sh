/**
@Name : chenwei
@Time : 2019/12/21 8:53 下午
**/
package main

import (
	"bytes"
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/db"
	"dragon_ship_api/component/logs"
	"dragon_ship_api/module/model"
	"dragon_ship_api/module/shipapis"
	"flag"
	"io/ioutil"
	"os"
	"strings"
)

var env string

func main() {
	flag.StringVar(&env, "e", "test", "environment")
	flag.Parse()
	config.Load(env)
	logs.Init()
	db.Init()
	getShipInfo()
}
func getShipInfo() {
	f, err := os.Open("./mmis.log")
	if err != nil {
		logs.RunLog.Error("open mmis log fail,err:", err.Error())
		return
	}
	bs, err := ioutil.ReadAll(f)
	if err != nil {
		logs.RunLog.Error("read mmis log fail,err:", err.Error())
		return
	}
	lines := bytes.Split(bs, []byte{'\n'})
	ids := ""
	count := 0
	for _, v := range lines {
		id := string(v)
		id = strings.Trim(id, "\r")
		id = strings.Trim(id, "\n")
		ids += id
		count++
		if count >= 20 {
			list, err := shipapis.GetShipBasicInformation(ids)
			if err != nil {
				logs.RunLog.Error("GetShipBasicInformation error:", err.Error())
				return
			}
			for _, v := range list.Result {
				ship := model.MapToClCl(v)
				db.Db.Model(&ship).Updates(ship)
			}
			count = 0
			ids = ""
		} else {
			ids += ","
		}
	}
}
