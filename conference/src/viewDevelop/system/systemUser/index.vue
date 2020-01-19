<template>
  <div class="box_col">
    <component :is="compName"></component>
  </div>
</template>

<script>
  import listPager from './listPager'

  export default {
    name: "index",
    components:{
      listPager
    },
    data(){
      return {
        compName:"listPager"
      }
    }
  }
</script>

<style scoped>

</style>
