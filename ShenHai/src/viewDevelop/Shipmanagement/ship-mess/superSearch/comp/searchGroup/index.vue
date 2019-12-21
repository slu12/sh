<template>
  <div>
    <Select
      v-model="searchGroupVal"
      size="small"
      multiple
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="searchGroupLoading"
      style="width: 360px"
    >
      <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
    </Select>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        searchGroupVal:"",
        searchGroupLoading:false,
      }
    },
    methods:{
      remoteMethod (query) {
        if (query !== '') {
          this.loading2 = true;
          setTimeout(() => {
            this.loading2 = false;
            const list = this.list.map(item => {
              return {
                value: item,
                label: item
              };
            });
            this.options2 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options2 = [];
        }
      }
    }
  }
</script>

<style scoped>

</style>
