<template>
  <q-page class="q-pa-md bg-grey-1">

    <!-- 🔥 TITLE -->
    <div class="text-h5 q-mb-md text-primary">
      👑 Admin Profile
    </div>

    <!-- PROFILE CARD -->
    <q-card class="profile-card shadow-5">

      <!-- TOP SECTION -->
      <div class="profile-header">

        <!-- 🖼️ AVATAR -->
        <q-avatar size="90px" class="shadow-3">
          <img :src="user.avatar || defaultAvatar" />
        </q-avatar>

        <!-- 🖼️ EDIT AVATAR BUTTON -->
        <div v-if="editMode" class="q-mt-sm">
          <q-btn
            dense
            flat
            icon="photo_camera"
            label="Change Avatar"
            class="text-white"
            @click="$refs.file.click()"
          />

          <input
            type="file"
            ref="file"
            hidden
            accept="image/*"
            @change="onAvatarChange"
          />
        </div>

        <div class="q-mt-md text-center">

          <!-- NAME -->
          <div v-if="!editMode" class="text-h6">
            {{ user.name || "Admin User" }}
          </div>

          <q-input
            v-else
            v-model="user.name"
            dense
            dark
            filled
            label="Name"
          />

          <!-- EMAIL -->
          <div v-if="!editMode" class="text-caption text-grey">
            {{ user.email || "admin@foodhub.com" }}
          </div>

          <q-input
            v-else
            v-model="user.email"
            dense
            filled
            label="Email"
            class="q-mt-sm"
          />

          <!-- ROLE -->
          <q-chip color="primary" text-color="white" class="q-mt-sm">
            👑 Admin
          </q-chip>

        </div>

      </div>

      <q-separator class="q-my-md" />

      <!-- INFO -->
      <q-card-section>

        <q-list>

          <!-- PHONE -->
          <q-item>
            <q-item-section avatar>
              <q-icon name="phone" color="green" />
            </q-item-section>

            <q-item-section v-if="!editMode">
              {{ user.phone || "No phone" }}
            </q-item-section>

            <q-input
              v-else
              v-model="user.phone"
              dense
              filled
              label="Phone"
              class="full-width"
            />
          </q-item>

          <!-- PASSWORD -->
          <q-item>
            <q-item-section avatar>
              <q-icon name="lock" color="red" />
            </q-item-section>

            <q-item-section v-if="!editMode">
              ••••••••
            </q-item-section>

            <q-input
              v-else
              v-model="user.password"
              type="password"
              dense
              filled
              label="Password"
              class="full-width"
            />
          </q-item>

        </q-list>

      </q-card-section>

      <q-separator />

      <!-- ACTIONS -->
      <q-card-actions class="q-pa-md" align="between">

        <!-- EDIT / SAVE -->
        <q-btn
          v-if="!editMode"
          color="primary"
          icon="edit"
          label="Edit Profile"
          flat
          @click="editMode = true"
        />

        <q-btn
          v-else
          color="green"
          icon="save"
          label="Save"
          @click="saveProfile"
        />

        <!-- LOGOUT -->
        <q-btn
          color="red"
          icon="logout"
          label="Logout"
          @click="logout"
        />

      </q-card-actions>

    </q-card>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      editMode: false,

      defaultAvatar: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
    }
  },

  mounted () {
    this.loadUser()
  },

  methods: {

    loadUser () {
      this.user = JSON.parse(localStorage.getItem("user") || "{}")
    },

    onAvatarChange (e) {
      const file = e.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        this.user.avatar = reader.result
      }
      reader.readAsDataURL(file)
    },

    saveProfile () {
      localStorage.setItem("user", JSON.stringify(this.user))

      this.editMode = false

      this.$q.notify({
        type: "positive",
        message: "Profile Updated"
      })
    },

    logout () {
      localStorage.removeItem("user")
      this.$router.replace("/")
    }

  }
}
</script>

<style scoped>
.profile-card {
  border-radius: 20px;
  overflow: hidden;
  background: white;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background: linear-gradient(135deg, #ff9800, #ff5722);
  color: white;
  border-radius: 20px 20px 0 0;
}
</style>
