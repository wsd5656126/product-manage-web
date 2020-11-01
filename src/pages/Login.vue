<template>
  <div>
    <el-row :gutter="20" style="margin-top: 200px;">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
            <el-form :model="form" :rules="formRules" ref="form">
              <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {setGlobalData} from '../utils/globalData'

export default {
  name: 'Login',
  data () {
    return {
      form: {},
      formRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'change'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      //Element表单规则和配置formRules
      this.$refs['form'].validate(valid => {
        if (valid) {
          setGlobalData('username', this.form.username)
          this.$router.push({name: 'Home'})
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
