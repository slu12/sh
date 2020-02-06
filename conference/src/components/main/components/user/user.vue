<template>
  <div class="user-avatar-dropdown">
    <Tooltip content="退出登录" placement="bottom">
      <Icon type="md-log-out" size="23" @click.native="logout"/>
    </Tooltip>

<!--    <Dropdown @on-click="handleClick">-->
<!--      <Badge :dot="!!messageUnreadCount">-->
<!--        <Avatar :src="userAvatar"/>-->
<!--      </Badge>-->
<!--      <Icon :size="18" type="md-arrow-dropdown"></Icon>-->
<!--      <DropdownMenu slot="list">-->
<!--        <DropdownItem name="logout">退出登录</DropdownItem>-->
<!--      </DropdownMenu>-->
<!--    </Dropdown>-->
  </div>
</template>

<script>
import './user.less'
import { mapActions,mapMutations } from 'vuex'
export default {
  name: 'User',
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
        //this.clearTagNavList()
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
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
