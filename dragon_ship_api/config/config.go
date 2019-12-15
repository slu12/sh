/**
@Name : chenwei
@Time : 2019/12/15 11:31 上午
**/
package config

type AllConfig struct {
	Mysql Mysql
}
type Mysql struct {
	Conn string `ini:"conn"`
	Host string `ini:"host"`
	User string `ini:"user"`
	Pass string `ini:"pass"`
}
