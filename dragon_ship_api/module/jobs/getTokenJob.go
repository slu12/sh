/**
@Name : chenwei
@Time : 2019/12/18 9:34 下午
**/
package jobs

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/module/shipapis"
	"github.com/robfig/cron"
	"log"
)

var getTokenRunning = false

func StartGetTokenJob() {
	c := cron.New()
	log.Println("GetToken cron:", config.Config.Cron.GetToken)
	c.AddFunc(config.Config.Cron.GetToken, func() {
		log.Println("------Start get token job")
		if getTokenRunning {
			log.Println("job not finish wait...")
			return
		}
		getTokenRunning = true
		shipapis.GetNewToken()
		getTokenRunning = false
	})
	c.Start()
}
