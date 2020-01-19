<template>
  <div class="box_col">
    <div class="boxMar">
      <pager-tit>
        <slot name="pagerTitle"></slot>
      </pager-tit>
    </div>
    <div :id="table_box_id" class="box_col_auto" style="background-color: orange">
      <Table :columns="columns" :data="data"
             :height="table_height" :max-height="maxHeight" :width="width"
             :stripe="stripe" :loading="loading"
             :disabled-hover="disabledHover"
             :highlight-row="highlightRow"
             :row-class-name="rowClassName"
             :size="size" :no-data-text="noDataText"
             :no-filtered-data-text="noFilteredDataText"
             :draggable="draggable " :tooltip-theme="tooltipTheme"
             :row-key="rowKey"
      >
        <template
          v-for="(it,index) in columns"
          v-if="it.slot"
          slot-scope="{ row , column , index }" :slot="it.slot"
        >
          <slot name="slotLX"
                v-bind:row="row"
                v-bind:column="column"
                v-bind:index="index"
          >
          </slot>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
  import mixins from './script/mixins'

  export default {
    name: "index",
    mixins: [mixins],
    data() {
      return {
        table_height: 0,
      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
