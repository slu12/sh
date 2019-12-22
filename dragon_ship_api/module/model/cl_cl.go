/**
@Name : chenwei
@Time : 2019/12/21 8:39 下午
**/
package model

import (
	"strconv"
	"time"
)

/**
 */
type ClCl struct {
	CL_ID        string    `gorm:"CL_ID"`                               // '车辆id',
	CPH          string    `gorm:"CPH"`                                 // '车牌号',
	JGDM         string    `gorm:"JGDM"`                                // '机构代码',
	JGMC         string    `gorm:"JGMC"`                                // '机构名称',
	CX           string    `gorm:"CX"`                                  // '车型  字典项：ZDCLK0019：车辆类型 10、小车 20、大车 30、校巴',
	ZKL          float64   `gorm:"ZKL"`                                 // '载客量',
	DL           string    `gorm:"DL"`                                  // '等级',
	CJSJ         time.Time `gorm:"CJSJ"`                                // '创建时间',
	CJR          string    `gorm:"CJR"`                                 // '创建人',
	XGSJ         time.Time `gorm:"XGSJ"`                                // '修改时间',
	XGR          string    `gorm:"XGR"`                                 // '修改人',
	SJ_ID        string    `gorm:"SJ_ID"`                               // '司机id',
	SJXM         string    `gorm:"SJXM"`                                // '司机姓名',
	ZT           string    `gorm:"ZT"`                                  // '状态 字典项：ZDCLK0016  00、正常 10、停用',
	TP           string    `gorm:"TP"`                                  // '图片',
	SCS          string    `gorm:"SCS"`                                 // '生产商',
	XH           string    `gorm:"XH"`                                  // '型号',
	ZDBH         string    `gorm:"ZDBH"`                                // '终端编号',
	CCDJRQ       time.Time `gorm:"CCDJRQ"`                              // '初次登记日期',
	CDBH         string    `gorm:"CDBH"`                                // '车队编号',
	BXGSMC       string    `gorm:"BXGSMC"`                              // '保险公司名称',
	BXSJ         time.Time `gorm:"BXSJ"`                                // '保险时间',
	NSSJ         time.Time `gorm:"NSSJ"`                                // '年审时间',
	OBD_CODE     string    `gorm:"OBD_CODE"`                            // 'OBD编号',
	CJH          string    `gorm:"CJH"`                                 // '车架号',
	SDSX         float64   `gorm:"SDSX"`                                // '速度上限',
	ZDXH         string    `gorm:"ZDXH"`                                // '终端型号',
	FDJH         string    `gorm:"FDJH"`                                // '发动机号',
	ZDZT         string    `gorm:"ZDZT"`                                // '终端状态',
	MMSI         string    `gorm:"primary_key;column:mmsi",json:"mmsi"` // 'MMSI',
	Shipname     string    `gorm:"shipname",json:"shipname"`            // '船舶名称',
	CALLSIGN     string    `gorm:"CALLSIGN",json:"callsign"`            // '船舶呼号',
	IMO          string    `gorm:"IMO",json:"imo"`                      // 'IMO号',
	Shiptype     string    `gorm:"Shiptype",json:"shiptype"`            // '船舶类型',
	Shiptypename string    `gorm:"Shiptypename",json:"shiptypename"`    // '船舶类型名称',
	LENGTH       string    `gorm:"LENGTH",json:"length"`                // '长度',
	BREADTH      string    `gorm:"BREADTH",json:"breadth"`              // '宽度',
	ETA          string    `gorm:"ETA",json:"eta"`                      // '预到时间',
	DEST_PORT    string    `gorm:"DEST_PORT",json:"dest_port"`          // '目的地',
	DRAUGHT      string    `gorm:"DRAUGHT",json:"draught"`              // '吃水',
	NATIONALITY  string    `gorm:"NATIONALITY",json:"nationality"`      // '船籍',
	NavStatus    string    `gorm:"column:navstatus",json:"navStatus"`   // 'navStatus',
	XS           string    `gorm:"XS"`                                  // '型深',
	cbsbh        string    `gorm:"cbsbh"`                               // '船舶识别号',
	djhm         string    `gorm:"djhm"`                                // '登记号码',
	zdw          string    `gorm:"zdw"`                                 // '总吨位',
	jd           string    `gorm:"jd"`                                  // '净吨',
	zjzl         string    `gorm:"zjzl"`                                // '主机种类',
	zjsl         string    `gorm:"zjsl"`                                // '主机数量',
	zjgl         string    `gorm:"zjgl"`                                // '主机功率',
	zcc          string    `gorm:"zcc"`                                 // '造船厂',
	jcrq         string    `gorm:"jcrq"`                                // '建成日期',
	sbh          string    `gorm:"sbh"`                                 // '设备号',
	hx           string    `gorm:"hx"`                                  // '航向',
	hs           string    `gorm:"hs"`                                  // '航速',
	dwzb         string    `gorm:"dwzb"`                                // '定位坐标',
	dwsj         string    `gorm:"dwsj"`                                // '定位时间',
}

func MapToClCl(m map[string]interface{}) *ClCl {
	c := ClCl{}
	mmsi := ""
	if m["mmsi"] != nil {
		switch m["mmsi"].(type) {
		case string:
			mmsi = m["mmsi"].(string)
		case float64:
			mmsi = strconv.FormatFloat(m["mmsi"].(float64), 'f', -1, 64)
		}
	}
	length := ""
	if m["length"] != nil {
		switch m["length"].(type) {
		case string:
			length = m["length"].(string)
		case float64:
			length = strconv.FormatFloat(m["length"].(float64), 'f', -1, 64)
		}
	}
	breadth := ""
	if m["breadth"] != nil {
		switch m["breadth"].(type) {
		case string:
			breadth = m["breadth"].(string)
		case float64:
			breadth = strconv.FormatFloat(m["breadth"].(float64), 'f', -1, 64)
		}
	}
	shipname := ""
	if m["shipname"] != nil {
		switch m["shipname"].(type) {
		case string:
			shipname = m["shipname"].(string)
		}
	}
	shiptypename := ""
	if m["shiptypename"] != nil {
		switch m["shiptypename"].(type) {
		case string:
			shiptypename = m["shiptypename"].(string)
		}
	}
	c.MMSI = mmsi
	c.Shipname = shipname
	c.Shiptypename = shiptypename
	c.LENGTH = length
	c.BREADTH = breadth
	c.ETA = m["eta"].(string)
	c.DEST_PORT = m["dest_port"].(string)
	c.DRAUGHT = m["draught"].(string)
	c.NATIONALITY = m["nationality"].(string)
	c.NavStatus = m["navStatus"].(string)
	return &c
}
