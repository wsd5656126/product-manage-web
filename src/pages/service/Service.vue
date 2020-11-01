<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true; form={}">新增</el-button>

    <el-dialog title="新增" v-bind:visible="dialogFormVisible">
      <el-form ref="form" :model="form" v-bind:label-width="formLabelWidth">
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false; addTableItem(form)"
        >确定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="tableData"
      stripe
      style="border: 1px solid #ebebeb;border-radius: 3px;margin-top: 10px;">
      <el-table-column
        prop="id"
        label="id"
        width="100">
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
  name: 'Service',
  data () {
    return {
      tableData: tableData,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    addTableItem (item = {}) {
      if (item.name) {
        this.tableData.push({...item, id: this.tableData.length + 1})
      }
    },
    deleteTableItem (id) {
      const index = this.tableData.findIndex(x => x.id === id)
      this.tableData.splice(index, 1)
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
    }
  }
}
</script>

<style scoped>

</style>
