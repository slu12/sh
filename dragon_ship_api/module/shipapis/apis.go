/**
@Name : chenwei
@Time : 2019/12/10 11:48 下午
**/
package shipapis

import (
	"dragon_ship_api/component/logs"
	"dragon_ship_api/component/tool"
	"encoding/json"
	"net/url"
)

const (
	getShipIdUrl                = "http://api.shipdt.com/DataApiServer/getShipId?"
	getShipBasicInformationUrl  = "http://api.shipdt.com/DataApiServer/getShipBasicInformation?"
	getShipLatestUrl            = "http://api.shipdt.com/DataApiServer/getShipLatest?"
	getShipLatestInformationUrl = "http://api.shipdt.com/DataApiServer/getShipLatestInformation?"
	getShipHistoryTrackUrl      = "http://api.shipdt.com/DataApiServer/getShipHistoryTrack?"
	getShipHistoryVoyageUrl     = "http://api.shipdt.com/DataApiServer/getShipHistoryVoyage?"
	getShipCurrentVoyageUrl     = "http://api.shipdt.com/DataApiServer/getShipCurrentVoyage?"
	getShipListByRectUrl        = "http://api.shipdt.com/DataApiServer/getShipListByRect?"
	getShipByNearUrl            = "http://api.shipdt.com/DataApiServer/getShipByNear?"
)

func getApiResult(getUrl string) (*ApiResult, error) {
	body, err := tool.HttpGet(getUrl)
	if err != nil {
		logs.RunLog.Error("getShipId error:", err.Error())
		return nil, err
	}
	res := ApiResult{}
	if err := json.Unmarshal(body, &res); err != nil {
		logs.RunLog.Error("Unmarshal:", err.Error())
		return nil, err
	}
	if res.Status == "1" {
		logs.RunLog.Error("token invalid,try to get a new token")
		GetNewToken()
		return getApiResult(getUrl)
	}
	return &res, nil
}
func getListResult(getUrl string) (*ListResult, error) {
	body, err := tool.HttpGet(getUrl)
	if err != nil {
		logs.RunLog.Error("getShipId error:", err.Error())
		return nil, err
	}
	logs.RunLog.Print("body:", string(body))
	res := ListResult{}
	if err := json.Unmarshal(body, &res); err != nil {
		logs.RunLog.Error("Unmarshal:", err.Error())
		return nil, err
	}
	//if res.Status == "1" {
	//	logs.RunLog.Error("token invalid,try to get a new token")
	//	GetNewToken()
	//	return getListResult(getUrl)
	//}
	return &res, nil
}
func QueryShip(term string) (*ApiResult, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("term", term)
	p.Add("key", token)
	return getApiResult(getShipIdUrl + p.Encode())
}

func GetShipBasicInformation(shipid string) (*ListResult, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	return getListResult(getShipBasicInformationUrl + p.Encode())
}
func GetShipLatest(shipid string) (*ListResult, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	return getListResult(getShipLatestUrl + p.Encode())
}
func GetShipLatestInformation(shipid string) (*ListResult, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	return getListResult(getShipLatestInformationUrl + p.Encode())
}
func GetShipHistoryTrack(shipid, startUtcTime, endUtcTime string) (*ListResult, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	p.Add("startUtcTime", startUtcTime)
	p.Add("endUtcTime", endUtcTime)
	return getListResult(getShipHistoryTrackUrl + p.Encode())
}
func GetShipHistoryVoyage(shipid, startUtcTime, endUtcTime, language string) (*ListResult, error) {
	token := getToken()
	if language == "" {
		language = "cn"
	}
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	p.Add("startUtcTime", startUtcTime)
	p.Add("endUtcTime", endUtcTime)
	p.Add("language", language)
	return getListResult(getShipHistoryVoyageUrl + p.Encode())
}
func GetShipCurrentVoyage(shipid, language string) (*ApiResult, error) {
	token := getToken()
	if language == "" {
		language = "cn"
	}
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	p.Add("language", language)
	return getApiResult(getShipCurrentVoyageUrl + p.Encode())
}
func GetShipListByRect(shipid, xmin, ymin, xmax, ymax, hour string) (*ListResult, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("key", token)
	p.Add("xmin", xmin)
	p.Add("ymin", ymin)
	p.Add("xmax", xmax)
	p.Add("ymax", ymax)
	p.Add("hour", hour)
	return getListResult(getShipListByRectUrl + p.Encode())
}
func GetShipByNear(shipid, lon, lat, distance string) (*ListResult, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("key", token)
	p.Add("shipid", shipid)
	p.Add("lon", lon)
	p.Add("lat", lat)
	p.Add("distance", distance)
	return getListResult(getShipByNearUrl + p.Encode())
}
