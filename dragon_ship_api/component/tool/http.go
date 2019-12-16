/**
@Name : chenwei
@Time : 2019/12/10 11:35 下午
**/
package tool

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

const (
	DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8"
	CONTENT_TYPE_JSON    = "application/json"
)

func HttpPostUrlEncode(url string, param map[string]string) ([]byte, error) {
	return HttpPost(url, DEFAULT_CONTENT_TYPE, param)
}
func HttpPostJson(url string, param map[string]string) ([]byte, error) {
	return HttpPost(url, CONTENT_TYPE_JSON, param)
}
func HttpGet(url string) ([]byte, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	return ioutil.ReadAll(resp.Body)
}
func HttpPost(url, contentType string, param map[string]string) ([]byte, error) {
	var buffer bytes.Buffer
	if param != nil {
		if buffer.Len() != 0 {
			buffer.WriteString("&")
		}
		for k, v := range param {
			buffer.WriteString(fmt.Sprintf("%s=%s", k, v))
		}
	}

	resp, err := http.Post(url, contentType, strings.NewReader(buffer.String()))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	return ioutil.ReadAll(resp.Body)
}
