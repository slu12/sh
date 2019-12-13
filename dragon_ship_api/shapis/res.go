/**
@Name : chenwei
@Time : 2019/12/13 7:33 上午
**/
package shapis

type SingleResult struct {
	Status int
	Result string
}
type ListResult struct {
	Result string
	Status int
	Total  int
}
