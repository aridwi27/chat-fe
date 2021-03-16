<template>
  <div class="row">
    <div class="col-12">
      <h4
        class="text-center d-inline"
        style="color: #7e98df; text-align: center"
      >
        @{{ detailProfile.username }}
      </h4>
      <p class="float-right d-inline" style="color: red" @click="logout()">
        Log Out
      </p>
    </div>
    <div class="col-12 mt-5">
      <div v-if="detailProfile.image === null">
        <b-dropdown
          size="lg"
          class="float-left mb-3 col-12"
          variant="link"
          right
          text="Right align"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
            <img
              src="../assets/img/default.png"
              style="max-width: 100px; border-radius: 30px"
            />
          </template>
          <b-dropdown-form>
            <b-form-group label="image" label-for="image" @submit.stop.prevent>
              <b-form-file
                v-model="formProfile.image"
                id="image"
                placeholder="image"
              ></b-form-file>
            </b-form-group>
            <b-button variant="primary" size="sm" @click="sendUploadImage()"
              >save</b-button
            >
          </b-dropdown-form>
        </b-dropdown>
      </div>
      <div v-else>
        <b-dropdown
          size="lg"
          class="float-left mb-3 col-12"
          variant="link"
          right
          text="Right align"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
            <img
              :src="`${webURL}/image/${detailProfile.image}`"
              style="max-width: 100px; border-radius: 30px"
            />
          </template>
          <b-dropdown-form>
            <b-form-group label="image" label-for="image" @submit.stop.prevent>
              <b-form-file
                v-model="formProfile.image"
                id="image"
                placeholder="image"
              ></b-form-file>
            </b-form-group>
            <b-button variant="primary" size="sm" @click="sendUploadImage()"
              >save</b-button
            >
          </b-dropdown-form>
        </b-dropdown>
      </div>
      <div class="col-12 mt-3 mb-3">
        <b-dropdown
          size="sm"
          class="float-left mb-3 col-12"
          variant="link"
          right
          text="Right align"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
            <h3 class="font-weight-bold" style="color: rgb(0, 0, 0)">
              {{ detailProfile.name }}
            </h3>
          </template>
          <b-dropdown-form>
            <b-form-group label="name" label-for="name" @submit.stop.prevent>
              <b-form-input
                v-model="formProfile.name"
                id="name"
                size="sm"
                placeholder="name"
              ></b-form-input>
            </b-form-group>

            <b-button variant="primary" size="sm" @click="sendUploadName()"
              >save</b-button
            >
          </b-dropdown-form>
        </b-dropdown>
        <p style="color: #848484">@{{ detailProfile.username }}</p>
      </div>
      <div class="col-12" style="margin-top: 20%">
        <h3 class="font-weight-bold text-left">Account</h3>
        <p class="text-left">+62 {{ detailProfile.phone }}</p>
      </div>
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
          <p class="text-left">Tap to change phone number</p>
        </template>
        <b-dropdown-form>
          <b-form-group
            label="Phone"
            label-for="dropdown-form-email"
            @submit.stop.prevent
          >
            <b-form-input
              v-model="formProfile.phone"
              id="dropdown-form-email"
              type="number"
              size="sm"
              placeholder="phone"
            ></b-form-input>
          </b-form-group>

          <b-button variant="primary" size="sm" @click="sendUploadPhone()"
            >save</b-button
          >
        </b-dropdown-form>
      </b-dropdown>
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

            <b-button variant="primary" size="sm" @click="sendUploadUsername()"
              >save</b-button
            >
          </b-dropdown-form>
        </b-dropdown>
      </div>
      <div
        class="float-left mb-4"
        style="border: 2px solid #f6f6f6; width: 100%"
      ></div>
    </div>
    <div class="col-12">
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
          <p class="text-left">Tap to change koordinat</p>
        </template>
        <b-dropdown-form>
          <b-form-group label="lat" label-for="lat" @submit.stop.prevent>
            <b-form-input
              v-model="formProfile.lat"
              id="lat"
              size="sm"
              :placeholder="detailProfile.lat"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="lng" label-for="lng" @submit.stop.prevent>
            <b-form-input
              v-model="formProfile.lng"
              id="lng"
              size="sm"
              :placeholder="detailProfile.lng"
            ></b-form-input>
          </b-form-group>

          <b-button variant="primary" size="sm" @click="sendUploadKoordinat()"
            >save</b-button
          >
        </b-dropdown-form>
      </b-dropdown>
    </div>
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
      idDetail: this.id,
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
    },
    sendUploadPhone () {
      const data = new FormData()
      data.append('phone', this.formProfile.phone)
      this.update(data)
      this.detail(this.id)
    },
    sendUploadImage () {
      const data = new FormData()
      data.append('image', this.formProfile.image)
      this.update(data).then((response) => {
        if (response === 'Error File Type') {
          this.$swal.close()
          this.$swal('Error File Type', 'Please Uload Again ', 'error')
        } else {
          this.$swal.close()
          this.$swal('Upload File success', ' ', 'success')
          this.detail(this.id)
        }
      })
    },
    sendUploadUsername () {
      const user = { username: this.formProfile.username }
      this.update(user)
      this.detail(this.id)
    },
    sendUploadName () {
      const user = { name: this.formProfile.name }
      this.update(user)
      this.detail(this.id)
    },
    sendUploadKoordinat () {
      const koordinat = {
        lat: this.formProfile.lat,
        lng: this.formProfile.lng
      }
      this.update(koordinat)
      this.detail(this.id)
    },
    imageUpload (el) {
      this.formProfile.image = el.target.files[0]
    }
  },
  mounted () {
    this.detail(this.id)
  }
}
</script>

<style scoped>
.maps {
  width: 100%;
  height: 300px;
}
</style>
