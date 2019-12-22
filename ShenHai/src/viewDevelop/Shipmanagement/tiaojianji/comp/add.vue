<template>
    <div>
      <Modal
        v-model="modal1"
        title="新增条件集"
        :closable="false"
        :mask-closable="false"
        @on-ok="ok"
        @on-cancel="cancel">
        <div>
          <Form :model="param" label-position="left" :label-width="50">
            <FormItem label="类型:">
              <RadioGroup v-model="param.type" type="button">
                <Radio label="0">公开</Radio>
                <Radio label="1">私有</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="名称">
              <Input v-model="param.name"></Input>
            </FormItem>
            <FormItem label="选项">
              <div>状态:全部</div>
            </FormItem>
          </Form>

        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "add",
      data () {
        return {
          modal1: true,
          param:{
            name:'',
            type: '0',// 0 公开  1 私有
            json:{
              cj:'',
            }
          }
        }
      },
      methods: {
        ok () {
          this.param.json = JSON.stringify(this.param.json);
          this.$http.post('/api/cbcd/save',this.param).then((res)=>{
            if (res.code == 200){

            }else {

            }
          })
        },
        cancel () {
          this.$parent.compName = ''
        }
      }
    }
</script>

<style scoped>

</style>
