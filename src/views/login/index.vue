<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到luciana网站</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              :loading="loading"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
/**
 * 引入获取当前时间的函数
 */
import { getTime } from '@/utils/time'
/**
 * 引入用户相关小仓库
 */
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
/**
 * 获取 el-form 组件
 */
let loginForms = ref()
/**
 * 获取路由器
 */
let $router = useRouter()
/**
 * 定义变量控制按钮加载效果
 */
let loading = ref(false)
/**
 * 收集账号密码数据
 */
let loginForm = reactive({ username: 'admin', password: '111111' })
/**
 * 登录回调
 */
const login = async () => {
  // 保证检验通过再发请求
  await loginForms.value.validate()
  loading.value = true
  try {
    // 保证登陆成功
    await useStore.userLogin(loginForm)
    // 编程式导航跳转到展示数据页面
    $router.push('/')
    // 登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `hi，${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    // 登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

/**
 * 自定义检验规则函数
 * @param rule 校验规则对象
 * @param value 表单元素文本内容
 * @param callback 函数：若符合条件callback放行通过即可，若不符callback注入错误提示信息
 */
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名至少为5位'))
  }
}

/**
 * 定义表单校验的配置对象
 */
const rules = {
  username: [
    {
      trigger: 'change',
      validator: validatorUsername,
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: '密码至少为6位',
      trigger: 'change',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    background: rgb(74, 135, 239);
    padding: 16px;
    h1 {
      color: #fff;
      font-size: 40px;
    }
    h2 {
      color: #fff;
      font-size: 32px;
      margin: 12px 0;
    }
    .login_btn {
      width: 100%;
      color: #fff;
    }
  }
}
</style>
