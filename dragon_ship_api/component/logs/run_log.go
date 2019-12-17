/**
@Name : chenwei
@Time : 2019/12/15 3:03 下午
**/
package logs

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/logger"
)

var RunLog *logger.Logger

func Init() {
	RunLog = logger.NewLoggo(&logger.LoggerOption{
		RotateCron: config.Config.Log.RotateCron,
		FileName:   config.Config.Log.FileName,
		MaxSize:    config.Config.Log.MaxSize,
		Compress:   true,
		Console:    true,
	})
}
