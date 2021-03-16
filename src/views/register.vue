<template>
  <div class="container-fluid colorB d-flex justify-content-center">
    <div
      class="card col col-sm-12 col-md-6 px-3 cardbody"
      style="
        margin-top: 10%;
        margin-bottom: 10%;
        border-radius: 30px !important;
      "
    >
      <div class="card-body" style="padding-left: 10%; padding-right: 10%">
        <div class="row">
          <div class="col-12 text-center">
            <router-link to="/" class="float-left"
              ><p style="color: #7e98df">Login</p></router-link
            >
            <h2 class="login">Register</h2>
            <p class="float-left bot">Let’s create your account!</p>
          </div>
          <div class="col-12">
            <form action="" class="" @submit.prevent="register()">
              <label
                for="name"
                class="float-left"
                style="color: #848484; opacity: 0.75"
                >Name</label
              >
              <input
                class="form-control form mb-3"
                v-model="formData.username"
                required
                id="name"
                type="text"
              />
              <label
                for="email"
                class="float-left"
                style="color: #848484; opacity: 0.75"
                >Email address</label
              >
              <input
                class="form-control form mb-3"
                required
                v-model="formData.email"
                id="email"
                type="email"
              />
              <label
                for="password"
                class="float-left"
                style="color: #848484; opacity: 0.75"
                >password</label
              >
              <input
                class="form-control form mb-3"
                v-model="formData.password"
                required
                id="password"
                type="password"
                name=""
              />
              <button
                type="submit"
                class="btn btnlogin btn-block mt-5 mb-4"
                style="color: #ffffff"
              >
                <h5 class="font-weight-bold">Register</h5>
              </button>
              <p style="color: #848484">register with</p>
              <button
                type="submit"
                class="btn btngoogle btn-block mt-4"
                style="color: #7e98df"
              >
                <h5 class="font-weight-bold">Google</h5>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  components: {
    ...mapGetters({

    })
  },
  methods: {
    ...mapActions({
      actionRegister: 'auth/register'
    }),
    register () {
      function getRandomInt (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
      }
      const data = {
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password,
        room_id: getRandomInt(10058, 20000)
      }
      this.actionRegister(data).then((response) => {
        if (response === 'Email Exist') {
          this.$swal.close()
          this.$swal('Email registed', 'Please Change Email ', 'error')
        } else {
          this.$swal.close()
          this.$swal('Register Email Success', 'You can Login Now ', 'success')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
