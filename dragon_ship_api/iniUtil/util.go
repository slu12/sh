package iniUtil

import (
	"errors"
	"github.com/go-ini/ini"
	"log"
)

var filePtr *ini.File

func init() {
	file, err := ini.Load("./app.conf")
	if err != nil {
		log.Fatal("load ini error", err.Error())
	}
	filePtr = file
}

func GetString(key string) string {
	if filePtr == nil {
		return ""
	}
	s := filePtr.Section("")
	if s == nil {
		return ""
	}
	return s.Key(key).String()
}
func GetInt(key string) (int, error) {
	if filePtr == nil {
		return 0, errors.New("文件读取失败")
	}

	s := filePtr.Section("")
	if s == nil {
		return 0, errors.New("Section读取失败")
	}
	return s.Key(key).Int()
}
