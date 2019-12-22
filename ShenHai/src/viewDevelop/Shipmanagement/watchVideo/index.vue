<template>
  <div>
    参数
    <div>
      query:{{routeQuerys.id}}
    </div>
    <div>
      params:{{routeParams.text}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        routeQuerys:{

        },
        routeParams:{

        }
      }
    },
    created(){
      console.log(this.$route);
      this.routeQuerys = this.$route.query
      this.routeParams = this.$route.params
    }
  }
</script>

<style scoped>

</style>
