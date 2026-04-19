<template>
  <q-layout view="lHh Lpr lFf">

    <!-- 🔥 HEADER -->
    <q-header elevated class="bg-orange text-white shadow-2">
      <q-toolbar>

        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title>
          👨‍🍳 Kitchen Board (Chef Panel)
        </q-toolbar-title>

        <q-btn flat round icon="logout" @click="logout" />

      </q-toolbar>
    </q-header>

    <!-- 🟠 SIDEBAR -->
    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :style="{ backgroundColor: '#ffffff' }"
      class="text-dark"
    >

      <q-scroll-area class="fit">

        <q-list padding class="q-pa-sm">

          <q-item clickable v-ripple to="/chef/incoming-orders">
            <q-item-section avatar>
              <q-icon name="restaurant" color="orange" />
            </q-item-section>
            <q-item-section>🍳 Incoming Orders</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/chef/kitchen-status">
            <q-item-section avatar>
              <q-icon name="dashboard" color="orange" />
            </q-item-section>
            <q-item-section>📊 Kitchen Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/chef/order-details">
            <q-item-section avatar>
              <q-icon name="list_alt" color="orange" />
            </q-item-section>
            <q-item-section>🍽 Order Details</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/chef/cooking-queue">
            <q-item-section avatar>
              <q-icon name="local_fire_department" color="orange" />
            </q-item-section>
            <q-item-section>🔥 Cooking Queue</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/chef/ready-orders">
            <q-item-section avatar>
              <q-icon name="check_circle" color="green" />
            </q-item-section>
            <q-item-section>✅ Ready Orders</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/chef/call-staff">
            <q-item-section avatar>
              <q-icon name="support_agent" color="blue" />
            </q-item-section>
            <q-item-section>📢 Call Staff</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/chef/issue">
            <q-item-section avatar>
              <q-icon name="report_problem" color="red" />
            </q-item-section>
            <q-item-section>🚫 Issues</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/chef/profile">
            <q-item-section avatar>
              <q-icon name="person" color="purple" />
            </q-item-section>
            <q-item-section>👤 Profile</q-item-section>
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
    if (this.$q?.dark) {
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
