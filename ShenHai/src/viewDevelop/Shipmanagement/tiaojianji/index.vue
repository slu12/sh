<template>
    <div class="box_col">
      <div class="box_row rowBetween colItemCenter boxMar_B">
        <pager-tit></pager-tit>
        <div class="box_row rowRight">
          <div class="body-r-1 inputSty">
            <!--<DatePicker v-model="cjsjInRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请输时间" @on-keyup.enter="findMessList()" style="width: 220px"></DatePicker>-->
            <Input v-model="param.nameLike"  placeholder='请输入条件集名称' style="width: 200px"></Input>
          </div>
          <div  style="z-index: auto;padding-left: 5px">
            <Button type="primary" @click="param.pageNum =1,getPager()">
              <Icon type="md-search"></Icon>
              <!--查询-->
            </Button>
          </div>
          <div style="z-index: auto;padding-left: 5px">
            <Button type="primary" @click="compName='add'">
              <Icon type="md-add"></Icon>
            </Button>
          </div>
        </div>
      </div>
      <div class="box_col_auto">
         <Row>
           <Col span="4" v-for="(item,index) in tjjList" :key="index">
               <Card>
                 <p slot="title">{{item.name}}</p>
                 <a href="#" slot="extra">
                   <tag>{{item.type}}</tag>
                   <Button type="info" size="small">
                     <Icon type="md-create" @click="update(item)"/>
                   </Button>
                   <Button type="warning" size="small">
                     <Icon type="md-close" @click="delTj(item.id)"/>
                   </Button>

                 </a>
                 <List border size="small">
                   <ListItem>船籍 : {{item.json.portname.value}}</ListItem>
                   <ListItem>终端状态 : {{item.json.zxzt.value}}</ListItem>
                   <ListItem>船舶类别 : {{item.json.shiptype.value}}</ListItem>
                 </List>
               </Card>
           </Col>
         </Row>
      </div>
      <Row class="boxMar_T box_row rowRight">
        <Page :total=pageTotal :current=param.pageNum :page-size=param.pageSize
              :page-size-opts=[8,10,15,20,30,40,50]
              @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}' show-total show-elevator
              show-sizer placement='top' @on-change='pageChange'></Page>
      </Row>
      <component :is="compName" :item="item" @getPager="getPager"></component>
    </div>
</template>

<script>
    import util from "../../../libs/util2";
    import add from './comp/add'
    import update from './comp/update'
    export default {
        name: "index",
      components: {
        add,update
      },
      data(){
        return{
          item:{},
          tjjList:[],
          compName:'',
          pageTotal:0,
          param:{
            nameLike:'',
            pageSize:12,
            pageNum:1
          }
        }
      },
      created(){
        this.getPager()
      },
      methods:{
          update(item){
            this.item =  item
            this.compName = 'update'
          },
          delTj(id){
            this.swal({
              title:'是否确认删除?',
              type: "warning",
              showCancelButton: true,
              confirmButtonText: "确认",
              cancelButtonText: "取消",
            }).then( (val) =>{
                if (val.value) {
                  this.$http.post('/api/cbcd/remove/'+id).then((res)=>{
                    if (res.code == 200){
                      this.$Message.success(res.message)
                      this.getPager()
                    }else {
                      this.$Message.success(res.message)
                    }
                  })
                } else {

                }
            })
          },
          getPager(){
            this.param.pageNum = 1
            this.$http.post('/api/cbcd/pager',this.param).then((res)=>{
              if (res.code == 200){
                this.pageTotal = res.page.total
                this.tjjList = res.page.list
                for (let i = 0;i<=this.tjjList.length;i++){
                  console.log(this.tjjList[i].json);
                  let a  = this.tjjList[i].json
                  this.tjjList[i].json =  JSON.parse(a);
                  console.log(this.tjjList[i].json);
                  this.tjjList[i].type = this.xsType(this.tjjList[i].type)
                }
              }
            })
          },
          xsType(a){
            if (a == 1){
              return '私有'
            }else {
              return '公开'
            }
          },
          //分页点击事件按
          pageChange(event) {
            var v = this
            v.param.pageNum = event
            this.getPager()
          }
      }
    }
</script>

<style scoped>

</style>
