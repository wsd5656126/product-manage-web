# 第12章 实战: 三天开发一个管理端
管理后台优点是简单,缺点也是简单.脑子要灵活点,学会使用开源的组件.  
项目使用Element-UI

task:(el-button成功显示)使用Element-UI 1

## 12.1 设计管理端功能
管理后台:增删改查;菜单,列表,表单.

数据驱动的方式开发:
1. 根据页面设计分割模块和组件 菜单,列表
2. 根据组件抽象来设计数据 菜单的数据结构,增删改查方法

### 12.1.1 菜单设计
将菜单抽象为数据,每个父菜单:
1. 图标icon
2. 菜单名字 text
3. 子菜单列表subMenus,以及子菜单名字text
```js
const menus = [
  {
    text: "服务管理",
    icon: "el-icon-setting",
    submenus: [
      {text: "服务信息"},
      {text: "新增"}
    ]
  },
  {
    text: "产品管理",
    icon: "el-icon-menu",
    submenus: [{text: "产品信息"}]
  },
  {
    text: "日志信息",
    icon: "el-icon-message"
  }
]
```

### 12.1.2 列表设计
每行内容:
1. 日期 date
2. 姓名 name,
3. 电话 phone,
4. 地址: address
```js
const tableItem = {
  date: "2020-10-22",
  name: "吴盛东",
  phone: "18617081555",
  address: "浙江省杭州市西湖区"
}
const tableData = Array(20)
  .fill(tableItem)
  .map((x, i) => {
    return {id: i + 1, ...x};
  });
//期望id为2 1
console.log(tableData[1]);
```

### 12.1.3 方法
和算法4对于数据结构的定义没有不同,方法有四种:新增、删除、上移、下移

```js
export default {
  data () {
    return {
      menus: menus,
      tableData: tableData
    };
  },
  methods: {
    addTableItem(item = {}) {
      this.tableData.push({...x, id: this.tableData.length + 1});
    },
    deleteTableItem(id) {
      const index = this.tableData.findIndex(x => x.id === id);
      this.tableData.splice(index, 1);
    },
    moveTableItem(id, direction) {
      const dataLength = this.tableData.length;
      const index = this.tableData.findIndex(x => x.id === id);
      switch (direction) {
        case "up":
          if (index > 0) {//第一个不上移
            const item = this.tableData.split(index, 1)[0];
            this.tableData.splice(index - 1, 0, item);
          }
          break;
        case "down":
          if (index < dataLength - 1) {//最后一个不下移动
            const item = this.tableData.split(index, 1)[0];
            this.tableData.split(index + 1, 0, item);
          }
          break;
      }
    }
  }
}
```

## 12.2 组件快速开发
设计好数据结构,终于可以开始进行页面绑定数据了.  
页面绑定数据,也分步骤
1. 找到对应组件
2. 精简成自己需要的
3. 使用v标签, 绑定数据

Tip: 可以引入VueRouter了,方便试效果

### 12.2.1 菜单绑定
对应PMenu.vue
v-for v-bind {{x.message}}

### 12.2.2 列表绑定
CSS可以参考elementUI官网, 注意使用scope.row

### 12.2.3 表单绑定
使用Element-Dialog组件  
弹窗的要点:
1. 默认弹窗隐藏
2. 单击外界按钮显示弹窗
3. 处理弹窗后, 隐藏或显示
4. 上面三点核心是dialogFormVisible的值的变化

## 12.3 设计页面与路由
路由就是应用的页面结构.  
怎么配置路由,实际上就是怎么设计应用的页面结构.

### 12.3.1 页面结构设计
常用的管理后台页面类型: 页面内容,功能
1. 登录页 输入用户名,密码
2. 列表+表单 单页增删改查,dialog
3. 列表页 查删,增改需要表单页
4. 表单页 增改,配合列表页使用

由上述知道菜单的页面要用什么

### 12.3.2 页面路由设计
页面路由设计(页面结构设计): 路由(path), 页面内容,页面对应的Component,页面组成
1. /login               登录页 Login 表单
2. /home                应用首页 Home 左<Menu>,右<router-view>
3. /home/service        服务信息页 Service <Home>的子路由,列表和表单
4. /home/product        产品容器页 Product <Home>的子路由,包括<router-view>
5. /home/product/list   产品信息页 ProductList 为Product的子路由组件,列表
6. /home/product/edit   产品编辑页 ProductEdit 为Product的子路由组件,表单

路由的原则: 一个路由大部分对应pages的一个文件, 比如编辑和新增可以服用

### 12.3.3 目录结构划分
好的目录,好的代码就是天然的注释了

## 12.4 路由配置与开发
### 12.4.1 配置路由信息
main.js的routes数组
### 12.4.2 Vue中加载vue-router和路由信息
新增个VueRouter对象,再传入Vue对象中.

mode模式有两种:
1. hash /#/pageone,丑
2. history /pageone

### 12.4.3 <router-view>使用
有没有router-view,取决于有没有子菜单

见App.vue,Home.vue.

### 12.4.4 <router-link>使用
<router-link> </router-link>

router-link属性说明: 配置,说明
1. to 一个路径字符串,或者location descriptor对象
2. tag 渲染成的html元素类型,默认是<a>
3. exact 用于控制当前激活项的行为
4. append 相对链接路径的追加方式
5. replace 替代而不是压栈
6. active-class 链接项激活的CSS样式

### 12.4.5 使用watch监控路由变化
先在菜单上绑定routerName,再使用watch监控路由($route)变化,获取激活内容

$route(to)

### 12.4.6 路由跳转
对应ProductList.vue, 例子:列表到编辑或者新增

## 12.5 给路由增加鉴权
用于登录

### 12.5.1 设置简单的全局数据
globalData.js

### 12.5.2 登录页面登录
Login.vue

### 12.5.3 鉴权进入内页
使用vue-router的router.beforeEach守卫.  
对应main.js

## 总结css
1. App.vue 注意是否有scoped
2. Login.vue 无
3. Home.vue 




