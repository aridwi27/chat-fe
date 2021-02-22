<template>
  <div class="container-fluid colorB d-flex justify-content-center">
    <div
      class="card col col-sm-12 col-md-6 px-3"
      style="
        margin-top: 10%;
        margin-bottom: 10%;
        border-radius: 30px !important;
      "
    >
      <div
        class="card-body cardbody"
        style="padding-left: 10%; padding-right: 10%"
      >
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="login mb-5">Login</h1>
            <p class="float-left bot mb-4">Hi, Welcome back!</p>
          </div>
          <div class="col-12 mb-5">
            <form action="" class="" @submit.prevent="login()">
              <label
                for="exampleInputEmail1"
                class="float-left"
                style="color: #848484; opacity: 0.75"
                >Email address</label
              >
              <input
                class="form-control form mb-4"
                v-model="formdata.email"
                id="exampleInputEmail1"
                type="email"
              />
              <label
                for="password"
                class="float-left"
                style="color: #848484; opacity: 0.75"
                >Password</label
              >
              <input
                class="form-control form mb-5"
                v-model="formdata.password"
                id="password"
                type="password"
                name=""
              />
              <h5 class="float-right mb-5" style="color: #7e98df">
                Forgot password?
              </h5>
              <button
                type="submit"
                class="btn btnlogin btn-block mt-5 mb-4"
                style="color: #ffffff"
              >
                <h5 class="font-weight-bold">Login</h5>
              </button>
              <p style="color: #848484">login with</p>
              <button
                type="submit"
                class="btn btngoogle btn-block mt-4"
                style="color: #7e98df"
              >
                <h5 class="font-weight-bold">Google</h5>
              </button>
            </form>
          </div>
          <div class="col-12">
            <h5>
              Don’t have an account?
              <span
                ><router-link to="/register" style="color: #7e98df"
                  >Sign Up</router-link
                ></span
              >
            </h5>
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
      formdata: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    ...mapGetters({
      name: 'auth/getUserName',
      id: 'auth/getUserID',
      room: 'auth/getRoom'
    })
  },
  methods: {
    ...mapActions({
      Actionlogin: 'auth/login'
    }),
    login () {
      const data = {
        email: this.formdata.email,
        password: this.formdata.password,
        id: this.id
      }
      this.Actionlogin(data).then((response) => {
        // console.log(response)
        if (response === 'Email Not Registered') {
          this.$swal.close()
          this.$swal('Email Not Registered', 'Please Check your Email ', 'error')
        } else if (response === 'Wrong Password') {
          this.$swal.close()
          this.$swal('Wrong Password', 'Please Check your Password ', 'error')
        } else {
          this.$swal.close()
          this.$swal('Login Success', ' ', 'success')
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>
