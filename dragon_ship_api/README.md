## 龙船数据接口操作服务

`host:223.240.68.90:8091`

####实时GPS点：船舶基本信息及最新船位查询服务
GET：v1/GetShipInfo
|参数名|说明|备注|
|:--:|:--:|:--:|
|shipid|||
---
历史航次信息：船舶历史航次查询服务
GET：v1/GetHistoryVoyage
|参数名|说明|备注|
|:--:|:--:|:--:|
|shipid|||
|startUtcTime|开始时间||
|endUtcTime|结束时间||
---
历史轨迹：船舶历史轨迹查询服务
GET：v1/GetHistoryTrack
|参数名|说明|备注|
|:--:|:--:|:--:|
|shipid|||
|startUtcTime|开始时间||
|endUtcTime|结束时间||
---
查询最新的航次信息：船舶当前航次查询服务
GET：v1/GetCurrentVoyage
|参数名|说明|备注|
|:--:|:--:|:--:|
|shipid|||
---
同步数据
POST：v1/SyncShipLatestInfo