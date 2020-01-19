<template>
  <div class="box_col">
    <div class="box_row rowBetween colItemCenter boxMar_B">
      <pager-tit></pager-tit>
      <div class="box_row rowRight">
        <Input v-model="params.xmLike" prefix="ios-contact" placeholder="请输入用户姓名" style="width: auto"
               @on-enter="getDataList()"/>
        <Button class="searchMar_L" type="primary" icon="ios-search" @click="getDataList()"></Button>
        <Button class="searchMar_L" type="primary" icon="md-add" @click="getDataList()"></Button>
      </div>
    </div>
    <div class="box_col_auto">
      <div :id="tabBox" style="height:100%">
        <Table :height="tab_H" :stripe="false" :columns="tabTit" :data="tabData">
          <template slot-scope="{ row, index }" slot="slotLX">
            <div>
              tabslot
            </div>
          </template>
        </Table>
      </div>
    </div>
    <div class="box_col_auto">
      <table-box
        :columns="tabTit" :data="tabData"
      >
        <template slot="pagerTitle"></template>
        <template slot="slotLX" slot-scope="{ row , column , index }">
          <div>
            {{row.xm}}
            {{column.title}}
            {{index}}
          </div>
        </template>

      </table-box>
    </div>
    <div class="box_row rowRight boxPadd_T">
      <tab-pager></tab-pager>
    </div>
  </div>
</template>

<script>
  import tabTit from './listPagerComp/tabTitData'

  import tableBox from '@/components/A_components/tableBox'

  export default {
    name: "listPager",
    components: {tableBox},
    mixins: [tabTit],
    data() {
      return {}
    },
    created() {
      this.getDataList()
    },
    methods: {
      getDataList() {
        var v = this
        this.$http.get(this.apis.USER.QUERY, {params: v.params}).then((res) => {
          v.tabData = res.page.list
          v.pageTotal = res.page.total
        })
      },
    }
  }
</script>

<style scoped>

</style>
