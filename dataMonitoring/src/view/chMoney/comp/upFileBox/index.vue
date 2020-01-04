<template>
  <div>
    <Upload
      ref="upload"
      :action="action"
      :multiple="false"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      style="">
      <slot>
        <div class="upCenterBox" :style="{width:W_H[0]+'px',height:W_H[1]+'px'}">
          <Icon type="ios-add" />
        </div>
      </slot>
    </Upload>
  </div>
</template>

<script>
  export default {
    name: "index",
    props:{
      W_H:{
        type:Array,
        default:()=>{
          return [253,253]
        }
      }
    },
    data() {
      return {
        action: 'http://mt.xxpt123.com:81/upload',// /img
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    created() {

    },
    methods: {
      handleSuccess(res, file) {//文件上传成功
        this.$emit('handleSuccess', res.message)
      },
      handleError(res, file) {//文件上传失败
        this.$Message.error('文件上传失败');
        // this.$emit('handleSuccess', 'https://i.loli.net/2017/08/21/599a521472424.jpg')
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
    }
  }
</script>

<style lang="less">
.upCenterBox{
  background-color: #FFFFFF;
  position: relative;
  border-radius: 10px;
  i{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 140px;
    color: #CCCCCC;
  }
}
</style>
