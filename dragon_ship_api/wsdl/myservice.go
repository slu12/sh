package wsdl

import (
	"encoding/xml"
	"github.com/hooklift/gowsdl/soap"
	"time"
)

// against "unused imports"
var _ time.Time
var _ xml.Name

type RiverRangeEnum string

const (

	// 全长江
	RiverRangeEnumALL RiverRangeEnum = "ALL"

	// 上游
	RiverRangeEnumUPSTREAM RiverRangeEnum = "UPSTREAM"

	// 中游
	RiverRangeEnumMIDSTREAM RiverRangeEnum = "MIDSTREAM"

	// 下游
	RiverRangeEnumDOWNSTREAM RiverRangeEnum = "DOWNSTREAM"
)

type DataType string

const (
	DataTypeINT DataType = "INT"

	DataTypeSTRING DataType = "STRING"

	DataTypeDOUBLE DataType = "DOUBLE"
)

type GetChannelCatalog struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetChannelCatalog"`

	RangeType *RiverRangeEnum `xml:"rangeType,omitempty"`
}

type GetChannelCatalogResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetChannelCatalogResponse"`

	Channels []*ChannelInfo `xml:"channels,omitempty"`
}

type GetChannelInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetChannelInfo"`

	Name string `xml:"name,omitempty"`
}

type GetChannelInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetChannelInfoResponse"`

	Channel *ChannelInfo `xml:"channel,omitempty"`
}

type GetFogStationCatalog struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetFogStationCatalog"`
}

type GetFogStationCatalogResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetFogStationCatalogResponse"`

	Stations []*FogStation `xml:"stations,omitempty"`
}

type GetFogStation struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetFogStation"`

	Code string `xml:"code,omitempty"`
}

type GetFogStationResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetFogStationResponse"`

	Station *FogStation `xml:"station,omitempty"`
}

type GetWaterlevelStation struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelStation"`

	Code string `xml:"code,omitempty"`
}

type GetWaterlevelStationResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelStationResponse"`

	Station *WaterlevelStation `xml:"station,omitempty"`
}

type GetCellVersionInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetCellVersionInfo"`

	Cellname string `xml:"cellname,omitempty"`
}

type GetCellVersionInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetCellVersionInfoResponse"`

	//
	// 图幅的最新信息，参考S-63标准的CATALOG.031里关于数据的描述，返回一个字符串。格式为：
	// CN520QLG:VERSION=1.0,EDTN=1,UPDN=0,UADT=20060703,ISDT=20060703
	// 或
	// CN520QLG:VERSION=1.0,EDTN=1,UPDN=0 ,ISDT=20060703
	// 其中冒号前是图幅号，冒号以后的部分是最新的文件的DSID信息。如果当前是新的EN文件或再版的EN文件，
	// 则UADT不为空，如果是ER文件，则UADT文件为空。日期格式都是YYYYMMDD
	//
	VersionInfo string `xml:"versionInfo,omitempty"`
}

type GetSafeInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetSafeInfo"`

	// 日期，格式为YYYYMMDD
	After string `xml:"after,omitempty"`
}

type GetSafeInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetSafeInfoResponse"`

	Infos []*SafeInfo `xml:"infos,omitempty"`
}

type GetWaterwayNotice struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterwayNotice"`

	// 发布时间，格式为YYYYMMDD
	Time string `xml:"time,omitempty"`
}

type GetWaterwayNoticeResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterwayNoticeResponse"`

	Notice []*WaterwayNotice `xml:"notice,omitempty"`
}

type GetMaintainMonthPlan struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainMonthPlan"`

	// 河道名称
	ChannelName string `xml:"channelName,omitempty"`

	Time string `xml:"time,omitempty"`
}

type GetMaintainMonthPlanResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainMonthPlanResponse"`

	Plan *MaintainMonthPlan `xml:"plan,omitempty"`
}

type GetMaintainCurrent struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainCurrent"`

	// 水道名称
	ChannelName string `xml:"channelName,omitempty"`
}

type GetMaintainCurrentResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainCurrentResponse"`

	Forecast *MaintainWeekPlan `xml:"forecast,omitempty"`
}

type GetVisibleDistanceInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetVisibleDistanceInfo"`

	// 雾情观察站的编号
	Code string `xml:"code,omitempty"`
}

type GetVisibleDistanceInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetVisibleDistanceInfoResponse"`

	Info *VisibleDistanceInfo `xml:"info,omitempty"`
}

type GetWaterlevelInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelInfo"`

	// 水位站编号
	Code string `xml:"code,omitempty"`

	// 该方法将返回距给定时间点最近发布的水位信息，格式为YYYYMMDDhhmmss。如果时间字段为空，则默认返回最新发布的水位信息
	Time string `xml:"time,omitempty"`
}

type GetWaterlevelInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelInfoResponse"`

	Info *WaterlevelInfo `xml:"info,omitempty"`
}

type GetWeatherSupportedCityCatalog struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWeatherSupportedCityCatalog"`
}

type GetWeatherSupportedCityCatalogResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWeatherSupportedCityCatalogResponse"`

	Cities []*City `xml:"cities,omitempty"`
}

type GetWeatherInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWeatherInfo"`

	// 城市名称
	Cityname string `xml:"cityname,omitempty"`
}

type GetWeatherInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWeatherInfoResponse"`

	WeatherInfo *WeatherInfo `xml:"weatherInfo,omitempty"`
}

type GetMapCatalog struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMapCatalog"`

	RangeType *RiverRangeEnum `xml:"rangeType,omitempty"`
}

type GetMapCatalogResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMapCatalogResponse"`

	Frames []*MapFrame `xml:"frames,omitempty"`
}

type GetCellUpdate struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetCellUpdate"`

	//
	// 图幅编号
	//
	Mapcode string `xml:"mapcode,omitempty"`

	//
	// 版本
	//
	Version float32 `xml:"version,omitempty"`

	//
	// ENC的版次
	//
	EditionNum int32 `xml:"editionNum,omitempty"`

	//
	// ENC的修订次数的起始值
	//
	UpdateNumStart int32 `xml:"updateNumStart,omitempty"`

	//
	// ENC的修订次数的结束值。最终下载的文件将包括从updateNumStart到updateNumEnd之间的所有EN、ER文件
	//
	UpdateNumEnd int32 `xml:"updateNumEnd,omitempty"`

	//
	// 用户许可证
	//
	Userpermit string `xml:"userpermit,omitempty"`

	//
	// 在门户注册的用户名
	//
	Username string `xml:"username,omitempty"`
}

type GetCellUpdateResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetCellUpdateResponse"`

	Url string `xml:"url,omitempty"`
}

type GetWaterlevelStationCatalog struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelStationCatalog"`

	RangeType *RiverRangeEnum `xml:"rangeType,omitempty"`
}

type GetWaterlevelStationCatalogResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelStationCatalogResponse"`

	Stations []*WaterlevelStation `xml:"stations,omitempty"`
}

type Security struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ Security"`

	Value string
}

type GetBridgeSafeHeight struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetBridgeSafeHeight"`

	// 桥梁所在的位置，上游、中游或下游。如果填ALL，服务端直接返回0
	Region *RiverRangeEnum `xml:"region,omitempty"`

	// 里程值
	Milage int32 `xml:"milage,omitempty"`
}

type GetBridgeSafeHeightResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetBridgeSafeHeightResponse"`

	// 桥梁安全高度的修正值
	Delta float64 `xml:"delta,omitempty"`
}

type GetMaintainWeekPlan struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainWeekPlan"`

	// 河道名称
	ChannelName string `xml:"channelName,omitempty"`

	// 指定的某个星期。该字符串长度为6，前四位是年份，后两位是周的数值。比如201108表示2011年的第八周
	Week string `xml:"week,omitempty"`
}

type GetMaintainWeekPlanResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainWeekPlanResponse"`

	Forecast *MaintainWeekPlan `xml:"forecast,omitempty"`
}

