<template>
  <q-page class="q-pa-md bg-grey-1">

    <!-- 🔥 TITLE -->
    <div class="text-h5 q-mb-md text-primary">
      🍽️ Your Order History
    </div>

    <!-- EMPTY -->
    <div v-if="orders.length === 0" class="text-center q-pa-xl text-grey">
      <q-icon name="restaurant" size="80px" />
      <div class="text-subtitle1 q-mt-md">No orders found</div>
    </div>

    <!-- ORDERS LIST -->
    <div v-else class="column q-gutter-md">

      <q-card
        v-for="order in orders"
        :key="order.id"
        class="shadow-3 order-card"
      >

        <!-- HEADER -->
        <q-card-section class="row justify-between">

          <div>
            <div class="text-subtitle1">
              🧾 Order #{{ order.id }}
            </div>

            <div class="text-caption text-grey">
              📅 {{ order.createdAt }}
            </div>
          </div>

          <!-- STATUS -->
          <q-chip
            :color="statusColor(order.status)"
            text-color="white"
          >
            {{ order.status }}
          </q-chip>

        </q-card-section>

        <q-separator />

        <!-- ITEMS -->
        <q-card-section>

          <div
            v-for="item in order.items"
            :key="item.id"
            class="row items-center q-mb-md"
          >

            <q-img :src="item.image" class="item-img" />

            <div class="col q-pl-md">

              <div class="text-h6">{{ item.name }}</div>

              <div class="text-caption text-grey">
                Qty: {{ item.qty }}
              </div>

              <div class="text-primary">
                💰 {{ item.price }} ৳
              </div>

            </div>

          </div>

        </q-card-section>

        <q-separator />

        <!-- FOOTER -->
        <q-card-section class="row justify-between">

          <div class="text-caption">
            Table: {{ order.tableId }}
          </div>

          <div class="text-h6 text-primary">
            Total: {{ getTotal(order) }} ৳
          </div>

        </q-card-section>

      </q-card>

    </div>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      tableId: null
    }
  },

  mounted () {
    this.tableId = this.$route.params.id
    this.loadOrders()

    // 🔥 LIVE UPDATE
    window.addEventListener("storage", this.loadOrders)
  },

  beforeUnmount () {
    window.removeEventListener("storage", this.loadOrders)
  },

  methods: {

    // 📥 LOAD ALL ORDERS (FILTER BY TABLE)
    loadOrders () {
      const all = JSON.parse(localStorage.getItem("customerOrders") || "[]")

      this.orders = all
        .filter(o => o.tableId == this.tableId)
        .sort((a, b) => b.id - a.id) // latest first
    },

    // 💰 TOTAL CALC
    getTotal (order) {
      return order.items.reduce((sum, i) => sum + (i.price * i.qty), 0)
    },

    // 🎨 STATUS COLOR
    statusColor (status) {
      if (status === "pending") return "orange"
      if (status === "cooking") return "blue"
      if (status === "ready") return "green"
      if (status === "served") return "grey"
      return "primary"
    }

  }
}
</script>

<style scoped>
.order-card {
  border-radius: 16px;
  overflow: hidden;
}

.item-img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
}
</style>
