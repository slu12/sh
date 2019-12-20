/**
@Name : chenwei
@Time : 2019/12/15 2:35 下午
**/
package jobs

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/db"
	"dragon_ship_api/component/logs"
	"dragon_ship_api/module/model"
	"dragon_ship_api/module/shipapis"
	"github.com/robfig/cron"
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
		shipids := config.Config.Base.Shipids
		if err := UpdateShipPosition(shipids); err != nil {
			logs.RunLog.Error("StartShipPotisionJob error,", err.Error())
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
