<template>
  <div class="container-fluid">
    <div class="row">
      <div class="d-none d-md-block col-sm-2 col-md-3">
        <div class="row">
          <div class="col-8 d-none d-md-block">
            <h1 class="home float-left mx-2 my-3 font-weight-bold">Telegram</h1>
          </div>
          <div class="col-4 mt-3">
            <!-- <img src="../assets/img/Menu.png" class="float-right" alt="" /> -->
            <b-dropdown
              size="lg"
              style="margin-left: 65%"
              variant="link"
              right
              class="d-none d-md-block"
              text="Right align"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <img
                  src="../assets/img/Menu.png"
                  class="float-right d-none d-md-block"
                  alt=""
                />
              </template>
              <b-dropdown-item class="bg-info" v-b-toggle.sidebar-1
                >profile</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="col-10 d-none d-md-block">
            <input
              type="text"
              class="form-control mt-3"
              style="background: #fafafa; border-radius: 15px; max-height: 60px"
              placeholder="Type your message...."
            />
          </div>
          <div class="col-2 d-none d-md-block">
            <img src="../assets/img/Plus.png" class="mt-3 float-right" alt="" />
          </div>
          <div class="col-12 d-none d-md-block my-3">
            <div class="row">
              <div class="colmd-3 d-sm-none d-md-block">
                <button class="btn btnflt btn-lg btn-block">all</button>
              </div>
              <div class="col-5 d-sm-none d-md-block">
                <button class="btn btn-lg btn-block">important</button>
              </div>
              <div class="col-4 d-sm-none d-md-block">
                <button class="btn btn-lg btn-block">unread</button>
              </div>
            </div>
          </div>
          <div class="col scrollContent">
            <div
              class="row"
              v-for="(item, i) in users"
              :key="i"
              @click="getListChat(item.id, item.name, item.image)"
            >
              <div class="col-12 col-md-3 pt-2" v-if="item.image === null">
                <img
                  src="../assets/img/default.png"
                  alt=""
                  style="
                    max-width: 200px;
                    width: 100%;
                    max-height: 64px;
                    border-radius: 20px;
                  "
                />
              </div>
              <div class="col-12 col-md-3 pt-2" v-else>
                <img
                  :src="`${webURL}/image/${item.image}`"
                  alt=""
                  style="
                    max-width: 200px;
                    width: 100%;
                    max-height: 64px;
                    border-radius: 20px;
                  "
                />
              </div>
              <div class="col-7 pt-2 d-none d-md-block">
                <h5
                  class="text-left font-weight-bold"
                  style="font-style: normal; color: #232323"
                >
                  {{ item.name }}
                </h5>
                <h5 class="text-left" style="color: #7e98df">message</h5>
              </div>
              <div class="col-2 pt-2">
                <p class="text-left d-none d-md-block">15:20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-10 col-md-9" style="background: #fafafa">
        <!-- profile user -->
        <div v-if="!to_id">
          <h2
            class="text-center"
            style="color: #848484; margin-top: 30%; margin-bottom: 30%"
          >
            Please select a chat to start messaging
          </h2>
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body" @click="gousers(to_id)">
              <div v-if="!imageUser">
                <img
                  src="../assets/img/default.png"
                  alt=""
                  class="float-left mr-2"
                  style="
                    max-width: 64px;
                    width: 100%;
                    max-height: 100px;
                    height: 100%;
                    border-radius: 20px;
                  "
                />
              </div>
              <div v-else>
                <img
                  :src="`${webURL}/image/${imageUser}`"
                  alt=""
                  class="float-left mr-2"
                  style="
                    max-width: 64px;
                    width: 100%;
                    max-height: 100px;
                    height: 100%;
                    border-radius: 20px;
                  "
                />
              </div>
              <h4 class="text-left font-weight-bold">{{ to }}</h4>
            </div>
          </div>
          <!-- end profile user -->
          <div class="scrollChat">
            <div class="" v-for="(item, i) in chat" :key="i">
              <div v-if="item.from_room === room" class="text-right">
                <div class="float-right py-2" v-if="item.user_image === null">
                  <img
                    src="../assets/img/default.png"
                    style="max-width: 50px"
                  />
                </div>
                <div class="float-right py-2" v-else>
                  <img
                    :src="`${webURL}/image/${item.user_image}`"
                    class="rounded-circle ml-2"
                    style="max-width: 50px; max-height: 50px"
                  />
                </div>
                <div
                  class="card ml-auto card w-75 mt-2"
                  style="
                    background: #ffffff;
                    border-radius: 35px 10px 35px 35px;
                  "
                >
                  <p class="card-text px-2 pt-2">
                    {{ item.message }}
                  </p>
                  <small class="pr-4">
                    {{ item.date | moment("DD MM hh:mm") }}</small
                  >
                </div>
              </div>
              <div v-else class="text-left">
                <div class="float-right py-2" v-if="item.user_image === null">
                  <img
                    src="../assets/img/default.png"
                    style="max-width: 50px"
                  />
                </div>
                <div class="float-left py-2" v-else>
                  <img
                    :src="`${webURL}/image/${item.user_image}`"
                    class="rounded-circle mr-2"
                    style="max-width: 50px; max-height: 50px"
                  />
                </div>
                <div
                  class="card w-75 text-left mt-2"
                  style="
                    background: #7e98df;
                    border-radius: 35px 35px 35px 10px;
                  "
                >
                  <p class="card-text px-2 py-2">{{ item.message }}</p>
                  <small class="pl-2">
                    {{ item.date | moment("DD MM hh:mm") }}</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <form action="" @submit.prevent="sendMsg()">
              <input type="text" class="form-control mt-3" v-model="text" />
            </form>
          </div>
        </div>
      </div>
    </div>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <profile />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'
import Profile from '../components/profile'
export default {
  data () {
    return {
      socket: io(process.env.VUE_APP_URL),
      text: '',
      content: [],
      data: '',
      users: [],
      chat: [],
      idUser: [],
      to: '',
      to_id: '',
      imageUser: '',
      lastmsg: '',
      webURL: process.env.VUE_APP_URL
    }
  },
  components: {
    Profile
  },
  computed: {
    ...mapGetters({
      name: 'auth/getUserName',
      id: 'auth/getUserID',
      room: 'auth/getRoom'
    })
  },
  methods: {
    test () {
      this.socket.emit('test', 'hello world')
    },
    joinRoom () {
      this.socket.emit('join-room', this.room)
    },
    getListUsers () {
      this.socket.emit('get-list-users', this.id, this.room)
    },
    resGetListUsers () {
      this.socket.on('res-get-list-users', (users) => {
        this.users = users
      })
    },
    getListChat (idUser, name, image) {
      this.to = name
      this.to_id = idUser
      this.imageUser = image
      this.socket.emit('get-list-chat', { id_from: this.id, id_to: idUser, room_id: this.room })
    },
    resGetListChat () {
      this.socket.on('res-get-list-chat', (chat) => {
        this.chat = chat
        // this.lastmsg = chat[chat.length - 1].message
      })
    },
    sendMsg () {
      const data = {
        from: this.id,
        to: this.to_id,
        msg: this.text
      }
      this.socket.emit('send-message', data)
      this.text = ''
      this.resGetListChat()
    },
    gousers (id) {
      this.$router.push('/users/' + id)
    }
  },
  mounted () {
    this.joinRoom()
    this.getListUsers()
    this.resGetListUsers()
    this.resGetListChat()
    this.getListChat()
  }
}
</script>
