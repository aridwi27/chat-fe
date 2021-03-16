import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      name: localStorage.getItem('name') || null,
      id: localStorage.getItem('id') || null,
      room: localStorage.getItem('room_id') || null,
      image: localStorage.getItem('image') || null,
      phone: localStorage.getItem('phone') || null,
      username: localStorage.getItem('username') || null,
      profile: {},
      userProfile: {},
      webURL: process.env.VUE_APP_URL
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setName (state, payload) {
      state.name = payload
    },
    setId (state, payload) {
      state.id = payload
    },
    setRoom (state, payload) {
      state.room = payload
    },
    setImage (state, payload) {
      state.image = payload
    },
    setPhone (state, payload) {
      state.phone = payload
    },
    setUsername (state, payload) {
      state.username = payload
    },
    setDetailProfile (state, payload) {
      state.profile = payload
    },
    setDetailUser (state, payload) {
      state.userProfile = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.webURL}/login`, data).then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('room_id', response.data.room_id)
          localStorage.setItem('image', response.data.image)
          localStorage.setItem('phone', response.data.phone)
          localStorage.setItem('username', response.data.username)
          context.commit('setToken', response.data.token)
          context.commit('setName', response.data.name)
          context.commit('setId', response.data.id)
          context.commit('setRoom', response.data.room_id)
          context.commit('setImage', response.data.image)
          context.commit('setPhone', response.data.phone)
          context.commit('setUsername', response.data.username)
          resolve(response.data.msg)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.webURL}/register`, data).then((response) => {
          resolve(response.data.msg)
        }).catch((error) => {
          reject(error.response.data)
        })
      })
    },
    actionGetDetail (items, id) {
      axios.get(`${items.state.webURL}/profile/${id}`, { headers: { token: items.rootState.auth.token } }).then((response) => {
        items.commit('setDetailProfile', response.data.data)
        items.commit('setDetailUser', response.data.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    updateProfile (items, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${items.state.webURL}/update/${items.getters.getUserID}`, data, { headers: { token: items.rootState.auth.token } }).then((response) => {
          resolve(response.data.data)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        localStorage.removeItem('room_id')
        localStorage.removeItem('name')
        localStorage.removeItem('id')
        localStorage.removeItem('image')
        localStorage.removeItem('phone')
        localStorage.removeItem('username')
        context.commit('setToken', null)
        context.commit('setName', '')
        context.commit('setId', null)
        context.commit('setRoom', '')
        context.commit('setImage', '')
        context.commit('setPhone', '')
        context.commit('setUsername', '')
        resolve(true)
      })
    }
  },
  getters: {
    getToken: state => state.token,
    getUserName: state => state.name,
    getUserID: state => state.id,
    getRoom: state => state.room,
    getImage: state => state.image,
    getPhone: state => state.phone,
    getUsername: state => state.username,
    getDetail: state => state.profile,
    getDetailUser: state => state.userProfile
  }
}
export default moduleAuth
