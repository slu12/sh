/**
@Name : chenwei
@Time : 2019/12/15 2:35 下午
**/
package jobs

import (
	"bytes"
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/db"
	"dragon_ship_api/component/logs"
	"dragon_ship_api/module/model"
	"dragon_ship_api/module/shipapis"
	"github.com/robfig/cron"
	"io/ioutil"
	"os"
	"strings"
)

var shipPositionRunning = false

func StartShipPotisionJob() {
	c := cron.New()
	logs.RunLog.Info("StartShipPotisionJob cron:", config.Config.Cron.ShipPosition)
	c.AddFunc(config.Config.Cron.ShipPosition, func() {
		logs.RunLog.Info("------StartShipPotisionJob")
		if shipPositionRunning {
			logs.RunLog.Info("job not finish wait...")
			return
		}
		shipPositionRunning = true
		getShipInfo()
		shipPositionRunning = false
	})
	c.Start()
}
func UpdateShipPosition(shipids string) error {
	listRes, err := shipapis.GetShipLatest(shipids)
	if err != nil {
		return err
	}
	for _, v := range listRes.Result {
		gpsLs := model.MapToClGpsLs(v)
		db.Db.Model("cl_gps_ls").Create(gpsLs)

		gps := model.MapToClGps(v)
		db.Db.Model("cl_gps").Save(gps)
	}
	return nil
}

//func UpdateShipVoyage(shipid string) error {
//	res, err := shipapis.GetShipCurrentVoyage(shipid,"")
//	if err != nil {
//		return err
//	}
//	return nil
//}
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
			UpdateShipPosition(ids)
			count = 0
			ids = ""
		} else {
			ids += ","
		}
	}
}