type GetCellVersionInfo2 struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetCellVersionInfo2"`

	Cellnames []string `xml:"cellnames,omitempty"`
}

type GetCellVersionInfo2Response struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetCellVersionInfo2Response"`

	VersionInfos []string `xml:"versionInfos,omitempty"`
}

type GetWaterlevelInfo2 struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelInfo2"`

	// 水位站编号的数组
	Codes []string `xml:"codes,omitempty"`

	// 时间，格式为YYYYMMDDhhmmss
	Time string `xml:"time,omitempty"`
}

type GetWaterlevelInfo2Response struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelInfo2Response"`

	Infos []*WaterlevelInfo `xml:"infos,omitempty"`
}

type IsDeepWaterRouteVisible struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ IsDeepWaterRouteVisible"`

	Range_ *RiverRangeEnum `xml:"range,omitempty"`

	Milage float64 `xml:"milage,omitempty"`
}

type IsDeepWaterRouteVisibleResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ IsDeepWaterRouteVisibleResponse"`

	Visible bool `xml:"visible,omitempty"`
}

type GetBridgeSafeHeight2 struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetBridgeSafeHeight2"`

	Range_ *RiverRangeEnum `xml:"range,omitempty"`

	Milage float64 `xml:"milage,omitempty"`
}

type GetBridgeSafeHeight2Response struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetBridgeSafeHeight2Response"`

	Out float64 `xml:"out,omitempty"`
}

type GetMaintainCurrent2 struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainCurrent2"`

	ChannelName string `xml:"channelName,omitempty"`
}

type GetMaintainCurrent2Response struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainCurrent2Response"`

	Out string `xml:"out,omitempty"`
}

type GetMaintainWeekPlan2 struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainWeekPlan2"`

	ChannelName string `xml:"channelName,omitempty"`

	// 时间可以以两种格式提供：1.六位的字符串，表示某一年的第几周，比如“201201”表示2012年的第一周；2.八位的字符串，表示某一天，格式为YYYYMMDD，比如20120403
	Week string `xml:"week,omitempty"`
}

type GetMaintainWeekPlan2Response struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMaintainWeekPlan2Response"`

	Out *MaintainWeekPlan2 `xml:"out,omitempty"`
}

type GetWaterlevelInfo3 struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelInfo3"`

	Codes []string `xml:"codes,omitempty"`

	// 时间，格式为YYYYMMDDhhmmss
	Time string `xml:"time,omitempty"`
}

type GetWaterlevelInfo3Response struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetWaterlevelInfo3Response"`

	Infos []*WaterlevelInfo3 `xml:"infos,omitempty"`
}

type GetMilageInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMilageInfo"`

	Lon float64 `xml:"lon,omitempty"`

	Lat float64 `xml:"lat,omitempty"`
}

type GetMilageInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetMilageInfoResponse"`

	Out *MilageInfo `xml:"out,omitempty"`
}

type GetBridgeCatalog struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetBridgeCatalog"`
}

type GetBridgeCatalogResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetBridgeCatalogResponse"`

	Bridges []*Bridge `xml:"bridges,omitempty"`
}

type GetForecastWaterlevelStationCatalog struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetForecastWaterlevelStationCatalog"`

	RangeType *RiverRangeEnum `xml:"rangeType,omitempty"`
}

type GetForecastWaterlevelStationCatalogResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetForecastWaterlevelStationCatalogResponse"`

	Stations []*WaterlevelStation `xml:"stations,omitempty"`
}

type GetForecastWaterlevelInfo struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetForecastWaterlevelInfo"`

	Code []string `xml:"code,omitempty"`
}

type GetForecastWaterlevelInfoResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetForecastWaterlevelInfoResponse"`

	Infos []*ForecastWaterlevel `xml:"infos,omitempty"`
}

type GetFairwayReservedWaterDepth struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetFairwayReservedWaterDepth"`

	Year string `xml:"year,omitempty"`
}

