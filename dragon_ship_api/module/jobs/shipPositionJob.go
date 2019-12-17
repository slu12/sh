/**
@Name : chenwei
@Time : 2019/12/15 2:35 下午
**/
package jobs

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/db"
	"dragon_ship_api/module/model"
	"dragon_ship_api/module/shipapis"
	"errors"
	"github.com/robfig/cron"
	"log"
	"strings"
)

var shipPositionRunning = false

func StartShipPotisionJob() {
	c := cron.New()
	log.Println("rotate cron:", config.Config.Cron.ShipPosition)
	c.AddFunc(config.Config.Cron.ShipPosition, func() {
		log.Println("------Start rotate log job")
		if shipPositionRunning {
			log.Println("job not finish wait...")
			return
		}
		shipPositionRunning = true
		if err := updateShipPosition(); err != nil {
			log.Println("rotate error,", err.Error())
		}
		shipPositionRunning = false
	})
	c.Start()
}
func TestUpdateShipPosition(shipids string) error {
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
func updateShipPosition() error {
	shipIds := []string{}
	l := len(shipIds)
	if l == 0 {
		return errors.New("please set the shipids")
	}
	ids := ""
	if len(shipIds) == 1 {
		ids = shipIds[0]
	} else {
		ids = strings.Join(shipIds, ",")
	}
	listRes, err := shipapis.GetShipLatest(ids)
	if err != nil {
		return err
	}
	for _, v := range listRes.Result {
		gpsLs := model.MapToClGpsLs(v)
		db.Db.Model("cl_gps_ls").Save(gpsLs)
	}
	return nil
}
