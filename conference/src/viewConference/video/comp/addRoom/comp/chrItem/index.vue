<template>
  <div>
    <Form ref="formInlineC" label-position="top"
          :model="formInlineC" :rules="ruleInlineC">
      <Row :gutter="16">
        <Col span="8">
          <FormItem label="主持人姓名" prop="name">
            <Input v-model="formInlineC.name" placeholder="主持人姓名"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="主持人手机号" prop="phone">
            <Input v-model="formInlineC.phone" placeholder="主持人手机号"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="证件号码后6位" prop="idcard">
            <Input v-model="formInlineC.idcard" placeholder="证件号码后6位"/>
          </FormItem>
        </Col>
      </Row>
      <div>
        <Button type="success" long @click="addPre">添加参会人员</Button>
      </div>

    </Form>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        formInlineC: {
          "phone": "13112121212",
          "idcard": "666666",
          "name": "网系哦啊"
        },
        ruleInlineC: {
          name:[
            { required: true, message: '请填写会议名称', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '主持人手机号', trigger: 'blur' }
          ],
          idcard:[
            { required: true,min:6,max:6 ,message: '请填写证件号码后6位', trigger: 'blur' }
          ],
        }
      }
    },
    created() {

    },
    methods: {
      addPre() {
        var v = this
        this.$refs["formInlineC"].validate((valid) => {
          if (valid) {
            this.$emit('addPre',v.formInlineC)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
