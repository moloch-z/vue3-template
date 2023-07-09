<template>
  <div class="login-wrap">
    <a-form
      name="basic"
      autocomplete="off"
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @finish="onFinish"
      @finishFailed="onFinishFailed">
      <a-form-item :label="$t('userName')" name="username" :rules="[{ required: true, message: $t('validUserName') }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item :label="$t('password')" name="password" :rules="[{ required: true, message: $t('validPassword') }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-row>
        <a-col :span="18">
          <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">{{ $t('rememberMe') }}</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <SwitchLocale />
        </a-col>
      </a-row>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">{{ $t('login') }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import type { LoginFormData } from '@/api'
// import { apiTokenSession } from '@/utils'
import { useUserStore } from '@/store'
import router from '@/router'

const formState = reactive<LoginFormData>({
  username: '',
  password: '',
  remember: true
})
const onFinish = (values: FormData) => {
  console.log('Success:', values)

  const user = useUserStore()
  user
    .login(values)
    .then(() => {
      router.push('/')
    })
    .catch(_ => {
      // 测试
      // apiTokenSession({ access_token: 'test', expires_in: 10000000 })
      router.push('/')
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<style lang="less" scoped>
.login-wrap {
  width: 600px;
}
</style>
