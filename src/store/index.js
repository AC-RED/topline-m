import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

const USER_KEY = 'user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了避免刷新token丢失，使用本地存储，持久化
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
