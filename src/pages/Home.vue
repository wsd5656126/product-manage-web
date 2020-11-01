<template>
  <el-container style="min-height: 100%; border: 1px solid #eee">
    <el-aside style="background-color: #545c64; width: auto;">
      <PMenu :isMenuCollapse="isMenuCollapse"></PMenu>
    </el-aside>

    <el-container>
      <el-header>
        <el-button @click="isMenuCollapse = !isMenuCollapse" style="font-size: 24px;padding: 5px 8px;">
          <i :class="isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"/>
        </el-button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px">
            <span>欢迎回来,{{username}}</span>
          </i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item width="100" @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PMenu from '../components/PMenu'
import {clearGlobalData} from '../utils/globalData'
import {getGlobalData} from '../utils/globalData'

export default {
  name: 'Home',
  components: {PMenu},
  data () {
    return {
      isMenuCollapse: false,
      username: getGlobalData('username') || ''
    }
  },
  methods: {
    logout () {
      clearGlobalData('username')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.el-header {
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  font-size: 12px;
  background-color: #ededed;
}
.el-side {
  color: #333;
}
</style>
