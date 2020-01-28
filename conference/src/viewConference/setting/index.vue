<template>
  <div class="box_col videoSettingPager">
    <Row :gutter="16">
      <Col span="4">
        <Card class="cardLine">
          <div class="box_row colCenter rowBetween">
            <div class="settingName">
              房间人数上限
            </div>
            <div class="settingBox2">
              <Button v-show="!setPerson.set" type="info" size="small" @click="settingPer">设置</Button>
              <Button v-show="setPerson.set" type="success" size="small" @click="settingPer">完成</Button>
            </div>
          </div>
          <div>
            <div v-show="!setPerson.set" class="settingBox1">
              {{setPerson.val}} /人
            </div>
            <div v-show="setPerson.set" class="settingBox1">
              <Input v-model="setPerson.val" type="number" size="small" placeholder="Enter something..." style="width: 140px">
              <span slot="append">人</span>
              </Input>
            </div>
          </div>
        </Card>
      </Col>
      <Col span="4">
        <Card class="cardLine">
          <div class="box_row colCenter rowBetween">
            <div class="settingName">
              会议存储地址
            </div>
            <div class="settingBox2">
              <Button v-show="!setCon.set" type="info" size="small" @click="settingCon">设置</Button>
              <Button v-show="setCon.set" type="success" size="small" @click="settingCon">完成</Button>
            </div>
          </div>
          <div>
            <div v-show="!setCon.set" class="settingBox1">
              {{setCon.val}}
            </div>
            <div v-show="setCon.set" class="settingBox1">
              <Input v-model="setCon.val" size="small" placeholder="Enter something..." style="width: 140px"/>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <!--<Card class="cardLine">-->
      <!--<div class="box_row colCenter">-->
        <!--<div class="settingName">-->
          <!--房间人数上限-->
        <!--</div>-->
        <!--<div class="settingBox1">-->
          <!--1000 /人-->
        <!--</div>-->
        <!--<div class="settingBox2">-->
          <!--<Button type="info" size="small">设置</Button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</Card>-->
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        setPerson: {
          set: false,
          val: 1000
        },
        setCon: {
          set: false,
          val: 'www.video.com/video/'
        }
      }
    },
    methods: {
      settingPer() {
        this.setPerson.set = !this.setPerson.set
      },
      settingCon(){
        this.setCon.set = !this.setCon.set
      }
    }
  }
</script>

<style lang="less">
  @import "./less/index";
</style>
