<template>
    <div class="box_col">
      <div class="box_row rowBetween colItemCenter boxMar_B">
        <pager-tit></pager-tit>
        <div class="box_row rowRight">
          <div class="body-r-1 inputSty">
            <!--<DatePicker v-model="cjsjInRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请输时间" @on-keyup.enter="findMessList()" style="width: 220px"></DatePicker>-->
            <Input  placeholder='请输入条件集名称' style="width: 200px"></Input>
          </div>
          <div  style="z-index: auto">
            <Button type="primary">
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
           <Col span="4">
               <Card>
                 <p slot="title">条件集名称</p>
                 <a href="#" slot="extra">
                   公开
                 </a>
                 <List border size="small">
                   <ListItem>船籍</ListItem>
                   <ListItem>状态</ListItem>
                   <ListItem>设备</ListItem>
                 </List>
               </Card>
           </Col>
         </Row>
      </div>
      <component :is="compName"></component>
    </div>
</template>

<script>
    import util from "../../../libs/util2";
    import add from './comp/add'
    export default {
        name: "index",
      components: {
        add
      },
      data(){
        return{
          CJList:[],
          compName:''
        }
      },
      created(){

      },
      method:{

      }
    }
</script>

<style scoped>

</style>
