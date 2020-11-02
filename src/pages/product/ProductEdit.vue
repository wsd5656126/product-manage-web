<template>
  <div>
    <el-card class="box-card" title="新增">
      <div slot="header" class="clearfix">
        <span>{{form.id ? '编辑' : '新建'}}</span>
      </div>

      <el-form ref="form" :model="form" :rules="formRules" v-bind:label-width="formLabelWidth">
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="form.date"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>

</template>

<script>
import {checkPhoneValidator} from '../../utils/validator'
import tableData from './data'

export default {
  name: 'ProductEdit',
  data () {
    return {
      formLabelWidth: '120px',
      form: {},
      formRules: {
        date: [
          {type: 'string', required: true, message: '请选择日期', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入名字', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在2到10个字', trigger: 'blur'}
        ],
        phone: [
          {required: true, validator: checkPhoneValidator, trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    '$route' () {
      this.updateFormItem()
    }
  },
  created: function () {
    this.updateFormItem()
  },
  methods: {
    updateFormItem () {
      const id = this.$route.params.id
      const formItem = tableData.find(x => x.id === id)
      if (formItem) {
        this.form = {...formItem}
      } else {
        this.form = {}
      }
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.updateFormItem(this.form)
          this.$router.push({name: 'ProductList'})
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