type GetFairwayReservedWaterDepthResponse struct {
	XMLName xml.Name `xml:"http://cjhdj.com/ShipClientService/ GetFairwayReservedWaterDepthResponse"`

	Out []*FairwayReservedWaterDepth `xml:"out,omitempty"`
}

type ChannelInfo struct {

	// 河道编号
	Code string `xml:"code,omitempty"`

	// 河道名称
	Name string `xml:"name,omitempty"`

	// 河道类型，上游、中游或下游
	Type_ string `xml:"type,omitempty"`

	// 维护里程
	Range_ string `xml:"range,omitempty"`

	// 河道所处的行政区域，包括省、市、县三级的地名，以英文的逗号间隔，比如"湖北,武汉,江岸"
	Region string `xml:"region,omitempty"`
}

type FogStation struct {

	// 雾情监测站的编号
	Code string `xml:"code,omitempty"`

	// 雾情监测站的名称
	Name string `xml:"name,omitempty"`

	// 经度
	Longitude float64 `xml:"longitude,omitempty"`

	// 纬度
	Latitude float64 `xml:"latitude,omitempty"`
}

type WaterlevelStation struct {

	// 水位站编号
	Code string `xml:"code,omitempty"`

	// 水位站名称
	Name string `xml:"name,omitempty"`

	//
	// 水位站区域，上游、中游或下游
	//
	Region string `xml:"region,omitempty"`

	// 水位站里程值
	Milage float64 `xml:"milage,omitempty"`

	Datum int32 `xml:"datum,omitempty"`

	Lon float64 `xml:"lon,omitempty"`

	Lat float64 `xml:"lat,omitempty"`

	Type_ int32 `xml:"type,omitempty"`
}

type SafeInfo struct {

	// 发布时间，格式为YYYYMMDD hh:mm:ss
	Time string `xml:"time,omitempty"`

	// 预警信息内容
	Content string `xml:"content,omitempty"`

	// 备注
	Remark string `xml:"remark,omitempty"`
}

type WaterwayNotice struct {

	// 发布的时间，格式为YYYYMMDD hh:mm:ss
	Time string `xml:"time,omitempty"`

	// 通告内容
	Content string `xml:"content,omitempty"`

	// 备注
	Remark string `xml:"remark,omitempty"`
}

type MaintainMonthPlan struct {

	// 计划维护的河道
	Channel *ChannelInfo `xml:"channel,omitempty"`

	// 计划维护的月份，格式为“YYYYMM”
	Time string `xml:"time,omitempty"`

	// 计划维护的水深
	Waterlevel string `xml:"waterlevel,omitempty"`
}

type MaintainWeekPlan struct {

	// 预报起始日期，时间格式YYYY-MM-DD
	Begin string `xml:"begin,omitempty"`

	// 预报结束日期，时间格式YYYY-MM-DD
	End string `xml:"end,omitempty"`

	// 航道水深
	Depth float64 `xml:"depth,omitempty"`

	// 航道宽度
	Width float64 `xml:"width,omitempty"`

	// 测时水深
	MeatureDepth float64 `xml:"meatureDepth,omitempty"`

	// 预报水深的河道
	Channel *ChannelInfo `xml:"channel,omitempty"`

	// 发布该信息的水位站
	Station *WaterlevelStation `xml:"station,omitempty"`

	// 发布时间，时间格式YYYY-MM-DD
	Time string `xml:"time,omitempty"`

	// 备注
	Remark string `xml:"remark,omitempty"`
}

type VisibleDistanceInfo struct {

	// 发布该信息的雾情监测站
	FogStation *FogStation `xml:"fogStation,omitempty"`

	// 可视距离
	Distance float64 `xml:"distance,omitempty"`

	// 发布时间,格式为YYYYMMDD hh:mm:ss
	Time string `xml:"time,omitempty"`

	// 备注
	Remark string `xml:"remark,omitempty"`
}

