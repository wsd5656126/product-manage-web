<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button v-if="!showDeleteCheckbox" type="primary" @click="updateTableItem()">新增</el-button>
        <el-button v-if="!showDeleteCheckbox" type="danger" @click="showDeleteCheckbox = true;">
          删除
        </el-button>
        <el-button v-if="showDeleteCheckbox"
                   @click="deleteTableItem(chosenItem);showDeleteCheckbox = false; chosenItem = []"
                   type="danger"
        >
          确定删除
        </el-button>
        <el-button v-if="showDeleteCheckbox" @click="showDeleteCheckbox = false">
          取消
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData"
              stripe
              style="border: 1px solid #ebebeb;border-radius: 3px;margin-top: 10px;">
      <el-table-column prop="id"
                       label="id"
                       width="100"
      >
        <template slot-scope="scope">
          <el-checkbox v-if="showDeleteCheckbox"
                       :checked="chosenItem.indexOf(scope.row.id) > 1"
                       @change="toggleChosenItem(scope.row.id)"
                       style="margin-right: 5px"
          >
          </el-checkbox>
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            @click="deleteTableItem(scope.row.id)"
            size="small"
            type="danger"
          >
            删除
          </el-button>
          <el-button
            @click="moveTableItem(scope.row.id, 'up')"
            size="small"
          >
            上移
          </el-button>
          <el-button
            @click="moveTableItem(scope.row.id, 'down')"
            size="small"
          >
            下移
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const tableItem = {
  date: '2020-10-22',
  name: '吴盛东',
  phone: '18617081555',
  address: '浙江省杭州市西湖区'
}
const tableData = Array(20)
  .fill(tableItem)
  .map((x, i) => {
    return {id: i + 1, ...x}
  })
export default {
  name: 'ProductList',
  data () {
    return {
      tableData: tableData,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      chosenItem: [],
      showDeleteCheckbox: false
    }
  },
  methods: {
    addTableItem (item = {}) {
      if (item.name) {
        this.tableData.push({...item, id: this.tableData.length + 1})
      }
    },
    deleteTableItem (idArray) {
      const tableData = this.tableData.filter(x => idArray.indexOf(x.id) === -1)
      this.tableData = tableData
    },
    moveTableItem (id, direction) {
      const dataLength = this.tableData.length
      const index = this.tableData.findIndex(x => x.id === id)
      switch (direction) {
        case 'up':
          if (index > 0) {//第一个不上移
            const item = this.tableData.splice(index, 1)[0]
            this.tableData.splice(index - 1, 0, item)
          }
          break
        case 'down':
          if (index < dataLength - 1) {//最后一个不下移动
            const item = this.tableData.splice(index, 1)[0]
            this.tableData.splice(index + 1, 0, item)
          }
          break
      }
    },
    toggleChosenItem (id) {
      const index = this.chosenItem.findIndex(x => x.id === id)
      if (index > -1) {
        this.chosenItem.splice(index, 1)
      } else {
        this.chosenItem.push(id)
      }
    },
    updateTableItem (id = 0) {
      if (id !== 0) {
        this.$router.push({name: 'ProductList', params: {id}})
      } else {
        this.$router.push({name: 'ProductAdd'})
      }
    }
  }
}
</script>

<style scoped>

</style>
