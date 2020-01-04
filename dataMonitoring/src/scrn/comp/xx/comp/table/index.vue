<template>
  <div class="tableBoxSty">
    <Table :columns="columns1" :data="data1"
           size="small"></Table>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        columns1: [
          {
            title: "提交人",
            align:'center',
            key: 'name'
          },
          {
            title: '提交时间',
            align:'center',
            key: 'time'
          },
          {
            title: '服务机构',
            align:'center',
            key: 'address'
          },
          {
            title: '案件类型',
            align:'center',
            key: 'type'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            time: '2016-10-03',
            address: '银行',
            type: '仲裁'
          },
          {
            name: 'John Brown',
            time: '2016-10-03',
            address: '银行',
            type: '仲裁'
          },
          {
            name: 'John Brown',
            time: '2016-10-03',
            address: '银行',
            type: '仲裁'
          },
          {
            name: 'John Brown',
            time: '2016-10-03',
            address: '银行',
            type: '仲裁'
          },
          {
            name: 'John Brown',
            time: '2016-10-03',
            address: '银行',
            type: '仲裁'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
