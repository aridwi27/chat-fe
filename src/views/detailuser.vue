<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9" style="background: #fafafa">
        <h2
          v-if="chat.length <= 0"
          class="text-center"
          style="color: #848484; margin-top: 30%; margin-bottom: 30%"
        >
          Please select a chat to start messaging
        </h2>
        <div class="" v-else>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
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
                      <p class="text-left">mama</p>
                    </div>
                    <div class="col-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12" v-for="(item, i) in chat" :key="i">
              <div v-if="item.from_name === name" class="text-right">
                <div class="inline py-2" v-if="item.user_image === null">
                  <img
                    src="../assets/img/default.png"
                    style="max-width: 50px"
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
      <div class="col-3">
        <div class="row">
          <div class="col-12">
            <router-link to="/home" class=""
              ><p class="float-left d-inline">Home</p></router-link
            >
            <h4
              class="text-center d-inline"
              style="color: #7e98df; text-align: center"
            >
              @{{ detailProfile.username }}
            </h4>
          </div>
          <div class="col-12 mt-5">
            <div v-if="detailProfile.image === null">
              <img
                src="../assets/img/default.png"
                style="max-width: 100px; border-radius: 30px"
              />
            </div>
            <div v-else>
              <img
                :src="`${webURL}/image/${detailProfile.image}`"
                style="max-width: 100px; border-radius: 30px"
              />
            </div>
            <div class="col-12 mt-3 mb-3">
              <h3 class="font-weight-bold" style="color: rgb(0, 0, 0)">
                {{ detailProfile.name }}
              </h3>
              <p style="color: #848484">@{{ detailProfile.username }}</p>
            </div>
            <div class="col-12" style="margin-top: 20%">
              <h3 class="font-weight-bold text-left">Account</h3>
              <p class="text-left">+62 {{ detailProfile.phone }}</p>
            </div>

            <div
              class="float-left mb-4"
              style="border: 2px solid #f6f6f6; width: 100%"
            ></div>
            <div class="float-left mb-2">
              <p class="font-weight-bold" style="background: #f6f6f6">
                @{{ detailProfile.username }}
              </p>
              <b-dropdown
                size="sm"
                class="float-left mb-3"
                variant="link"
                right
                text="Right align"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <p style="color: #848484">username</p>
                </template>
                <b-dropdown-form>
                  <b-form-group
                    label="Username"
                    label-for="Username"
                    @submit.stop.prevent
                  >
                    <b-form-input
                      v-model="formProfile.username"
                      id="Username"
                      size="sm"
                      placeholder="Username"
                    ></b-form-input>
                  </b-form-group>

                  <b-button
                    variant="primary"
                    size="sm"
                    @click="sendUploadUsername()"
                    >save</b-button
                  >
                </b-dropdown-form>
              </b-dropdown>
              <!-- <p style="color: #848484">username</p> -->
            </div>
            <div
              class="float-left mb-4"
              style="border: 2px solid #f6f6f6; width: 100%"
            ></div>
          </div>
          <div class="col-12"></div>
          <div
            class="col-12"
            v-if="(detailProfile.lat === null) & (detailProfile.lng === null)"
          >
            <googleMapMaps
              :center="{ lat: -1.2432859348860335, lng: 116.90731826107266 }"
              :zoom="12"
              class="maps mb-5"
            >
              <googleMapMarker
                :position="{
                  lat: -1.2432859348860335,
                  lng: 116.90731826107266,
                }"
              >
              </googleMapMarker>
            </googleMapMaps>
          </div>
          <div class="col-12" v-else>
            <googleMapMaps
              :center="{
                lat: parseFloat(detailProfile.lat),
                lng: parseFloat(detailProfile.lng),
              }"
              :zoom="12"
              class="maps mb-5"
            >
              <googleMapMarker
                :position="{
                  lat: parseFloat(detailProfile.lat),
                  lng: parseFloat(detailProfile.lng),
                }"
              >
              </googleMapMarker>
            </googleMapMaps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'
import * as VueGoogleMaps from 'vue2-google-maps'
export default {
  data () {
    return {
      socket: io(process.env.VUE_APP_URL),
      webURL: process.env.VUE_APP_URL,
      text: '',
      content: [],
      data: '',
      users: [],
      chat: [],
      to: '',
      to_id: '',
      idDetail: this.$route.params.id,
      formProfile: {
        name: '',
        username: '',
        phone: '',
        image: '',
        lat: '',
        lng: ''
      }
    }
  },
  components: {
    googleMapMaps: VueGoogleMaps.Map,
    googleMapMarker: VueGoogleMaps.Marker
  },
  computed: {
    ...mapGetters({
      name: 'auth/getUserName',
      id: 'auth/getUserID',
      room: 'auth/getRoom',
      image: 'auth/getImage',
      phone: 'auth/getPhone',
      username: 'auth/getUsername',
      detailProfile: 'auth/getDetail'
    })
  },
  methods: {
    ...mapActions({
      detail: 'auth/actionGetDetail',
      update: 'auth/updateProfile',
      actionLogout: 'auth/logout'
    }),
    logout () {
      this.actionLogout()
      this.$router.push('/')
    }
  },
  mounted () {
    this.detail(this.idDetail)
  }
}
</script>

<style scoped>
.maps {
  width: 100%;
  height: 300px;
}
</style>
