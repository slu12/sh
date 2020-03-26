<template>
  <div class="user-avatar-dropdown">
<!--  <div>-->
<!--    <div style="">-->
<!--      <Button type="warning" @click="xgmm">修改密码</Button>-->
<!--      <Button type="error" @click="logout">退出登录</Button>-->
<!--    </div>-->

    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="passworld">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <component :is="compName" @logout="logout"></component>
  </div>
</template>

<script>
import './user.less'
import { mapActions,mapMutations } from 'vuex'
import passworld from './passworld';
export default {
  name: 'User',
  components: {
    passworld
  },
  data(){
    return{
      compName: '',
    }
  },
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    ...mapMutations([
      'clearTagNavList'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.clearTagNavList()
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    xgmm(){
      this.compName = 'passworld'
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
        case 'passworld': this.xgmm()
          break
      }
    }
  }
}
</script>
