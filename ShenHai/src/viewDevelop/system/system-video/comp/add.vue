<template>
  <div>
    <Modal
      title='新增'
      v-model="showModal"
      :mask-closable="false"
      :closable="false"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div>
        <Input v-model="addmess.sbh" placeholder="请输入设备号" style="width: 300px" />
      </div>
    </Modal>
  </div>
</template>

<script>


  export default {
    name: '',
    data() {
      return {
        showModal: true,
        operate: '新增',
        //新增数据
        addmess: {
          sbh:""
        },
        orgList: [],
        treeValue: [],
        orgTree: [],
        orgPath: [],
      }
    },
    props: {

    },
    created() {
    },
    methods: {
      ok(){
        if (this.addmess.sbh==''||this.addmess.sbh ==undefined){
          this.swal({
            title:'请输入设备号',
            type:'error'
          })
        }else {
          this.$http.post('/api/cbsb/save',this.addmess).then((res)=>{
            if (res.code == 200){
              this.swal({
                title:'添加成功!',
                type:'success'
              })
              this.$parent.componentName = ''
              this.$emit('getpager')
            }else {
              this.swal({
                title:res.message,
                type:'error'
              })
            }
          })
        }
      },
      cancel(){
        this.$parent.componentName = ''
      },
    }
  }
</script>

<style>
</style>
