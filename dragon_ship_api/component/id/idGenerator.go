/**
@Name : chenwei
@Time : 2019/12/17 10:05 下午
**/
package genid

import (
	"dragon_ship_api/component/logs"
	"github.com/zheng-ji/goSnowFlake"
	"strconv"
)

var worker *goSnowFlake.IdWorker

func init() {
	worker, _ = goSnowFlake.NewIdWorker(1)
}
func NextId() int64 {
	id, err := worker.NextId()
	if err != nil {
		logs.RunLog.Error("gen id error:", err.Error())
		return 0
	}
	return id
}
func NextIdString() string {
	id := NextId()
	return strconv.FormatInt(id, 10)
}
