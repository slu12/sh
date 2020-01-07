<template>
  <div>
    <Page :total=$parent.pageTotal :current=$parent.params.pageNum :page-size=$parent.params.pageSize
          :page-size-opts=sizeOpts show-total show-elevator show-sizer placement='top'
          @on-change='setPagerNum' @on-page-size-change='setPagerSize'
    ></Page>
  </div>
</template>

<script>
  import { pageSizeOpts } from '@/config/constant'
  export default {
    name: "index",
    data(){
      return {
        sizeOpts:pageSizeOpts
      }
    },
    created(){
      console.log(pageSizeOpts);
    },
    methods:{
      setPagerNum(val){
        this.$parent.params.pageNum = val
        this.$parent.getDataList()
      },
      setPagerSize(val){
        this.$parent.params.pageSize = val
        this.$parent.getDataList()
      }
    }
  }
</script>

<style scoped>

</style>
