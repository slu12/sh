<template>
  <div>
    <Modal
      v-model="showModal"
      width='80%'
      :closable='true'
      :mask-closable="true"
      :title="mess.wlmc + ' 电子围栏'"
      @on-visible-change="visible"
      :footer-hide="true"
    >
      <div>
        <bkshow :wlid="wlid"></bkshow>
      </div>
      <div slot='footer'>
        <!--<Button type="default" @click="colse">关闭</Button>-->
      </div>
    </Modal>
  </div>
</template>

<script>
  import mixins from '@/mixins'
  import bkshow from '../../../map/mapBK_show'

  export default {
    name: '',
    mixins: [mixins],
    components: {
      bkshow
    },
    data() {
      return {
        showModal: true,
        bodyH: {
          height: 550
        },
        wlid: ''
      }
    },
    props: {
      mess: {
        type: Object,
        default: {}
      }
    },
    created() {
      this.wlid = this.mess.id
      console.log(this.mess)
      this.bodyH.height = (this.getWindowHeight() - 330) + 'px'
    },
    methods: {
      visible(val){
        if(!val){
          this.colse()
        }
      },
      colse() {
        // var v = this
        // v.$parent.compName = '';
        // v.$parent.componentName = '';
        this.$emit('close')
      }
    }
  }
</script>

<style>
</style>
