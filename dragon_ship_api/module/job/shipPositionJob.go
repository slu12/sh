/**
@Name : chenwei
@Time : 2019/12/15 2:35 下午
**/
package job

import (
	"dragon_ship_api/component/config"
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
		if err := l.Rotate(); err != nil {
			log.Println("rotate error,", err.Error())
		}
		shipPositionRunning = false
	})
	c.Start()
}
func getShipPosition() {

}