type WaterlevelInfo struct {

	//
	// 发布信息的水位站
	//
	Station *WaterlevelStation `xml:"station,omitempty"`

	// 当前水位
	Now float64 `xml:"now,omitempty"`

	// 当天的平均水位
	Average float64 `xml:"average,omitempty"`

	// 较次日变化
	Change float64 `xml:"change,omitempty"`

	// 三天后预测水位
	Threeday float64 `xml:"threeday,omitempty"`

	// 五天后预测水位
	Fiveday float64 `xml:"fiveday,omitempty"`

	// 发布时间，格式为YYYYMMDD hh:mm:ss
	Time string `xml:"time,omitempty"`

	// 备注
	Remark string `xml:"remark,omitempty"`
}

type City struct {

	// 省份
	Province string `xml:"province,omitempty"`

	// 城市名
	Cityname string `xml:"cityname,omitempty"`
}

type WeatherInfo struct {

	//
	// 发布日期
	//
	Publishdate string `xml:"publishdate,omitempty"`

	// 当天的气温
	Temperature1 string `xml:"temperature1,omitempty"`

	//
	// 当天的天气概况
	//
	Overview1 string `xml:"overview1,omitempty"`

	//
	// 当天的风向
	//
	Wind1 string `xml:"wind1,omitempty"`

	//
	// 当天的风力
	//
	Fl1 string `xml:"fl1,omitempty"`

	//
	// 第二天的气温
	//
	Temperature2 string `xml:"temperature2,omitempty"`

	//
	// 第二天的天气概况
	//
	Overview2 string `xml:"overview2,omitempty"`

	//
	// 第二天的风向
	//
	Wind2 string `xml:"wind2,omitempty"`

	//
	// 第二天的风力
	//
	Fl2 string `xml:"fl2,omitempty"`

	//
	// 第三天的气温
	//
	Temperature3 string `xml:"temperature3,omitempty"`

	//
	// 第三天的天气概况
	//
	Overview3 string `xml:"overview3,omitempty"`

	//
	// 第三天的风向
	//
	Wind3 string `xml:"wind3,omitempty"`

	//
	// 第二天的风力
	//
	Fl3 string `xml:"fl3,omitempty"`
}

type MapFrame struct {

	// 图幅编号
	Mapcode string `xml:"mapcode,omitempty"`

	// 图幅名称
	Mapname string `xml:"mapname,omitempty"`

	//
	// 所处河道名称
	//
	ChannelName string `xml:"channelName,omitempty"`

	// 比例尺
	Scale string `xml:"scale,omitempty"`

	//
	// 类型。上游、中游或下游
	//
	Type_ string `xml:"type,omitempty"`

	// 经度最小值
	West float64 `xml:"west,omitempty"`

	// 纬度最小值
	South float64 `xml:"south,omitempty"`

	// 经度最大值
	East float64 `xml:"east,omitempty"`

	// 纬度最大值
	North float64 `xml:"north,omitempty"`
}

type MaintainWeekPlan2 struct {
	Begin string `xml:"begin,omitempty"`

	End string `xml:"end,omitempty"`

	DepthUp float64 `xml:"depthUp,omitempty"`

	WidthUp float64 `xml:"widthUp,omitempty"`

	DepthDown float64 `xml:"depthDown,omitempty"`

	WidthDown float64 `xml:"widthDown,omitempty"`

	ChannelName string `xml:"channelName,omitempty"`
}

type WaterlevelInfo3 struct {
	StationCode string `xml:"stationCode,omitempty"`

	Now float64 `xml:"now,omitempty"`

	Time string `xml:"time,omitempty"`

	Forecast string `xml:"forecast,omitempty"`

	Datum int32 `xml:"datum,omitempty"`
}

type MilageInfo struct {
	Type_ *RiverRangeEnum `xml:"type,omitempty"`

	Milage float64 `xml:"milage,omitempty"`
}

type Bridge struct {

	// 桥梁名称
	Name string `xml:"name,omitempty"`

	//
	// 桥梁所处的位置，上游、中游或下游
	//
	Range_ *RiverRangeEnum `xml:"range,omitempty"`

	//
	// 桥梁的精确里程
	//
	Milage float64 `xml:"milage,omitempty"`
}

type FieldDef struct {
	Name string `xml:"name,omitempty"`

	Type_ *DataType `xml:"type,omitempty"`
}

