<template>
  <q-layout view="lHh Lpr lFf" class="auth-bg">
    <q-page-container>
      <q-page class="flex flex-center">

        <q-card class="auth-card q-pa-lg">

          <!-- 🔥 BRAND -->
          <div class="text-center q-mb-md">
            <q-avatar size="80px">
              <img src="~assets/ios.png" />
            </q-avatar>

            <div class="text-h5 text-primary q-mt-sm">FoodHub</div>
            <div class="text-caption text-grey">
              Smart Restaurant Management System
            </div>
          </div>

          <!-- 🔄 SWITCH -->
          <div class="text-center q-mb-md row justify-center q-gutter-sm">
            <q-btn flat label="Login"
              :color="mode === 'login' ? 'primary' : 'grey'"
              @click="mode = 'login'" />

            <q-btn flat label="Register"
              :color="mode === 'register' ? 'primary' : 'grey'"
              @click="mode = 'register'" />
          </div>

          <!-- 🔐 LOGIN -->
          <div v-if="mode === 'login'">

            <q-input v-model="email" label="Email" outlined class="q-mb-sm" />
            <q-input v-model="password" type="password" label="Password" outlined class="q-mb-md" />

            <!-- ROLE -->
            <div class="q-mb-md">
              <div class="text-caption q-mb-xs text-grey">Login As</div>

              <div class="row q-gutter-sm">

                <q-btn class="col"
                  icon="home"
                  label="Admin"
                  :color="role === 'admin' ? 'primary' : 'grey-4'"
                  @click="role = 'admin'"
                />

                <q-btn class="col"
                  icon="person"
                  label="Staff"
                  :color="role === 'staff' ? 'primary' : 'grey-4'"
                  @click="role = 'staff'"
                />

                <q-btn class="col"
                  icon="restaurant"
                  label="Chef"
                  :color="role === 'chef' ? 'primary' : 'grey-4'"
                  @click="role = 'chef'"
                />

              </div>
            </div>

            <q-btn label="Login" color="primary" class="full-width" @click="login" />
          </div>

          <!-- 📝 REGISTER -->
          <div v-else>

            <q-input v-model="fullName" label="Full Name" outlined class="q-mb-sm" />
            <q-input v-model="email" label="Email" outlined class="q-mb-sm" />
            <q-input v-model="phone" label="Phone" outlined class="q-mb-sm" />
            <q-input v-model="password" type="password" label="Password" outlined class="q-mb-md" />

            <div class="q-mb-md">
              <div class="text-caption q-mb-xs text-grey">Select Role</div>

              <div class="row q-gutter-sm">

                <q-btn class="col"
                  icon="home"
                  label="Admin"
                  :color="role === 'admin' ? 'primary' : 'grey-4'"
                  @click="role = 'admin'"
                />

                <q-btn class="col"
                  icon="person"
                  label="Staff"
                  :color="role === 'staff' ? 'primary' : 'grey-4'"
                  @click="role = 'staff'"
                />

                <q-btn class="col"
                  icon="restaurant"
                  label="Chef"
                  :color="role === 'chef' ? 'primary' : 'grey-4'"
                  @click="role = 'chef'"
                />

              </div>
            </div>

            <q-input v-model="otp" label="OTP Code" outlined class="q-mb-md" />

            <q-btn label="Create Account" color="green" class="full-width" @click="register" />
          </div>

        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout",

  data() {
    return {
      mode: "login",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      otp: "",
      role: "admin",
      realOtp: "123456"
    };
  },

  methods: {

    login() {
      if (!this.email || !this.password) {
        this.$q.notify({ type: "warning", message: "Fill all fields" });
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(
        u =>
          u.email === this.email &&
          u.password === this.password &&
          u.role === this.role
      );

      if (!user) {
        this.$q.notify({ type: "negative", message: "Invalid Login" });
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      this.$q.notify({ type: "positive", message: "Login Success" });

      setTimeout(() => {
        if (user.role === "admin") this.$router.replace("/admin/dashboard");
        else if (user.role === "staff") this.$router.replace("/staff/active-orders");
        else if (user.role === "chef") this.$router.replace("/chef/incoming-orders");
      }, 300);
    },

    register() {
      if (!this.fullName || !this.email || !this.phone || !this.password) {
        this.$q.notify({ type: "warning", message: "Fill all fields" });
        return;
      }

      if (this.otp !== this.realOtp) {
        this.$q.notify({ type: "negative", message: "Invalid OTP" });
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");

      users.push({
        id: Date.now(),
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: this.role
      });

      localStorage.setItem("users", JSON.stringify(users));

      this.$q.notify({ type: "positive", message: "Account Created" });

      this.mode = "login";
    }

  }
};
</script>

<style scoped>
.auth-bg {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.auth-card {
  width: 400px;
  border-radius: 18px;
}
</style>
