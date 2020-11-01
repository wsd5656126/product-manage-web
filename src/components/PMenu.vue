<template>
  <div>
    <el-menu
      :collapse="isMenuCollapse"
      v-bind:default-openeds="['0', '1']"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!--使用template块级元素,循环-->
      <template v-for="menu in menus">
        <!--如果有子菜单-->
        <el-submenu v-if="menu.subMenus && menu.subMenus.length"
                    v-bind:key="menu.index"
                    v-bind:index="menu.index"
        >
          <template slot="title">
            <i v-bind:class="menu.icon"></i>
            <span slot="title">{{menu.text}}</span>
          </template>
          <el-menu-item-group>
            <router-link tag="div"
                         v-for="subMenu in menu.subMenus"
                         v-bind:key="subMenu.index"
                         v-bind:to="{name: subMenu.routerName}">
              <el-menu-item v-bind:index="subMenu.index">
                {{subMenu.text}}
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <!--如果没有子菜单-->
        <router-link tag="div" v-else v-bind:key="menu.index" v-bind:to="{name: menu.routerName}">
          <el-menu-item>
            <i v-bind:class="menu.icon"></i>
            <span slot="title">{{menu.text}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<script>
const menus = [
  {
    text: '服务管理',
    icon: 'el-icon-setting',
    subMenus: [
      {text: '服务信息', routerName: 'Service'}
    ]
  },
  {
    text: '产品管理',
    icon: 'el-icon-menu',
    subMenus: [
      {text: '产品信息', routerName: 'ProductList'},
      {text: '产品新增', routerName: 'ProductAdd'}
    ]
  },
  {
    text: '日志信息',
    icon: 'el-icon-message',
    routerName: 'Log'
  }
].map((x, i) => {
  return {
    ...x,
    subMenus: (x.subMenus || []).map((y, j) => {
      return {
        ...y,
        index: `${i + 1}-${j + 1}`
      }
    }),
    index: `${i + 1}`
  }
})
export default {
  name: 'PMenu',
  data () {
    return {
      menus: menus,
      activeIndex: ''
    }
  },
  props: {
    isMenuCollapse: Boolean
  },
  watch: {
    // 为了设置element的菜单默认激活属性,需要获取路由状态
    $route (to) {
      let activeIndex
      this.menus.forEach(x => {
        if (x.routerName === to.name) {
          activeIndex = x.index
        } else {
          const subMenuItem = x.subMenus.find(y => y.routerName === to.name)
          if (subMenuItem) {
            activeIndex = subMenuItem.index
          }
        }
      })
      if (activeIndex) {
        this.activeIndex = activeIndex
      }
    }
  }
}
</script>

<style scoped>
</style>
