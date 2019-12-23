/**
@Name : chenwei
@Time : 2019/12/13 7:33 上午
**/
package shipapis

type ApiResult struct {
	Status string
	Result map[string]interface{}
}
type ListResult struct {
	Result []map[string]interface{}
	Status string
	Total  int
}
