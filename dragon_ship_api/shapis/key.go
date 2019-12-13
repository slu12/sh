/**
@Name : chenwei
@Time : 2019/12/11 12:01 上午
**/
package shapis

import (
	"dragon_ship_api/tool"
	"encoding/json"
	"log"
)

const KEY = "6eaba9892bfb40feaa9a7998d10dba75"

var seed = ""
var token = ""

func getSeed() string {
	if seed == "" {
		res, err := getComKey()
		if err != nil {
			log.Println("getComKey error:", err.Error())
			return ""
		}
		m := make(map[string]string)
		json.Unmarshal(res, &m)
		seed = m["seedStr"]
	}
	return seed
}
func getComKey() ([]byte, error) {
	url := "http://api.shipdt.com/DataApiServer/getComKey"
	res, err := tool.HttpPostUrlEncode(url, nil)
	if err != nil {
		log.Println("post error:", err.Error())
	}
	return res, err
}
func getToken() string {
	// todo update seed
	if token == "" {
		sd := getSeed()
		token = tool.Md5(sd + KEY)
	}
	return token
}
