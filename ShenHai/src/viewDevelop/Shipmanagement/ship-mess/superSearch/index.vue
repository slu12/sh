<template>
  <div class="superSearch">
    <!--<i-switch size="large" v-model="checkbox">-->
    <!--<span slot="open">多选</span>-->
    <!--<span slot="close">单选</span>-->
    <!--</i-switch>-->
    <div class="JGline box_row colItemCenterc">
      <div class="JGlabel">
        选择结果：
      </div>
      <div class="box_row_100" style="line-height: 50px">
        <div class="box_row_list" style="padding: 10px 0">
          <div class="box_row" v-for="(val,key) in searchList" :key="key">
            <div v-for="(item,index) in val.selectList" :key="index"
                 class="selOkItemSty" v-if="item.sel">
              {{item.val}}
              <Icon type="md-close" @click.native="remove(val,item)"/>
            </div>
          </div>
        </div>
      </div>
      <search-group @getSearchGroup="getSearchGroup" @clearEvent="clearGroup"></search-group>
      <div class="boxMar_L">
        <Input v-model="con" @on-change="getPagerData()" placeholder="请输入MMSI/名称/设备号" style="width: 180px" />
        <Button type="primary" @click="getPagerData()" style="margin-left: 5px">
          <Icon type="md-search"></Icon>
        </Button>
        <Button type="primary" @click="AddDataList()" style="margin-left: 5px">
          <Icon type="md-add"></Icon>
        </Button>
      </div>
    </div>

    <div class="box_row searchLine" v-for="(val,key) in searchList" :key="key">
      <div class="lineTitle">
        {{val.label}}
      </div>

      <div v-if="val.showAll" class="box_row_100">
        <div class="box_row_list">
          <div class="selItem" :class="item.sel?'selItemOK':''"
               v-for="(item,index) in val.selectList" :key="index"
               @click="selItem(val,item)">
            {{item.val}}
          </div>
        </div>
      </div>

      <div v-else class="box_row_1auto">
        <div class="" style="white-space: nowrap;
        overflow: hidden;line-height: 26px">
          <span class="selItem" :class="item.sel?'selItemOK':''"
                v-for="(item,index) in val.selectList" :key="index"
                @click="selItem(val,item)">
            {{item.val}}
          </span>
        </div>
      </div>
      <div class="muchStyBox">
        <div class="muchButSty" @click="val.showAll = !val.showAll">
          更多
          <Icon :type="val.showAll ?'ios-arrow-down':'ios-arrow-up' "/>
        </div>
      </div>
    </div>
    <!--<div>-->
    <!--{{selList}}-->
    <!--</div>-->
  </div>
</template>

<script>
  import searchGroup from './comp/searchGroup'

  export default {
    name: "index",
    components: {searchGroup},
    props: {
      checkbox: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      // searchList: {
      //   type: Object,
      //   default: () => {
      //     return {
      //       jg: {
      //         label: "所属机构：",
      //         selectList: [
      //           {
      //             sel: false,
      //             key: '001',
      //             val: '华为'
      //           },
      //           {
      //             sel: false,
      //             key: '002',
      //             val: 'apple'
      //           },
      //           {
      //             sel: false,
      //             key: '003',
      //             val: 'vivo'
      //           }
      //         ]
      //       },
      //       shzt: {
      //         label: "设备状态：",
      //         key: 'mem',
      //         selectList: [
      //           {
      //             sel: false,
      //             key: '0001',
      //             val: '64G'
      //           },
      //           {
      //             sel: false,
      //             key: '0002',
      //             val: '128G'
      //           },
      //           {
      //             sel: false,
      //             key: '0003',
      //             val: '256G'
      //           }
      //         ]
      //       },
      //       cblb: {
      //         label: "船舶类别：",
      //         key: 'mem',
      //         selectList: [
      //           // {
      //           //   sel: false,
      //           //   key: '0001',
      //           //   val: '64G'
      //           // },
      //           // {
      //           //   sel: false,
      //           //   key: '0002',
      //           //   val: '128G'
      //           // },
      //           // {
      //           //   sel: false,
      //           //   key: '0003',
      //           //   val: '256G'
      //           // }
      //         ]
      //       }
      //     }
      //   }
      // }
    },
    data() {
      return {
        con:'',
        selList: {},
        searchList: {
          portname: {
            label: "船籍港：",
            showAll: false,
            selectList: [
              {
                sel: false,
                key: '001',
                val: '华为'
              }
            ]
          },
          nav: {
            label: "设备状态：",
            showAll: false,
            selectList: []
          },
          shiptype: {
            label: "船舶类别：",
            showAll: false,
            selectList: []
          }
        }
      }
    },
    created() {
      let portnameList = this.dictUtil.getByCode(this, 'CJ')
      this.searchList.portname.selectList = portnameList

      let cblxList = this.dictUtil.getByCode(this, 'CBLX')
      this.searchList.shiptype.selectList = cblxList
      let snztList = this.dictUtil.getByCode(this, 'ZDCLK0032')
      this.searchList.nav.selectList = snztList
      // this.getJGList()
    },
    methods: {
      getPagerData(){
        console.log(this.con,'1');
        this.$emit('getPagerData',this.con)
      },
      // getJGList() {//机构列表
      //   this.$http.get('/api/jg/query').then(res => {
      //     if (res.code == 200) {
      //       let jgList = []
      //       res.result.forEach((it, index) => {
      //         let a = {}
      //         a.sel = false;
      //         a.key = it.portname;
      //         a.val = it.jgmc
      //         jgList.push(a)
      //
      //         if (index == res.result.length - 1) {
      //           this.searchList.portname.selectList = jgList
      //         }
      //       })
      //     }
      //   }).catch(err => {
      //   })
      // },

      AddDataList() {
        this.$emit('addEvent')
      },
      clearGroup(){
        for(let li in this.searchList){
          this.searchList[li].selectList.forEach((it,index)=>{
            it.sel = false
          })
        }
        this.setCallBackSel()
      },
      getSearchGroup(val) {
        let group = JSON.parse(val)
        console.log('group',group);
        for(let li in group){
          let line = this.searchList[li]
          let item = group[li]
          this.selItem(line, item)
          // line.selectList.forEach((it,index)=>{
          //   if(it.key == item.key){
          //     it.sel = true
          //   }else{
          //     it.sel = false
          //   }
          // })
        }
      },
      selItem(line, item) {//选择项操作
        console.log(line);
        console.log(item);
        if (this.checkbox) {//每一项单选
          item.sel = true
        } else {            //每一项多选
          line.selectList.forEach((it, index) => {
            if (it.key == item.key) {
              it.sel = true
            } else {
              it.sel = false
            }
          })
        }
        this.setCallBackSel()
      },
      remove(line, item) {
        item.sel = false
        this.setCallBackSel()
      },
      setCallBackSel() {
        this.selList = {}
        for (let key in this.searchList) {
          this.selList[key] = []
          this.searchList[key].selectList.forEach((it, index) => {
            if (it.sel) {
              this.selList[key].push(it.key)
            }
          })
        }

        this.$emit('getParams', this.selList)
      }
    }
  }
</script>

<style lang="less">
  @import "./index";
</style>
