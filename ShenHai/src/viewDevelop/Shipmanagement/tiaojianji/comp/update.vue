<template>
  <div>
    <Modal
      v-model="modal1"
      title="修改条件集"
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
        var a = this.$parent.item.json
        this.param.id = this.$parent.item.id
        this.param.name = this.$parent.item.name
        this.param.type = this.$parent.item.type
        this.param.jgdm = a.jgdm
        this.searchList.jgdm.key = a.jgdm
        this.param.zxzt = a.zxzt
        this.searchList.zxzt.key = a.zxzt
        this.param.shiptype = a.shiptype
        this.searchList.shiptype.key = a.shiptype
        this.param.jgdmname = a.jgdmname
        this.param.zxztname = a.zxztname
        this.param.shiptypename = a.shiptypename
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
        this.param.json.zxzt = this.searchList.zxzt.key
        this.param.json.shiptype = this.searchList.shiptype.key
        this.param.json.jgdm = this.searchList.jgdm.key
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
