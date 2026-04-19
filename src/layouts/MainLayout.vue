<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">

    <!-- 🔥 HEADER -->
    <q-header elevated class="bg-primary text-white shadow-3">
      <q-toolbar>

        <!-- 🍽️ LOGO -->
        <q-avatar size="40px" class="q-mr-sm">
          <img src="~assets/ios.png" />
        </q-avatar>

        <!-- 🏷️ TITLE -->
        <q-toolbar-title>
          FoodHub
          <div class="text-caption text-blue-2">
            Table: {{ tableId }}
          </div>
        </q-toolbar-title>



      </q-toolbar>
    </q-header>

    <!-- 📄 PAGE CONTENT -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- ⚡ BOTTOM NAVIGATION -->
    <q-footer elevated class="bg-white text-dark">
      <div class="row text-center">

        <!-- 🍽️ MENU -->
        <div
          class="col q-pa-sm cursor-pointer"
          :class="{ active: isActive('menu') }"
          @click="goMenu"
        >
          <q-icon name="restaurant_menu" size="24px" />
          <div class="text-caption">Menu</div>
        </div>

        <!-- 🛒 CART -->
        <div
          class="col q-pa-sm cursor-pointer"
          :class="{ active: isActive('cart') }"
          @click="goCart"
        >
          <q-icon name="shopping_cart" size="24px" />
          <div class="text-caption">Cart</div>
        </div>

        <!-- ⏳ STATUS -->
        <div
          class="col q-pa-sm cursor-pointer"
          :class="{ active: isActive('status') }"
          @click="goStatus"
        >
          <q-icon name="schedule" size="24px" />
          <div class="text-caption">Status</div>
        </div>

        <!-- 🍽️ SERVE -->
        <div
          class="col q-pa-sm cursor-pointer"
          :class="{ active: isActive('serve') }"
          @click="goServe"
        >
          <q-icon name="room_service" size="24px" />
          <div class="text-caption">Order-history</div>
        </div>

      </div>
    </q-footer>



  </q-layout>
</template>

<script>
export default {
  name: "CustomerMainLayout",

  data () {
    return {
      tableId: null
    }
  },

  computed: {
    cartCount () {
      return JSON.parse(localStorage.getItem("cart") || "[]").length
    }
  },

  // 🔥 IMPORTANT (auto update tableId when route changes)
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(val) {
        this.tableId = val || "1"
      }
    }
  },

  methods: {

    // 🔗 ROUTES
    goMenu () {
      this.$router.push(`/customer/menu/${this.tableId}`)
    },

    goCart () {
      this.$router.push(`/customer/cart/${this.tableId}`)
    },

    goStatus () {
      this.$router.push(`/customer/status/${this.tableId}`)
    },

    goServe () {
      this.$router.push(`/customer/serve/${this.tableId}`)
    },

    // 🎯 ACTIVE BUTTON STYLE
    isActive (page) {
      return this.$route.path.includes(page)
    }

  }
}
</script>

<style scoped>
.bg-grey-1 {
  background: #f6f7fb;
}

.cursor-pointer {
  cursor: pointer;
}

.active {
  color: #1976d2;
  font-weight: bold;
}
</style>
