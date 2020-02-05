/**
@Name : chenwei
@Time : 2019/12/28 12:30 上午
**/
package main

import (
	"net/http"
	"strings"
	"io/ioutil"
	"fmt"
)

func main() {
	Soap11("http://www.cjienc.com/axis2/services/ShipClientService?wsdl")
	//Soap12("https://lisea.cn/test")
}

func Soap11(url string) {
	reqBody := `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" > 
  <soap:Body> 
    <GetChannelCatalog xmlns="http://cjhdj.com/ShipClientService/"> 
      <Request>cjhdj:RiverRangeEnum</Request> 
    </GetChannelCatalog> 
  </soap:Body> 
</soap:Envelope>`

	res, err := http.Post(url, "text/xml; charset=UTF-8", strings.NewReader(reqBody))
	if nil != err {
		fmt.Println("http post err:", err)
		return
	}
	defer res.Body.Close()

	// return status
	if http.StatusOK != res.StatusCode {
		fmt.Println("WebService soap1.1 request fail, status: %s\n", res.StatusCode)
		return
	}

	data, err := ioutil.ReadAll(res.Body)
	if nil != err {
		fmt.Println("ioutil ReadAll err:", err)
		return
	}

	fmt.Println("webService soap1.1 response: ", string(data))
}

// soap1.2例子
func Soap12(url string) {
	reqBody := `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"> 
  <soap12:Body> 
    <GetSpeech xmlns="http://xmlme.com/WebServices"> 
      <Request>string</Request> 
    </GetSpeech> 
  </soap12:Body> 
</soap12:Envelope>`

	res, err := http.Post(url, "application/soap+xml; charset=utf-8", strings.NewReader(reqBody))
	if nil != err {
		fmt.Println("http post err:", err)
		return
	}
	defer res.Body.Close()

	// return status
	if http.StatusOK != res.StatusCode {
		fmt.Println("WebService soap1.2 request fail, status: %s\n", res.StatusCode)
		return
	}

	data, err := ioutil.ReadAll(res.Body)
	if nil != err {
		fmt.Println("ioutil ReadAll err:", err)
		return
	}

	fmt.Println("webService soap1.2 response: ", string(data))
}
