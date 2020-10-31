# product-manage-web

## 开发相关
1. 关闭eslint webpack.base.conf.js
2. 配置vue路由,便于开发

## 需求划分

### 登录页
数据: 
```json
{
  "username": "",
  "password": ""
}
```
方法: login

### 应用页
按布局分为3个部分
#### 菜单(左)
数据:
```json
{
"menus":[{
  "index": "",
  "text": "",
  "icon": "",
  "subMenus": [
    {
      "index": "",
      "text": ""
    }
  ]
}],
"activeMenuIndex": "",
"shrink": "false"
}
```
方法: changeActiveMenuIndex

#### 状态栏(右上)
```json
{
  "username": ""
}
```
方法: logout
#### 内容(右下)
```json
{
  "tableData" : [
    {
      "id": "",
      "date": "",
      "name": "",
      "phone": "",
      "address": ""
    }
  ],
  "form": {
    "id": "",
    "date": "",
    "name": "",
    "phone": "",
    "address": ""
  }
}
```
方法: addTableItem, editTableItem, deleteTableItem, moveTableItem

