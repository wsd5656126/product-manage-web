<template>
  <div>
    <el-row>
      <el-col :span="24">
        <!-- 删除过程中，不允许其他操作 -->
        <el-button v-if="!showDeleteCheckbox"
                   type="primary"
                   @click="dialogFormVisible = true;form = {};formTitle='新增'"
        >
          新增
        </el-button>
        <el-button v-if="!showDeleteCheckbox" @click="showDeleteCheckbox = true;" type="danger">删除</el-button>
        <!-- 删除过程中，只出现确认删除按钮 -->
        <el-button v-if="showDeleteCheckbox"
                   @click="deleteTableItem(chosenItem);showDeleteCheckbox = false;chosenItem = [];" type="danger">确认删除
        </el-button>
        <el-button v-if="showDeleteCheckbox" @click="showDeleteCheckbox = false;">取消</el-button>
      </el-col>
    </el-row>

    <el-table
        :data="tableData"
        stripe
        style="border: 1px solid #ebebeb;border-radius: 3px;margin-top: 10px;">
      <el-table-column prop="id"
                       label="id"
                       width="100">
        <template slot-scope="scope">
          <el-checkbox v-if="showDeleteCheckbox"
                       :checked="chosenItem.indexOf(scope.row.id) > -1"
                       @change="toggleChosenItem(scope.row.id)"
                       style="margin-right: 5px">
          </el-checkbox>
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date"
                       label="日期"
                       width="200">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="200">
      </el-table-column>
      <el-table-column prop="phone"
                       label="电话"
                       width="200">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="form = {...scope.row};dialogFormVisible=true;formTitle='编辑'"
                     size="small"
                     type="info"
                     :disabled="showDeleteCheckbox"
          >
            编辑
          </el-button>
          <el-button @click="deleteTableItem(scope.row.id)"
                     size="small"
                     type="danger"
                     :disabled="showDeleteCheckbox"
          >
            删除
          </el-button>
          <el-button @click="moveTableItem(scope.row.id, 'up')"
                     size="small"
                     :disabled="showDeleteCheckbox"
          >
            上移
          </el-button>
          <el-button @click="moveTableItem(scope.row.id, 'down')"
                     size="small"
                     :disabled="showDeleteCheckbox"
          >
            下移
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="formTitle" v-bind:visible="dialogFormVisible">
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
            @click="dialogFormVisible = false; updateTableItem(form)"
        >确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {checkPhoneValidator} from "../../utils/validator"

const tableItem = {
  date: "2020-10-22",
  name: "吴盛东",
  phone: "18617081555",
  address: "浙江省杭州市西湖区"
}
const tableData = Array(20)
  .fill(tableItem)
  .map((x, i) => {
    return {id: i + 1, ...x}
  })
export default {
  name: "Service",
  data () {
    return {
      tableData: tableData,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      showDeleteCheckbox: false,
      chosenItem: [],
      formRules: {
        date: [
          {type: "string", required: true, message: "请选择日期", trigger: "change"}
        ],
        name: [
          {required: true, message: "请输入名字", trigger: "change"},
          {min: 2, max: 10, message: "长度在 2 到 10 个字", trigger: "blur"}
        ],
        phone: [
          {required: true, validator: checkPhoneValidator, trigger: "blur"}
        ]
      },
      formTitle: ""
    }
  },
  methods: {
    toggleChosenItem (id) {
      const index = this.chosenItem.findIndex(x => x.id === id)
      if (index > -1) {
        this.chosenItem.splice(index, 1)
      } else {
        this.chosenItem.push(id)
      }
    },
    // 新增/删除一个数据
    updateTableItem (item = {}) {
      // todo 解决日期问题
      if (item.id !== undefined) {
        let itemIndex = this.tableData.findIndex(x => x.id === item.id)
        if (itemIndex > -1) {
          this.tableData.splice(itemIndex, 1, {...item})
        }
      } else {
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
        case "up":
          if (index > 0) {
            // 第一个不上移
            const item = this.tableData.splice(index, 1)[0]
            this.tableData.splice(index - 1, 0, item)
          }
          break
        case "down":
          if (index < dataLength - 1) {
            // 最后一个不下移动
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
