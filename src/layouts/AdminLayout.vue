<template>
  <q-layout view="lHh Lpr lFf">

    <!-- 🔥 HEADER -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title>Admin Panel</q-toolbar-title>

        <q-btn flat icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <!-- 📚 SIDEBAR -->
    <q-drawer v-model="drawer" show-if-above bordered>

      <q-list>

        <!-- 📊 Dashboard -->
        <q-item clickable v-ripple to="/admin/dashboard">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <!-- 🍽️ Menu -->
        <q-item clickable v-ripple to="/admin/menu">
          <q-item-section avatar><q-icon name="restaurant_menu" /></q-item-section>
          <q-item-section>Menu</q-item-section>
        </q-item>

        <!-- 🧾 Orders (optional page add করলে কাজ করবে) -->
        <q-item clickable v-ripple to="/admin/orders">
          <q-item-section avatar><q-icon name="receipt" /></q-item-section>
          <q-item-section>Orders</q-item-section>
        </q-item>

        <!-- 🪑 Tables -->
        <q-item clickable v-ripple to="/admin/tables">
          <q-item-section avatar><q-icon name="table_bar" /></q-item-section>
          <q-item-section>Tables</q-item-section>
        </q-item>

        <!-- 💳 POS -->
        <q-item clickable v-ripple to="/admin/pos">
          <q-item-section avatar><q-icon name="point_of_sale" /></q-item-section>
          <q-item-section>POS</q-item-section>
        </q-item>

        <!-- 👨‍💼 Staff -->
        <q-item clickable v-ripple to="/admin/staff">
          <q-item-section avatar><q-icon name="groups" /></q-item-section>
          <q-item-section>Staff</q-item-section>
        </q-item>

        <!-- 📊 Reports -->
        <q-item clickable v-ripple to="/admin/reports">
          <q-item-section avatar><q-icon name="bar_chart" /></q-item-section>
          <q-item-section>Reports</q-item-section>
        </q-item>

        <!-- ⚙️ Settings -->
        <q-item clickable v-ripple to="/admin/settings">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>

        <!-- 👤 Profile -->
        <q-item clickable v-ripple to="/admin/profile">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Profile</q-item-section>
        </q-item>

      </q-list>

    </q-drawer>

    <!-- 📄 PAGE -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return { drawer: true }
  },
  methods: {
    logout() {
      localStorage.removeItem("user")
      this.$router.replace("/")
    }
  }
}
</script>
