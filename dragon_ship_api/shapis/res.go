/**
@Name : chenwei
@Time : 2019/12/13 7:33 上午
**/
package shapis

type SingleResult struct {
	Status int
	Result interface{}
}
type ListResult struct {
	Result []interface{}
	Status int
	Total  int
}
