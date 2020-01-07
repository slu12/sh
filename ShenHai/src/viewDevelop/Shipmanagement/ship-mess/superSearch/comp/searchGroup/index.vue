<template>
  <div>
    <Row>
      <Col span="14">
        <Select
          v-model="searchGroupVal"
          clearable
          @on-change="getSearchGroupVal"
          @on-clear = "clearEvent"
          style="width: 200px">
          <Option v-for="(option, index) in optionsList" :value="option.id"
                  :key="index">{{option.text}}</Option>
        </Select>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        searchGroupVal:"",
        optionsList:[]
      }
    },
    created(){
      this.getOptionsList()
    },
    methods:{
      getOptionsList(){
        this.$http.get('/api/cbcd/pager').then(res=>{
          res.page.list.forEach((it,index)=>{
            it.jsonP = JSON.parse(it.json)
            it.text = ""
            for(let a in it.jsonP){
              it.text =it.text + it.jsonP[a].value + '、'
            }
            if(index == res.page.list.length - 1){
              this.optionsList = res.page.list
            }
          })
        }).catch(err=>{})
      },
      getSearchGroupVal(val){
        // console.log(val);
        this.optionsList.forEach((it,index)=>{
          if(it.id == val){
            this.$emit('getSearchGroup',it.json)
          }
        })
      },
      clearEvent(){
        this.$emit('clearEvent')
      }
    }
  }
</script>

<style scoped>

</style>
