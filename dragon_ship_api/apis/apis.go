/**
@Name : chenwei
@Time : 2019/12/10 11:48 下午
**/
package apis

import (
	"dragon_ship_api/tool"
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

func QueryShip(term string) ([]byte, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("term", term)
	p.Add("key", token)
	return tool.HttpGet(getShipIdUrl + p.Encode())
}

func getShipBasicInformation(shipid string) ([]byte, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	return tool.HttpGet(getShipBasicInformationUrl + p.Encode())
}
func getShipLatest(shipid string) ([]byte, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	return tool.HttpGet(getShipLatestUrl + p.Encode())
}
func getShipLatestInformation(shipid string) ([]byte, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	return tool.HttpGet(getShipLatestInformationUrl + p.Encode())
}
func getShipHistoryTrack(shipid, startUtcTime, endUtcTime string) ([]byte, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	p.Add("startUtcTime", startUtcTime)
	p.Add("endUtcTime", endUtcTime)
	return tool.HttpGet(getShipHistoryTrackUrl + p.Encode())
}
func getShipHistoryVoyage(shipid, startUtcTime, endUtcTime, language string) ([]byte, error) {
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
	return tool.HttpGet(getShipHistoryVoyageUrl + p.Encode())
}
func getShipCurrentVoyage(shipid, language string) ([]byte, error) {
	token := getToken()
	if language == "" {
		language = "cn"
	}
	var p = url.Values{}
	p.Add("shipid", shipid)
	p.Add("key", token)
	p.Add("language", language)
	return tool.HttpGet(getShipCurrentVoyageUrl + p.Encode())
}
func getShipListByRect(shipid, xmin, ymin, xmax, ymax, hour string) ([]byte, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("key", token)
	p.Add("xmin", xmin)
	p.Add("ymin", ymin)
	p.Add("xmax", xmax)
	p.Add("ymax", ymax)
	p.Add("hour", hour)
	return tool.HttpGet(getShipListByRectUrl + p.Encode())
}
func getShipByNear(shipid, lon, lat, distance string) ([]byte, error) {
	token := getToken()
	var p = url.Values{}
	p.Add("key", token)
	p.Add("shipid", shipid)
	p.Add("lon", lon)
	p.Add("lat", lat)
	p.Add("distance", distance)
	return tool.HttpGet(getShipByNearUrl + p.Encode())
}
