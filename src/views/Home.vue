<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <div class="row">
          <div class="col-8">
            <h1 class="home float-left mx-2 my-3 font-weight-bold">Telegram</h1>
          </div>
          <div class="col-4 mt-3">
            <!-- <img src="../assets/img/Menu.png" class="float-right" alt="" /> -->
            <b-dropdown
              size="lg"
              style="margin-left: 65%"
              variant="link"
              right
              text="Right align"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <img src="../assets/img/Menu.png" class="float-right" alt="" />
              </template>
              <b-dropdown-item class="bg-info" @click="profile(id)"
                >profile</b-dropdown-item
              >
              <b-dropdown-item href="#">Another action</b-dropdown-item>
              <b-dropdown-item href="#">Something else here...</b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="col-10">
            <input
              type="text"
              class="form-control mt-3"
              style="background: #fafafa; border-radius: 15px; max-height: 60px"
              placeholder="Type your message...."
            />
          </div>
          <div class="col-2">
            <img src="../assets/img/Plus.png" class="mt-3 float-right" alt="" />
          </div>
          <div class="col-12 my-3">
            <div class="row">
              <div class="col-3">
                <button class="btn btnflt btn-lg btn-block">all</button>
              </div>
              <div class="col-5">
                <button class="btn btnflt btn-lg btn-block">important</button>
              </div>
              <div class="col-4">
                <button class="btn btnflt btn-lg btn-block">unread</button>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="row"
              v-for="(item, i) in users"
              :key="i"
              @click="getListChat(item.id, item.name)"
            >
              <div class="col-3 pt-2" v-if="item.image === null">
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
              <div class="col-3 pt-2" v-else>
                <img
                  :src="`http://localhost:3000/image/${item.image}`"
                  alt=""
                  style="
                    max-width: 200px;
                    width: 100%;
                    max-height: 64px;
                    border-radius: 20px;
                  "
                />
              </div>
              <div class="col-7 pt-2">
                <h5
                  class="text-left font-weight-bold"
                  style="font-style: normal; color: #232323"
                >
                  {{ item.name }}
                </h5>
                <h5 class="text-left" style="color: #7e98df">
                  {{ item.room_id }}
                </h5>
              </div>
              <div class="col-2 pt-2">
                <p class="text-left">15:20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9" style="background: #fafafa">
        <div v-if="chat.length < 1">
          <h2
            class="text-center"
            style="color: #848484; margin-top: 30%; margin-bottom: 30%"
          >
            Please select a chat to start messaging
          </h2>
        </div>

        <div v-else>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body" @click="gousers(to_id)">
                  <div class="row">
                    <div class="col-8">
                      <img
                        src="../assets/img/default.png"
                        alt=""
                        class="float-left"
                        style="
                          max-width: 64px;
                          width: 100%;
                          max-height: 100px;
                          height: 100%;
                          border-radius: 20px;
                        "
                      />
                      <p class="text-left">{{ to_id }}</p>
                    </div>
                    <div class="col-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12" v-for="(item, i) in chat" :key="i">
              <div v-if="item.from_id === id" class="text-right">
                <div class="inline py-2" v-if="item.user_image === null">
                  <img
                    src="../assets/img/default.png"
                    style="max-width: 50px"
                  />
                </div>
                <div class="inline py-2" v-else>
                  <img
                    :src="`http://localhost:3000/image/${item.user_image}`"
                    class="rounded-circle ml-2"
                    style="max-width: 50px; max-height: 50px"
                  />
                </div>
                <div
                  class="card inline mt-2"
                  style="
                    background: #ffffff;
                    border-radius: 35px 10px 35px 35px;
                  "
                >
                  <p class="card-text px-2 py-2">{{ item.message }}</p>
                </div>
              </div>
              <div v-else class="text-left">
                <div class="inline2 py-2" v-if="item.user_image === null">
                  <img
                    src="../assets/img/default.png"
                    style="max-width: 50px"
                  />
                </div>
                <div class="inline2 py-2" v-else>
                  <img
                    :src="`http://localhost:3000/image/${item.user_image}`"
                    class="rounded-circle mr-2"
                    style="max-width: 50px; max-height: 50px"
                  />
                </div>
                <div
                  class="card inline2 mt-2"
                  style="
                    background: #7e98df;
                    border-radius: 35px 35px 35px 10px;
                  "
                >
                  <p class="card-text px-2 py-2">{{ item.message }}</p>
                </div>
              </div>
            </div>
            <div class="col-12">
              <form action="" @submit.prevent="sendMsg()">
                <input type="text" class="form-control" v-model="text" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'
export default {
  data () {
    return {
      socket: io('http://localhost:3000'),
      text: '',
      content: [],
      data: '',
      users: [],
      chat: [],
      idUser: [],
      to: '',
      to_id: ''
    }
  },
  components: {
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
    // send () {
    //   const data = {
    //     msg: this.text,
    //     username: this.username[0]
    //   }
    //   this.socket.emit('msg', data)
    //   this.text = ''
    // },
    joinRoom () {
      this.socket.emit('join-room', this.room)
    },
    getListUsers () {
      this.socket.emit('get-list-users', this.id, this.room)
    },
    resGetListUsers () {
      this.socket.on('res-get-list-users', (users) => {
        console.log(users)
        this.users = users
      })
    },
    getListChat (idUser, name) {
      this.to = name
      this.to_id = idUser
      this.socket.emit('get-list-chat', { id_from: this.id, id_to: idUser, room_id: this.room })
    },
    resGetListChat () {
      this.socket.on('res-get-list-chat', (chat) => {
        console.log(chat)
        this.chat = chat
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
    },
    profile (id) {
      this.$router.push('/profile/' + id)
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
