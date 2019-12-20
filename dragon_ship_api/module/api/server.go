/**
@Name : chenwei
@Time : 2019/12/13 11:36 下午
**/
package api

import (
	"dragon_ship_api/component/config"
	"dragon_ship_api/component/logs"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

func Start() {
	log.Println(" start device ")
	router := gin.Default()
	router.Use(Cors())

	g := router.Group("v1")
	g.Use(cost())
	g.GET("/GetShipInfo", GetShipInfo)
	g.GET("/GetHistoryVoyage", GetHistoryVoyage)
	g.GET("/GetCurrentVoyage", GetCurrentVoyage)
	g.GET("/GetHistoryTrack", GetHistoryTrack)
	g.POST("/SyncShipLatestInfo", SyncShipLatestInfo)
	log.Println(" serverAddr : ", config.Config.Base.HttpAddr)

	server := &http.Server{
		Addr:    config.Config.Base.HttpAddr,
		Handler: router,
	}
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("start server error,", err)
		}
	}()
}
func cost() gin.HandlerFunc {
	return func(c *gin.Context) {
		t0 := time.Now()
		c.Next()
		logs.RunLog.Info("cost:", time.Now().Sub(t0).String())
	}
}
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,userid,userId,token,openid")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		c.Header("Access-Control-Allow-Credentials", "true")
		//放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		// 处理请求
		c.Next()
	}
}
