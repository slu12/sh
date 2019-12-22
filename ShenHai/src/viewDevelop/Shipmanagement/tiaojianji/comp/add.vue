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
                <div v-for="(item,index) in  searchList" :key="index">
                   <div>{{item.label}}</div>
                  <RadioGroup type="button" szie="small" v-model="item.key.key">
                    <Radio v-for="(it,index) in item.selectList" :key="index" :label="it.key" @click="getname(it.val)">{{it.val}}</Radio>
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
        name: "add",
      data () {
        return {
          modal1: true,
          cblxList:[],
          searchList: {
            jgdm: {
              label: "所属机构：",
              key:{},
              selectList: []
            },
            zxzt: {
              label: "设备状态：",
              key:{},
              selectList: []
            },
            shiptype: {
              label: "船舶类别：",
              key: {},
              selectList: []
            }
          },
          param:{
            name:'',
            type: '0',// 0 公开  1 私有
            json:{
              jgdm:{},
              zxzt:{},
              shiptype:{}
            }
          }
        }
      },
      created(){
        let cblxList = this.dictUtil.getByCode(this, 'CBLX')
        this.searchList.shiptype.selectList = cblxList
        let snztList = this.dictUtil.getByCode(this, 'ZDCLK0032')
        this.searchList.zxzt.selectList = snztList
        this.getJGList()
      },
      methods: {
        getname(val){

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
            jgdm:{
              key:this.searchList.jgdm.key,
              val:this.searchList.jgdm.val,
            },
            zxzt:this.searchList.zxzt.key,
            shiptype:this.searchList.shiptype.key
          };
          this.param.json = JSON.stringify(this.param.json);
          this.$http.post('/api/cbcd/save',this.param).then((res)=>{
            if (res.code == 200){
              this.$Message.success('添加成功')
            }else {
              this.$Message.error(res.message)
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