type ForecastWaterlevel struct {
	Datum int32 `xml:"datum,omitempty"`

	StartDate string `xml:"startDate,omitempty"`

	Info string `xml:"info,omitempty"`

	StationCode string `xml:"stationCode,omitempty"`
}

type FairwayReservedWaterDepth struct {
	StartLocation string `xml:"startLocation,omitempty"`

	EndLocation string `xml:"endLocation,omitempty"`

	StartMileage float64 `xml:"startMileage,omitempty"`

	Endmileage float64 `xml:"endmileage,omitempty"`

	Startregion int32 `xml:"startregion,omitempty"`

	Endregion int32 `xml:"endregion,omitempty"`

	Fairwaywidth float64 `xml:"fairwaywidth,omitempty"`

	Info string `xml:"info,omitempty"`
}

type ShipClientService interface {

	/* 获取河道基本信息的列表 */
	GetChannelCatalog(request *GetChannelCatalog) (*GetChannelCatalogResponse, error)

	/* 根据河道编号获取某条河道的基本信息 */
	GetChannelInfo(request *GetChannelInfo) (*GetChannelInfoResponse, error)

	/* 获取雾情监测站的列表 */
	GetFogStationCatalog(request *GetFogStationCatalog) (*GetFogStationCatalogResponse, error)

	/* 根据雾情监测站的编号指定站点的信息 */
	GetFogStation(request *GetFogStation) (*GetFogStationResponse, error)

	/* 根据水位站的编号查询水位站的基本信息 */
	GetWaterlevelStation(request *GetWaterlevelStation) (*GetWaterlevelStationResponse, error)

	/* 获取已有图幅的更新信息 */
	GetCellVersionInfo(request *GetCellVersionInfo) (*GetCellVersionInfoResponse, error)

	/* 获取在指定时间以后发布的所有安全预警信息 */
	GetSafeInfo(request *GetSafeInfo) (*GetSafeInfoResponse, error)

	/* 获取指定河道在某个时间之后发布的长江航行通告（电） */
	GetWaterwayNotice(request *GetWaterwayNotice) (*GetWaterwayNoticeResponse, error)

	/* 获取长江河道月度维护水深计划 */
	GetMaintainMonthPlan(request *GetMaintainMonthPlan) (*GetMaintainMonthPlanResponse, error)

	/* 获取指定河道本周的维护水深信息 */
	GetMaintainCurrent(request *GetMaintainCurrent) (*GetMaintainCurrentResponse, error)

	/* 获取指定雾情监测站的可视距离信息 */
	GetVisibleDistanceInfo(request *GetVisibleDistanceInfo) (*GetVisibleDistanceInfoResponse, error)

	/* 获取指定水位站最新发布的信息，包括当前水位，较前日变化，三天后预测水位，五天后预测水位，发布时间，以及备注等信息 */
	GetWaterlevelInfo(request *GetWaterlevelInfo) (*GetWaterlevelInfoResponse, error)

	/* 获取目前能提供天气查询的城市列表 */
	GetWeatherSupportedCityCatalog(request *GetWeatherSupportedCityCatalog) (*GetWeatherSupportedCityCatalogResponse, error)

	/* 根据输入的城市名称获取该城市最新的气象信息，输入参数不在提供天气查询的城市列表里，默认返回武汉的天气信息 */
	GetWeatherInfo(request *GetWeatherInfo) (*GetWeatherInfoResponse, error)

	/* 获取系统可以提供的ENC数据的图幅信息的目录 */
	GetMapCatalog(request *GetMapCatalog) (*GetMapCatalogResponse, error)

	/* 获取ENC的EN或ER数据 */
	GetCellUpdate(request *GetCellUpdate) (*GetCellUpdateResponse, error)

	/* 获取水位站的列表 */
	GetWaterlevelStationCatalog(request *GetWaterlevelStationCatalog) (*GetWaterlevelStationCatalogResponse, error)

	/* 获取桥梁安全通行高度 */
	GetBridgeSafeHeight(request *GetBridgeSafeHeight) (*GetBridgeSafeHeightResponse, error)

	/* 获取指定河道下周的维护水深信息 */
	GetMaintainWeekPlan(request *GetMaintainWeekPlan) (*GetMaintainWeekPlanResponse, error)

	/* 获取多个已有图幅的更新信息 */
	GetCellVersionInfo2(request *GetCellVersionInfo2) (*GetCellVersionInfo2Response, error)

	/* 一次获取多个水位站的最新水位信息 */
	GetWaterlevelInfo2(request *GetWaterlevelInfo2) (*GetWaterlevelInfo2Response, error)

	IsDeepWaterRouteVisible(request *IsDeepWaterRouteVisible) (*IsDeepWaterRouteVisibleResponse, error)

	/* 获取桥梁安全通行高度 */
	GetBridgeSafeHeight2(request *GetBridgeSafeHeight2) (*GetBridgeSafeHeight2Response, error)

	/* 获取指定河道在某一周的维护水深信息 */
	GetMaintainWeekPlan2(request *GetMaintainWeekPlan2) (*GetMaintainWeekPlan2Response, error)

	/* 获取若干个水位站的最新水位信息，返回结果与GetWaterlevelInfo不同 */
	GetWaterlevelInfo3(request *GetWaterlevelInfo3) (*GetWaterlevelInfo3Response, error)

	/* 根据经纬度获取最近的里程点信息 */
	GetMilageInfo(request *GetMilageInfo) (*GetMilageInfoResponse, error)

	GetBridgeCatalog(request *GetBridgeCatalog) (*GetBridgeCatalogResponse, error)

	/* 获取预测水位站列表 */
	GetForecastWaterlevelStationCatalog(request *GetForecastWaterlevelStationCatalog) (*GetForecastWaterlevelStationCatalogResponse, error)

	/* 根据预测水位站编码获取预测水位值信息 */
	GetForecastWaterlevelInfo(request *GetForecastWaterlevelInfo) (*GetForecastWaterlevelInfoResponse, error)

	/* 根据年份获取河道预留水深信息 */
	GetFairwayReservedWaterDepth(request *GetFairwayReservedWaterDepth) (*GetFairwayReservedWaterDepthResponse, error)
}

