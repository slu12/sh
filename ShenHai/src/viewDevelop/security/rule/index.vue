<template>
  <div class="box-col">
    <div class="box_row rowBetween colItemCenter boxMar_B">
      <pager-tit></pager-tit>
      <div class="box_row rowRight">
        <div class="body-r-1 inputSty">
          <!--<DatePicker v-model="cjsjInRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请输时间" @on-keyup.enter="findMessList()" style="width: 220px"></DatePicker>-->
          <Input  placeholder='请输入引擎名称' style="width: 200px"></Input>
        </div>
        <div class="butevent" style="z-index: auto">
          <Button type="primary">
            <Icon type="md-search"></Icon>
            <!--查询-->
          </Button>
        </div>
        <div class="butevent" style="z-index: auto">
          <Button type="primary">
            <Icon type="md-add"></Icon>
            <!--查询-->
          </Button>
        </div>
      </div>
    </div>
    <div class="box_col_auto">
      <Row>
        <Col span="8">
          <Card style="width: 400px">
            <p slot="title">
              1号规则(激活)
            </p>
            <a href="#" slot="extra">
              <Icon type="ios-loop-strong"></Icon>
              关闭
            </a>
            <p>如果 条件1 则执行 条件2</p>
            <p>如果 条件3 则执行 条件4</p>
            <p>如果 条件5 则执行 条件6</p>
            <div>
              <Input search enter-button="备注" placeholder="Enter something..." />
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card style="width: 400px">
            <p slot="title">
              1号规则(关闭)
            </p>
            <a href="#" slot="extra">
              <Icon type="ios-loop-strong"></Icon>
              激活
            </a>
            <p>如果 条件1 则执行 条件2</p>
            <p>如果 条件3 则执行 条件4</p>
            <p>如果 条件5 则执行 条件6</p>
            <div>
              <Input search enter-button="备注" placeholder="Enter something..." />
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

          }
      },
      mounted() {

      },
      created() {

      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
