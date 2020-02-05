/**
@Name : chenwei
@Time : 2019/12/27 11:50 下午
**/
package main

import (
	"crypto/tls"
	"dragon_ship_api/wsdl"
	"fmt"
	"github.com/hooklift/gowsdl/soap"
)

func main() {
	cli := soap.NewClient("http://www.cjienc.com/axis2/services/ShipClientService?wsdl",
		soap.WithBasicAuth("", ""),
		soap.WithTLS(&tls.Config{InsecureSkipVerify: true}),

	)
	soapService := wsdl.NewShipClientService(cli)
	res,err := soapService.GetChannelCatalog(&wsdl.GetChannelCatalog{})
	if err != nil{
		fmt.Println(err)
		return
	}else{
		fmt.Printf("%+v\n",res)
	}

}
