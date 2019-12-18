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
	"github.com/robfig/cron"
	"log"
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
		shipids := config.Config.Base.Shipids
		if err := UpdateShipPosition(shipids); err != nil {
			log.Println("rotate error,", err.Error())
		}
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
