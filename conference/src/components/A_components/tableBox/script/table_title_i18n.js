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
        this.table_height = this.AF.getDom_H(this.table_box_id)
        this.GetTabTitLang()
      }catch (e) {
      }
    })
  },
  methods: {
    GetTabTitLang() {
      if(config.useI18n){
        this.columns.forEach((it, index) => {
          it.title = this.$t(it.i18n)
        })
      }
    }
  }
}
