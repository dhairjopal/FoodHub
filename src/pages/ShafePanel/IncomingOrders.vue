<template>
  <q-page class="q-pa-md bg-grey-1">

    <div class="text-h5 q-mb-md text-primary">
      👨‍🍳 Incoming Orders
    </div>

    <!-- EMPTY -->
    <div v-if="orders.length === 0" class="text-center text-grey q-pa-xl">
      No orders yet
    </div>

    <!-- ORDERS -->
    <div v-else class="column q-gutter-md">

      <q-card
        v-for="(order, index) in orders"
        :key="order.id"
        class="shadow-3 order-card"
      >

        <!-- HEADER -->
        <q-card-section class="row justify-between">

          <div>
            <div class="text-subtitle1">
              🧾 Table: {{ order.tableId }}
            </div>
            <div class="text-caption text-grey">
              {{ order.createdAt }}
            </div>
          </div>

          <!-- STATUS -->
          <q-chip :color="statusColor(order.status)" text-color="white">
            {{ order.status }}
          </q-chip>

        </q-card-section>

        <q-separator />

        <!-- ITEMS -->
        <q-card-section>

          <div
            v-for="item in order.items"
            :key="item.id"
            class="row items-center q-mb-sm"
          >

            <q-img :src="item.image" class="img" />

            <div class="col q-pl-md">
              <div class="text-h6">{{ item.name }}</div>
              <div class="text-caption">Qty: {{ item.qty }}</div>
              <div class="text-primary">৳ {{ item.price }}</div>
            </div>

          </div>

        </q-card-section>

        <q-separator />

        <!-- ACTION BUTTONS -->
        <q-card-section class="row q-gutter-sm">

          <q-btn
            color="orange"
            label="Pending"
            @click="changeStatus(index, 'pending')"
          />

          <q-btn
            color="blue"
            label="Cooking"
            @click="changeStatus(index, 'cooking')"
          />

          <q-btn
            color="green"
            label="Ready"
            @click="changeStatus(index, 'ready')"
          />

          <q-btn
            color="grey"
            label="Served"
            @click="changeStatus(index, 'served')"
          />

        </q-card-section>

      </q-card>

    </div>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      orders: []
    }
  },

  mounted () {
    this.loadOrders()
    window.addEventListener("storage", this.loadOrders)
  },

  beforeUnmount () {
    window.removeEventListener("storage", this.loadOrders)
  },

  methods: {

    // 📥 LOAD ORDERS
    loadOrders () {
      this.orders = JSON.parse(localStorage.getItem("chefOrders") || "[]")
    },

    // 🔄 CHANGE STATUS
    changeStatus (index, status) {
      this.orders[index].status = status

      localStorage.setItem("chefOrders", JSON.stringify(this.orders))

      // 👇 sync to customer history too
      localStorage.setItem("customerOrders", JSON.stringify(this.orders))

      this.$q.notify({
        type: "positive",
        message: "Status Updated → " + status
      })
    },

    // 🎨 COLOR
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
.img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.order-card {
  border-radius: 16px;
}
</style>
