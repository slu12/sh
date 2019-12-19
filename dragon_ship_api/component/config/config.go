/**
@Name : chenwei
@Time : 2019/12/15 11:31 上午
**/
package config

type AllConfig struct {
	Mysql Mysql
	Log   Log
	Base  Base
	Cron  Cron
}
type Base struct {
	Shipids  string `ini:"shipids"`
	HttpAddr string `ini:"httpAddr"`
}
type Mysql struct {
	Conn string `ini:"conn"`
	Host string `ini:"host"`
	User string `ini:"user"`
	Pass string `ini:"pass"`
}
type Log struct {
	FileName   string
	RotateCron string
	MaxAge     int
	MaxSize    int
}

type Cron struct {
	ShipPosition string
	GetToken     string
}
