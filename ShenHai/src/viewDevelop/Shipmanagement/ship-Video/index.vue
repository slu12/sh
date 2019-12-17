<template>
    <div class="box_col">
       <div class="box_row rowBetween colItemCenter boxMar_B">
         <pager-tit></pager-tit>
         <div class="box_row rowRight">
           <div class="body-r-1 inputSty">
             <DatePicker v-model="cjsjInRange"
                         format="yyyy-MM-dd"
                         type="daterange"
                         placement="bottom-end"
                         placeholder='请选择时间'
                         @on-keyup.enter="findMessList()"
                         style="width: 220px"></DatePicker>
           </div>
           <div class="body-r-1 inputSty">
             <Input type="text" v-model="param.cphLike" placeholder='船舶号'></Input>
           </div>
           <div class="body-r-1 inputSty">
             <Input type="text" v-model="param.zdbhLike" placeholder='终端号'></Input>
           </div>
           <div class="butevent">
             <Button type="primary" @click="findMessList()">
               <Icon type="md-search"></Icon>
               <!--查询-->
             </Button>
           </div>
         </div>
       </div>
      <div class="box_col_auto">
<!--        <htmlpanel :url.asyc="url1"></htmlpanel>-->
        <Row style="padding: 0 290px">
           <Col span="8" style="padding-top: 5px"  v-for="(item,index) in 9">
             <Card style="width:550px;height: 360px">
               <p slot="title">
                 <Icon type="ios-film-outline"></Icon>
                 {{index+1}}号
               </p>
               <ul>
                 <iframe  style="width: 100%;height: 280px" :src="url1"></iframe>
               </ul>
             </Card>
           </Col>
        </Row>



        <div class="body">
          <div class="box-row-list">
            <div class="bodyC videoSty"
                 style="min-height: 140px;"
                 v-for="(item,index) in videoList">
              <div v-if="!item.video">
                <div class="videoBF" @click="videoS(item.video,item,index)">
                  <Icon class="icon" type="arrow-right-b"
                        @click="videoS(item.video,item,index)"
                        color="#b5b5b5" size='38'></Icon>
                </div>
                <img style="width: 100%;height: 200px"
                     :src="videoPath+item.imgdz"/>
              </div>
              <video v-else
                     style="width: 100%;height: 200px"
                     :src="videoPath+item.url"
                     autoplay="autoplay"
                     controls="controls"></video>
              <div class="VideoTit">
                {{item.cph}}
                <div style="float: right;cursor: pointer;">
						    	<span v-show="item.video"
                        @click="videoF(item.video,item,index)">
						    		<!--<Icon type="close-circled" style="float: right"></Icon>-->
						    		关闭
						    	</span>
                  <span style="color: #ff9900;" @click="videoColse(item,index)">
						    		移除
						    	</span>
                </div>
              </div>
              <div>
                [{{item.cjsj}}]
              </div>
              <div>
                {{item.wz ? item.wz : '……'}}
              </div>
            </div>
          </div>
        </div>
        <div v-show="!vadeoShow" class="body" style="border: 1px solid #dddee1;position: relative">
          <h1 style="color: #bdbdbd;position: absolute;top:40%;left: 50%;transform: translate(-50%,-50%)">
            {{param.cphLike}}暂无视频数据
          </h1>
        </div>
<!--        <div class="margin-top-10 pageSty" style="height: 60px;">-->
<!--          <Page-->
<!--            :total=pageTotal-->
<!--            :current=param.pageNum-->
<!--            :page-size=param.pageSize :page-size-opts=[8,10,20,30,40,50]-->
<!--            @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}'-->
<!--            show-total-->
<!--            show-elevator show-sizer placement='top'-->
<!--            @on-change='pageChange'></Page>-->
<!--        </div>-->
      </div>
    </div>
</template>

<script>
  // import mixins from '@/mixins'
  import htmlpanel from './htmlpanel'

  export default {
    name: '',
    // mixins: [mixins],
    components: {htmlpanel},
    data() {
      return {
        url1:'http://139.196.253.185/808gps/open/hls/index.html?lang=zh&devIdno=30895&jsession=b678293e-66f1-45d3-a571-662765d8c0b5&channel=2',
        vadeoShow: true,
        videoPath: '',
        activeName: 0,
        cjsjInRange: [],
        carList: [],
        pageTotal: 1,
        page: {
          pageNum: 1,
          pageSize: 8
        },
        videoList: [],
        param: {
          cjsjInRange: '',
          cphLike: '',
          wjmLike:'F',
          pageNum: 1,
          pageSize: 12,
          zdbhLike: ''
        }
      }
    },
    created() {
      if (this.$route.params && this.$route.params.zdbh) {
        this.param.zdbhLike = this.$route.params.zdbh
      }
      this.getmess()
      this.getCarList();
    },
    methods: {
      videoS(type, item, index) {
        this.videoList[index].video = true
      },
      videoF(type, item, index) {
        this.videoList[index].video = false
      },
      videoColse(item, index) {
        var v = this
        swal({
          text: "是否删除数据?",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then((willDelete) => {
          if (willDelete.value) {
            this.$http.post('').then((res) => {
              if (res.code == 200) {
                v.$Message.success(res.message);
              } else {
                v.$Message.error(res.message);
              }
              v.getmess()
            }).catch((error) => {
              v.$Message.error('出错了！！！');
            })
          }
        });
      },
      getmess() {
        if (this.cjsjInRange.length != 0 && this.cjsjInRange[0] != '' && this.cjsjInRange[1] != '') {
          this.param.cjsjInRange = this.getdateParaD(this.cjsjInRange[0]) + "," + this.getdateParaD(this.cjsjInRange[1]);
        } else {
          this.param.cjsjInRange = '';
        }
        var v = this
        v.param.wjmEndwith = '.mp4';
        this.$http.get('', {params: v.param}).then((res) => {
          if (res.code == 200) {
            v.pageTotal = res.page.total
            if (res.page.list.length > 0) {
              for (let r of res.page.list) {
                if (r.url) {
                  r.video = false
                  r.imgdz = r.url.replace('video', 'cache');
                  r.imgdz = r.imgdz.replace('mp4', 'jpg')
                }
              }
              v.videoList = res.page.list
              v.vadeoShow = true
            } else {
              v.vadeoShow = false
            }

          }
        })
      },
      getCarList() {
        var v = this
        this.$http.get('').then((res) => {
          this.carList = res.result
          v.SpinShow = false;
        })
      },
      findMessList() {
        this.getmess();
      },
      pageChange(event) {
        var v = this
        v.param.pageNum = event
        this.getmess()
      },
    }
  }
</script>

<style lang="less">
  @import '../../../styles/common.less';

  .CloudVideo {
    background-color: #fff;
    .videoSty {
      border-bottom: solid 1px #dedede;
      position: relative;
      .videoBF {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100;
      }
      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 101;
      }
      .VideoTit {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 102;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        padding: 3px 5px;
        width: 100%;

      }
    }
    .inputTit {
      margin-bottom: 5px;
    }
  }

  .videoInfo {
    text-align: center;
    padding: 16px;
    margin-bottom: 16px;
  }
</style>
