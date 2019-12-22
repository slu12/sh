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
              <RadioGroup v-model="param.lx" type="button">
                <Radio label="00">公开</Radio>
                <Radio label="10">私有</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="名称">
              <Input v-model="param.name"></Input>
            </FormItem>
            <FormItem label="选项">

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
            lx:'00'
          }
        }
      },
      methods: {
        ok () {
          this.$Message.info('Clicked ok');
        },
        cancel () {
          this.$parent.compName = ''
        }
      }
    }
</script>

<style scoped>

</style>
