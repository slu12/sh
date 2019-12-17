<template>
  <div class="box_row colItemCenter pagerTitSty">
    <div class="icon">
      <Icon :type="routerMess.meta.icon"></Icon>
    </div>
      <div class="titsty">
        <slot>
          <div v-if="config.useI18n">
            {{$t(routerMess.name)}}
          </div>
          <div v-else>
            {{routerMess.meta.title}}
          </div>
        </slot>
      </div>
  </div>

</template>

<script>
  import config from '@/config'
  export default {
    name: "index.vue",
    data(){
      return {
        config:config,
        routerMess:this.$route
      }
    },
    created(){
      // console.log(this.$route);
    }
  }
</script>

<style lang="less">
  .pagerTitSty {
    .icon{
      margin-right: 12px;
      i{
        font-size: 28px;
      }
    }
    .titsty{
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>
