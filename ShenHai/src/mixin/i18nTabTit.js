import { mapState } from 'vuex'
import config from '@/config'
export default {
  created(){
  },
  computed:{
    ...mapState({
      local:state => state.app.local
    })
  },
  watch:{
    local:function (n,o) {
      this.GetTabTitLang()
    }
  },
  mounted() {
    this.$nextTick(()=>{
      try {
        this.tab_H = this.AF.getDom_H(this.tabBox)
        this.GetTabTitLang()
      }catch (e) {
      }
    })
  },
  methods: {
    GetTabTitLang() {
      console.log(config.useI18n);
      if(config.useI18n){
        this.tabTit.forEach((it, index) => {
          it.title = this.$t(it.tit)
        })
      }
    }
  }
}
