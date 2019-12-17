/**
@Name : chenwei
@Time : 2019/12/13 11:38 下午
**/
package api

import (
	"dragon_ship_api/module/jobs"
	"dragon_ship_api/module/shipapis"
	"github.com/gin-gonic/gin"
)

/**
实时GPS点：船舶基本信息及最新船位查询服务
*/
func GetShipInfo(c *gin.Context) {
	shipid := c.Query("shipid")
	list, err := shipapis.GetShipLatestInformation(shipid)
	if err != nil {
		c.JSON(400, err.Error())
	} else {
		c.JSON(200, list)
	}
}

/**
历史航次信息：船舶历史航次查询服务
*/
func GetHistoryVoyage(c *gin.Context) {
	shipid := c.Query("shipid")
	startUtcTime := c.Query("startUtcTime")
	endUtcTime := c.Query("endUtcTime")
	list, err := shipapis.GetShipHistoryVoyage(shipid, startUtcTime, endUtcTime, "")
	if err != nil {
		c.JSON(400, err.Error())
	} else {
		c.JSON(200, list)
	}
}

/**
查询最新的航次信息：船舶当前航次查询服务
*/
func GetCurrentVoyage(c *gin.Context) {
	shipid := c.Query("shipid")
	list, err := shipapis.GetShipCurrentVoyage(shipid, "")
	if err != nil {
		c.JSON(400, err.Error())
	} else {
		c.JSON(200, list)
	}
}

/**
历史轨迹：船舶历史轨迹查询服务
*/
func GetHistoryTrack(c *gin.Context) {
	shipid := c.Query("shipid")
	startUtcTime := c.Query("startUtcTime")
	endUtcTime := c.Query("endUtcTime")
	list, err := shipapis.GetShipHistoryTrack(shipid, startUtcTime, endUtcTime)
	if err != nil {
		c.JSON(400, err.Error())
	} else {
		c.JSON(200, list)
	}
}

/**
同步数据
*/
func SyncShipLatestInfo(c *gin.Context) {
	shipids := c.Query("shipids")
	err := jobs.UpdateShipPosition(shipids)
	if err != nil {
		c.JSON(400, err.Error())
	} else {
		c.JSON(200, "success")
	}
}
func syncShipHistoryTrack() {

}
func syncShipHistoryVoyage() {

}
func syncShipCurrentVoyage() {

}
func syncShipListByRect() {

}
func syncShipByNear() {

}
