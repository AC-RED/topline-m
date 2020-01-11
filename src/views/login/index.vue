<template>
  <div class="login">
    <van-nav-bar title="注册/登录" />

    <ValidationObserver ref="form">
      <van-cell-group>
        <!-- <van-icon name="user-o" /> -->
        <ValidationProvider name="手机号" rules="required|mobile" immediate>
          <van-field
            v-model="user.mobile"
            left-icon="user-o"
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
          />
        </ValidationProvider>

        <ValidationProvider name="验证码" rules="required|code" immediate>
          <van-cell-group>
            <!-- <van-icon name="closed-eye" /> -->
            <van-field
              v-model="user.code"
              left-icon="closed-eye"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <van-count-down
                v-if="isCountownShow"
                slot="button"
                format="ss s"
                :time="5*1000"
                @finish="isCountownShow = false"
              />

              <van-button
                v-else
                slot="button"
                size="small"
                type="primary"
                @click="onSendSmsCode"
              >发送验证码</van-button>
            </van-field>
          </van-cell-group>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <van-button type="info" class="login_btn" @click="onLogin">登录</van-button>
  </div>
</template>

<script>
// import request from '@/utils/request'
import { login, getSmsCode } from '@/api/user'

import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isCountownShow: false
    }
  },
  methods: {
    async onLogin () {
      const success = await this.$refs.form.validate()

      if (!success) {
        console.log('表单验证失败')
        const errors = this.$refs.form.errors

        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        return
      }

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      try {
        const { data } = await login(this.user)

        this.$store.commit('setUser', data.data)
        // const res = await request({
        //   method: 'post',
        //   url: '/app/v1_0/authorizations',
        //   data: this.user
        // })
        this.$toast.success('登录成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
    },

    async onSendSmsCode () {
      try {
        const { mobile } = this.user

        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })

        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }

        const res = await getSmsCode(mobile)
        this.isCountownShow = true
        console.log(res)
      } catch (err) {
        console.log(err)
        this.$toast('请勿频繁操作')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  .login_btn {
    margin: 27px 16px;
    width: 92%;
    .van-button__text {
      width: 100%;
    }
  }
}
</style>
