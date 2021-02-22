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
      profile: {}

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
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/login', data).then((response) => {
          console.log(response)
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
          // console.log(err.data.code)
        })
      })
    },
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/register', data).then((response) => {
          resolve(response.data.msg)
        }).catch((error) => {
          reject(error.response.data)
        })
      })
    },
    actionGetDetail (items, id) {
      axios.get('http://localhost:3000/profile/' + id, { headers: { token: items.rootState.auth.token } }).then((response) => {
        console.log(response.data.data)
        items.commit('setDetailProfile', response.data.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    actionGetDetailUsers (items, id) {
      axios.get('http://localhost:3000/profile/' + id, { headers: { token: items.rootState.auth.token } }).then((response) => {
        console.log(response.data.data)
        items.commit('setDetailProfile', response.data.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    updateProfile (items, data) {
      return new Promise((resolve, reject) => {
        axios.patch('http://localhost:3000/update/' + items.getters.getUserID, data, { headers: { token: items.rootState.auth.token } }).then((response) => {
          console.log(response.data)
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
    getDetail: state => state.profile
  }
}
export default moduleAuth
