<template>
  <q-page class="q-pa-md bg-grey-1">

    <!-- 🔥 HEADER -->
    <div class="text-h5 text-primary q-mb-md">
      📊 Admin Dashboard
    </div>

    <!-- 📦 STATS CARDS -->
    <div class="row q-col-gutter-md">

      <!-- MENU -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card bg-blue-1">
          <q-card-section class="text-center">
            <q-icon name="restaurant_menu" size="40px" color="primary" />
            <div class="text-h6 q-mt-sm">{{ menuCount }}</div>
            <div class="text-caption">Total Foods</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- ORDERS -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card bg-orange-1">
          <q-card-section class="text-center">
            <q-icon name="receipt_long" size="40px" color="orange" />
            <div class="text-h6 q-mt-sm">{{ orderCount }}</div>
            <div class="text-caption">Total Orders</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- PENDING -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card bg-yellow-1">
          <q-card-section class="text-center">
            <q-icon name="schedule" size="40px" color="amber" />
            <div class="text-h6 q-mt-sm">{{ pending }}</div>
            <div class="text-caption">Pending</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- SERVED -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stat-card bg-green-1">
          <q-card-section class="text-center">
            <q-icon name="check_circle" size="40px" color="green" />
            <div class="text-h6 q-mt-sm">{{ served }}</div>
            <div class="text-caption">Served</div>
          </q-card-section>
        </q-card>
      </div>

    </div>

    <!-- 📈 RECENT ORDERS -->
    <q-card class="q-mt-md shadow-3">

      <q-card-section>
        <div class="text-h6">🧾 Recent Orders</div>
      </q-card-section>

      <q-separator />

      <q-card-section>

        <q-list separator>

          <q-item v-for="order in recentOrders" :key="order.id">

            <q-item-section>
              <div class="text-subtitle1">
                Table: {{ order.tableId }}
              </div>
              <div class="text-caption text-grey">
                {{ order.createdAt }}
              </div>
            </q-item-section>

            <q-item-section side>
              <q-chip
                :color="statusColor(order.status)"
                text-color="white"
                dense
              >
                {{ order.status }}
              </q-chip>
            </q-item-section>

          </q-item>

        </q-list>

      </q-card-section>

    </q-card>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      menu: [],
      orders: []
    }
  },

  mounted () {
    this.loadData()
    window.addEventListener("storage", this.loadData)
  },

  beforeUnmount () {
    window.removeEventListener("storage", this.loadData)
  },

  computed: {

    menuCount () {
      return this.menu.length
    },

    orderCount () {
      return this.orders.length
    },

    pending () {
      return this.orders.filter(o => o.status === "pending").length
    },

    served () {
      return this.orders.filter(o => o.status === "served").length
    },

    recentOrders () {
      return this.orders.slice(0, 5)
    }

  },

  methods: {

    loadData () {
      this.menu = JSON.parse(localStorage.getItem("menu") || "[]")
      this.orders = JSON.parse(localStorage.getItem("chefOrders") || "[]")
    },

    statusColor (status) {
      if (status === "pending") return "orange"
      if (status === "cooking") return "blue"
      if (status === "ready") return "purple"
      if (status === "served") return "green"
      return "grey"
    }

  }
}
</script>

<style scoped>
.stat-card {
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
}
</style>
