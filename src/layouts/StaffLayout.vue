<template>
  <q-layout view="lHh Lpr lFf">

    <!-- 🔥 HEADER -->
    <q-header elevated class="bg-green text-white shadow-2">
      <q-toolbar>

        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title>
          🧑‍💼 Staff Panel
        </q-toolbar-title>

        <q-btn flat round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <!-- 🟢 SIDEBAR -->
    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :style="{ backgroundColor: '#ffffff' }"
    >

      <q-scroll-area class="fit">

        <q-list padding class="q-pa-sm">

          <!-- 📊 Active Orders -->
          <q-item clickable v-ripple to="/staff/active-orders" active-class="bg-green-2 text-green-10">
            <q-item-section avatar>
              <q-icon name="dashboard" color="green" />
            </q-item-section>
            <q-item-section>
              📊 Active Orders
            </q-item-section>
          </q-item>

          <!-- ➕ Create Order -->
          <q-item clickable v-ripple to="/staff/create-order" active-class="bg-green-2 text-green-10">
            <q-item-section avatar>
              <q-icon name="add_circle" color="green" />
            </q-item-section>
            <q-item-section>
              ➕ Create Order
            </q-item-section>
          </q-item>

          <!-- 🪑 Table Dashboard -->
          <q-item clickable v-ripple to="/staff/table-dashboard" active-class="bg-green-2 text-green-10">
            <q-item-section avatar>
              <q-icon name="table_bar" color="green" />
            </q-item-section>
            <q-item-section>
              🪑 Table Dashboard
            </q-item-section>
          </q-item>

          <!-- 🍽️ Serve Food -->
          <q-item clickable v-ripple to="/staff/serve-food" active-class="bg-green-2 text-green-10">
            <q-item-section avatar>
              <q-icon name="restaurant" color="green" />
            </q-item-section>
            <q-item-section>
              🍽️ Serve Food
            </q-item-section>
          </q-item>

          <!-- 🔔 Notifications -->
          <q-item clickable v-ripple to="/staff/notifications" active-class="bg-green-2 text-green-10">
            <q-item-section avatar>
              <q-icon name="notifications" color="green" />
            </q-item-section>
            <q-item-section>
              🔔 Notifications
            </q-item-section>
          </q-item>

          <!-- 👤 Profile -->
          <q-item clickable v-ripple to="/staff/profile" active-class="bg-green-2 text-green-10">
            <q-item-section avatar>
              <q-icon name="person" color="green" />
            </q-item-section>
            <q-item-section>
              👤 Profile
            </q-item-section>
          </q-item>

        </q-list>

      </q-scroll-area>

    </q-drawer>

    <!-- 📄 PAGE CONTENT -->
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      drawer: true
    }
  },

  mounted () {
    // 🔥 force light mode
    if (this.$q && this.$q.dark) {
      this.$q.dark.set(false)
    }
  },

  methods: {
    logout () {
      localStorage.removeItem("user")
      this.$router.replace("/")
    }
  }
}
</script>

<style scoped>
.q-item {
  border-radius: 10px;
}
</style>