type shipClientService struct {
	client *soap.Client
}

func NewShipClientService(client *soap.Client) ShipClientService {
	return &shipClientService{
		client: client,
	}
}

func (service *shipClientService) GetChannelCatalog(request *GetChannelCatalog) (*GetChannelCatalogResponse, error) {
	response := new(GetChannelCatalogResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetChannelCatalog", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetChannelInfo(request *GetChannelInfo) (*GetChannelInfoResponse, error) {
	response := new(GetChannelInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetChannelInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetFogStationCatalog(request *GetFogStationCatalog) (*GetFogStationCatalogResponse, error) {
	response := new(GetFogStationCatalogResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetFogStationCatalog", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetFogStation(request *GetFogStation) (*GetFogStationResponse, error) {
	response := new(GetFogStationResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetFogStation", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWaterlevelStation(request *GetWaterlevelStation) (*GetWaterlevelStationResponse, error) {
	response := new(GetWaterlevelStationResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWaterlevelStation", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetCellVersionInfo(request *GetCellVersionInfo) (*GetCellVersionInfoResponse, error) {
	response := new(GetCellVersionInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetCellVersionInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetSafeInfo(request *GetSafeInfo) (*GetSafeInfoResponse, error) {
	response := new(GetSafeInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetSafeInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWaterwayNotice(request *GetWaterwayNotice) (*GetWaterwayNoticeResponse, error) {
	response := new(GetWaterwayNoticeResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWaterwayNotice", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetMaintainMonthPlan(request *GetMaintainMonthPlan) (*GetMaintainMonthPlanResponse, error) {
	response := new(GetMaintainMonthPlanResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetMaintainMonthPlan", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetMaintainCurrent(request *GetMaintainCurrent) (*GetMaintainCurrentResponse, error) {
	response := new(GetMaintainCurrentResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetMaintainCurrent", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetVisibleDistanceInfo(request *GetVisibleDistanceInfo) (*GetVisibleDistanceInfoResponse, error) {
	response := new(GetVisibleDistanceInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetVisibleDistanceInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWaterlevelInfo(request *GetWaterlevelInfo) (*GetWaterlevelInfoResponse, error) {
	response := new(GetWaterlevelInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWaterlevelInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWeatherSupportedCityCatalog(request *GetWeatherSupportedCityCatalog) (*GetWeatherSupportedCityCatalogResponse, error) {
	response := new(GetWeatherSupportedCityCatalogResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWeatherSupportedCityCatalog", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWeatherInfo(request *GetWeatherInfo) (*GetWeatherInfoResponse, error) {
	response := new(GetWeatherInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWeatherInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetMapCatalog(request *GetMapCatalog) (*GetMapCatalogResponse, error) {
	response := new(GetMapCatalogResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetMapCatalog", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetCellUpdate(request *GetCellUpdate) (*GetCellUpdateResponse, error) {
	response := new(GetCellUpdateResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetCellUpdate", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWaterlevelStationCatalog(request *GetWaterlevelStationCatalog) (*GetWaterlevelStationCatalogResponse, error) {
	response := new(GetWaterlevelStationCatalogResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWaterlevelStationCatalog", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetBridgeSafeHeight(request *GetBridgeSafeHeight) (*GetBridgeSafeHeightResponse, error) {
	response := new(GetBridgeSafeHeightResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetBridgeSafeHeight", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetMaintainWeekPlan(request *GetMaintainWeekPlan) (*GetMaintainWeekPlanResponse, error) {
	response := new(GetMaintainWeekPlanResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetMaintainWeekPlan", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetCellVersionInfo2(request *GetCellVersionInfo2) (*GetCellVersionInfo2Response, error) {
	response := new(GetCellVersionInfo2Response)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetCellVersionInfo2", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWaterlevelInfo2(request *GetWaterlevelInfo2) (*GetWaterlevelInfo2Response, error) {
	response := new(GetWaterlevelInfo2Response)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWaterlevelInfo2", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) IsDeepWaterRouteVisible(request *IsDeepWaterRouteVisible) (*IsDeepWaterRouteVisibleResponse, error) {
	response := new(IsDeepWaterRouteVisibleResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/IsDeepWaterRouteVisible", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetBridgeSafeHeight2(request *GetBridgeSafeHeight2) (*GetBridgeSafeHeight2Response, error) {
	response := new(GetBridgeSafeHeight2Response)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetBridgeSafeHeight2", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetMaintainWeekPlan2(request *GetMaintainWeekPlan2) (*GetMaintainWeekPlan2Response, error) {
	response := new(GetMaintainWeekPlan2Response)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetMaintainWeekPlan2", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetWaterlevelInfo3(request *GetWaterlevelInfo3) (*GetWaterlevelInfo3Response, error) {
	response := new(GetWaterlevelInfo3Response)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetWaterlevelInfo3", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetMilageInfo(request *GetMilageInfo) (*GetMilageInfoResponse, error) {
	response := new(GetMilageInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetMilageInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetBridgeCatalog(request *GetBridgeCatalog) (*GetBridgeCatalogResponse, error) {
	response := new(GetBridgeCatalogResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetBridgeCatalog", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetForecastWaterlevelStationCatalog(request *GetForecastWaterlevelStationCatalog) (*GetForecastWaterlevelStationCatalogResponse, error) {
	response := new(GetForecastWaterlevelStationCatalogResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetForecastWaterlevelStationCatalog", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetForecastWaterlevelInfo(request *GetForecastWaterlevelInfo) (*GetForecastWaterlevelInfoResponse, error) {
	response := new(GetForecastWaterlevelInfoResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetForecastWaterlevelInfo", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (service *shipClientService) GetFairwayReservedWaterDepth(request *GetFairwayReservedWaterDepth) (*GetFairwayReservedWaterDepthResponse, error) {
	response := new(GetFairwayReservedWaterDepthResponse)
	err := service.client.Call("http://cjhdj.com/ShipClientService/GetFairwayReservedWaterDepth", request, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
