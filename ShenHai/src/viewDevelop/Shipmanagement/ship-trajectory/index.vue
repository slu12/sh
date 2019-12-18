<template>
  <div class="tabWrap">
    <div class="tabNav">
      <span class="iconClass">
      <Icon type="chevron-up" @click.native="upTab"></Icon>
      </span>
      <div id="tabBar">
        <ul id="tabUl">
          <li :class="[{activeTab:index === tabIndex},'tabLi']" v-for="(item,index) in tabList" :key="index"
              @click="changeTab(index)">{{item.label}}
          </li>
        </ul>
      </div>
      <span class="iconClass">
      <Icon type="chevron-down" @click.native="downTab"></Icon>
      </span>
    </div>
    <div class="tabContent">
      <div v-if="tabIndex === 0">
        sousuo
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    watch: {
      tabIndex: function (newVal) {
        this.imgShow = 0
        let scrollNav = document.getElementById('tabUl')
        let tabBar = document.getElementById('tabBar')
        let transformHeight = scrollNav.scrollHeight - tabBar.clientHeight
        if (Number(newVal) >= 3) {
          this.$nextTick(function () {
            scrollNav.style.transform = `translateY(-${transformHeight}px)`
          })
        } else {
          this.$nextTick(function () {
            scrollNav.style.transform = 'translateY(0px)'
          })
        }
      }
    },
    data() {
      return {
        tabIndex: 0,
        tabList: [
          {label: '船舶列表'},
          {label: '船舶信息'},
          {label: '设备运行情况'},
          {label: '异常情况'},
          {label: '视频监控'},
        ],

      }
    },
    methods: {
// 更改tab页签
      changeTab(index) {
        this.tabIndex = index
        this.$store.state.proofActiveName = this.tabIndex
      },
// 调整Tab滚动
      upTab() {
        let scrollNav = document.getElementById('tabUl')
        this.$nextTick(function () {
          scrollNav.style.transform = 'translateY(0px)'
        })
      },
      downTab() {
        let scrollNav = document.getElementById('tabUl')
        let tabBar = document.getElementById('tabBar')
        let transformHeight = scrollNav.scrollHeight - tabBar.clientHeight
        this.$nextTick(function () {
          scrollNav.style.transform = `translateY(-${transformHeight}px)`
        })
      }
    }

  }
</script>

<style lang="less">
  .tabWrap {
    width: 100%;
    height: 100%;

    .tabNav {
      width: 40px;
      height: 100%;
      float: right;
      background-color: #5E687D;

      #tabBar {
        height: e("calc(100% - 60px)");
        overflow: hidden;
        z-index: -1;

        #tabUl {
          width: 36px;
          border-right: 1px solid #dddee1;
          transition: -webkit-transform .5s ease-in-out;
          transition: transform .5s ease-in-out;

          .tabLi {
            width: 100%;
            font-size: 14px;
            /*writing-mode: vertical-lr;*/
            padding: 14px 0 14px 0;
            cursor: pointer;
            border: 1px solid #dddee1;
            border-right: 0;
            margin-bottom: 5px;
            text-align: center;
            vertical-align: middle;
            background:#5E687D;
            color: #fdfdfd;
          }

          .tabLi:hover {
            color: #fdfdfd;
          }

          .activeTab {
            color: #FFFFFF;
            background: #363E4F;
            width: 36px;
            z-index: 100;
          }
        }
      }

      .iconClass {
        display: inline-block;
        height: 30px;
        margin-left: 8px;
        cursor: pointer;
        text-align: center;
        line-height: 30px;
        width: e("calc(100% - 10px)");
      }
    }

    .tabContent {
      float: right;
      background: #363E4F;
      width: e("calc(100% - 70% - 41px)");
      height: 100%;
      overflow: auto;
    }
  }
</style>
