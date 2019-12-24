<template>
  <div class="box-col">
    <div class="box_row rowBetween colItemCenter boxMar_B">
      <pager-tit></pager-tit>

      <div class="box_row rowRight">
        <div class="body-r-1 inputSty">
          <!--<DatePicker v-model="cjsjInRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请输时间" @on-keyup.enter="findMessList()" style="width: 220px"></DatePicker>-->
          <Input  placeholder='请输入引擎名称' style="width: 200px"></Input>
        </div>
        <div style="z-index: auto;padding-left: 5px">
          <Button type="primary">
            <Icon type="md-search"></Icon>
            <!--查询-->
          </Button>
        </div>
        <div  style="z-index: auto;padding-left: 5px">
          <Button type="primary">
            <Icon type="md-add"></Icon>
          </Button>
        </div>
      </div>
    </div>
    <div class="box_col_auto">

      <Row>

        <Col span="12" style="padding: 10px" v-for="(item,index) in data1" :key="index">
          <Card style="height:400px;overflow: scroll;">
              <Row style="height: 40px">
                <Col span="12" style="font-size: 20px;font-weight: 600">
                  {{item.mc}}
                </Col>
                <Col span="12" align="right">
                  <RadioGroup type="button" size="large" v-model="sp">
                    <Radio label="0">激活</Radio>
                    <Radio label="1">停用</Radio>
                  </RadioGroup>
                </Col>
              </Row>
            <List header="数据来源" border size="small">
                <ListItem v-for="(it,id) in item.sr" :key="id">{{it}}</ListItem>
            </List>
            <div style="padding-top: 10px">
              <List header="输出结果" border size="small">
                <ListItem>{{item.sc}}</ListItem>
                <ListItem>适用对象: &nbsp;&nbsp;<Tag color="green">{{item.dx}}</Tag> </ListItem>
              </List>
            </div>
          </Card>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return {
              switch1: false,
              sp: '0',
              data1:[
                {mc:'江船入海',sr:['1.船舶类型','2.船舶坐标，以二维坐标点表示','3.禁入水域范围，以二维坐标点集合表示，构成一封闭区域']
                    ,sc:'提示消息。如果是江船并且当前位置在禁入水域，有报警消息。',dx:'海事'},
                {mc:'偏离规定航线',sr:['1.船舶坐标','2.航线信息'],sc:'提示消息，如果偏离航线，则有报警消息。' +
        '判断逻辑：根据输入的航线，系统会产生航线对应的合理航行区域，再根据船舶坐标判断该船是否在这航行区域内。',dx:'银行'},
                {mc:'超时停泊',sr:['1.船舶坐标','2.停泊时间','3.误差范围'],sc:'警示消息判断逻辑：如果船舶长时间在某一固定点附近（静止未动或者小范围运动），系统给出警示消息。',dx:'银行'},
                {mc:'超速航行',sr:['1.带时间戳的船舶坐标序列','2.水流速度、风速'],sc:'超速提示消息判断逻辑：根据带时间戳的坐标序列，可计算出船舶一段时间内的平均速度，结合水流速度、风速等因素，判断船舶是否超速。',dx:'船东'},
              ],
          }
      },
      mounted() {

      },
      created() {

      },
      methods: {
        change (status) {

        }
      }
    }
</script>

<style scoped>

</style>
