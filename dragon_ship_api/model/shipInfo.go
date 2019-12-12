/**
@Name : chenwei
@Time : 2019/12/13 7:29 上午
**/
package model

type ShipInfo struct {
	Imo           string
	Eta           string
	Breadth       string
	Speed         string
	Draught       string
	Postime       string
	Mmsi          string
	Shipname      string
	Callsign      string
	Shiptype      string
	DestPort      string `json:"dest_port"`
	DestStd       string `json:"dest_std"`
	Destcode      string `json:"destcode"`
	NavStatusName string `json:"navStatusName"`
	Course        string `json:"course"`
	Shiptypename  string `json:"shiptypename"`
	Length        string `json:"length"`
	Longitude     int    `json:"longitude"`
	Latitude      int    `json:"latitude"`
	Heading       int    `json:"heading"`
	NavStatus     int    `json:"navStatus"`
}
