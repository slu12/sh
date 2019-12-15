/**
@Name : chenwei
@Time : 2019/12/13 11:36 下午
**/
package api

import (
	"context"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

func Start() {
	log.Println(" start device ")
	router := gin.Default()
	router.Use(Cors())

	router.POST("/api-wechat/auth", handler.ProcSignature)
	//router.GET("/api-wechat/GetUserInfo", handler.GetUserInfo)
	g := router.Group("v1")

	verifyHandler := new(handler.VerifyHandler).InitHandler(g)
	userInfoHandler := new(handler.WechatUserInfoHandler).InitHandler(g)
	awardHandler := new(handler.AwardHandler).InitHandler(g)
	imgHandler := new(handler.PopularImgHandler).InitHandler(g)
	moudleMap := make(map[string]handler.BaseHandler)
	moudleMap["/verify"] = verifyHandler.BH
	moudleMap["/userInfo"] = userInfoHandler.BH
	moudleMap["/award"] = awardHandler.BH
	moudleMap["/popularImg"] = imgHandler.BH
	for k := range moudleMap {
		v := moudleMap[k]
		g.GET(k, v.GetAll)
		g.GET(k+"/:id", v.GetOne)
		g.POST(k, v.Add)
		g.PUT(k+"/:id", v.Update)
		g.DELETE(k+"/:id", v.Delete)
	}

	serverAddr := iniUtil.GetString("serverAddr")
	log.Println(" serverAddr : ", serverAddr)

	server := &http.Server{
		Addr:    serverAddr,
		Handler: router,
	}
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("start server error,", err)
		}
	}()

	handler.Init()

	// gracefully shutdown
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Shutdown Server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("shuntdown server error", err)
	}
	log.Println("Server exiting")

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
