<template>
  <div>
    <Modal
      v-model="modal1"
      title="修改条件集"
      :closable="false"
      :mask-closable="false"
      width="60"
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
            <div>
              <div>{{searchList.jgdm.label}}</div>
              <RadioGroup type="button" szie="small" v-model="searchList.jgdm.key">
                <Radio v-for="(it,index) in searchList.jgdm.selectList" :key="index" :label="it.key" @click.native="getname(it.val,'jgdm')">{{it.val}}</Radio>
              </RadioGroup>
            </div>
            <div>
              <div>{{searchList.zxzt.label}}</div>
              <RadioGroup type="button" szie="small" v-model="searchList.zxzt.key">
                <Radio v-for="(it,index) in searchList.zxzt.selectList" :key="index" :label="it.key" @click.native="getname(it.val,'zxzt')">{{it.val}}</Radio>
              </RadioGroup>
            </div>
            <div>
              <div>{{searchList.shiptype.label}}</div>
              <RadioGroup type="button" szie="small" v-model="searchList.shiptype.key">
                <Radio v-for="(it,index) in searchList.shiptype.selectList" :key="index" :label="it.key" @click.native="getname(it.val,'shiptype')">{{it.val}}</Radio>
              </RadioGroup>
            </div>
          </FormItem>
        </Form>

      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "update",
    data () {
      return {
        modal1: true,
        cblxList:[],
        searchList: {
          jgdm: {
            label: "所属机构：",
            key:'',
            selectList: []
          },
          zxzt: {
            label: "设备状态：",
            key:'',
            selectList: []
          },
          shiptype: {
            label: "船舶类别：",
            key: '',
            selectList: []
          }
        },
        param:{
          id:'',
          name:'',
          type: '0',// 0 公开  1 私有
          json:{
            jgdm:'',
            jgdmname:'',
            zxzt:'',
            zxztname:'',
            shiptype:'',
            shiptypename:''
          }
        }
      }
    },
    created(){
      if (this.$parent.item){
        this.param.json = {
          portname:{
            key:this.searchList.jgdm.key,
            value:this.param.json.jgdmname
          },
          zxzt:{
            key:this.searchList.zxzt.key,
            value:this.param.json.zxztname
          },
          shiptype:{
            key:this.searchList.shiptype.key,
            value:this.param.json.shiptypename
          },
        }
        var a = this.$parent.item.json
        this.param.id = this.$parent.item.id
        this.param.name = this.$parent.item.name
        if (this.$parent.item.type == '公开'){
          this.param.type = '0'
        }else {
          this.param.type = '1'
        }
        this.param.jgdm = a.portname.key
        this.searchList.jgdm.key = a.portname.key
        this.param.zxzt = a.zxzt.key
        this.searchList.zxzt.key = a.zxzt.key
        this.param.shiptype = a.shiptype.key
        this.searchList.shiptype.key = a.shiptype.key
        this.param.json.jgdmname = a.portname.value
        this.param.json.zxztname = a.zxzt.value
        this.param.json.shiptypename = a.shiptype.value
      }
      let cblxList = this.dictUtil.getByCode(this, 'CBLX')
      this.searchList.shiptype.selectList = cblxList
      let snztList = this.dictUtil.getByCode(this, 'ZDCLK0032')
      this.searchList.zxzt.selectList = snztList
      let cjList  = this.dictUtil.getByCode(this, 'CJ');
      this.searchList.jgdm.selectList = cjList
    },
    methods: {
      getname(val,e){
        if (e == 'shiptype'){
          this.param.json.shiptypename = val
        }else if (e == 'jgdm'){
          this.param.json.jgdmname = val
        }else {
          this.param.json.zxztname = val
        }
      },
      getJGList() {//机构列表
        this.$http.get('/api/jg/query').then(res => {
          if (res.code == 200) {
            let jgList = []
            res.result.forEach((it, index) => {
              let a = {}
              a.sel = false;
              a.key = it.jgdm;
              a.val = it.jgmc
              jgList.push(a)

              if(index == res.result.length-1){
                this.searchList.jgdm.selectList = jgList
              }
            })
          }
        }).catch(err => {
        })
      },
      ok () {
        this.param.json = {
          portname:{
            key:this.searchList.jgdm.key,
            value:this.param.json.jgdmname
          },
          zxzt:{
            key:this.searchList.zxzt.key,
            value:this.param.json.zxztname
          },
          shiptype:{
            key:this.searchList.shiptype.key,
            value:this.param.json.shiptypename
          },
        }
        this.param.json = JSON.stringify(this.param.json);
        this.$http.post('/api/cbcd/update',this.param).then((res)=>{
          if (res.code == 200){
            this.$Message.success('修改成功')
            this.$emit('getPager')
            this.$parent.compName = ''
          }else {
            this.$Message.error(res.message)
          }
        })
      },
      cancel () {
        this.$parent.compName = ''
        this.$emit('getPager')
      }
    }
  }
</script>

<style scoped>

</style>
