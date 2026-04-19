<template>
  <q-page class="q-pa-md bg-grey-1">

    <!-- 🔥 TITLE -->
    <div class="text-h5 q-mb-md text-primary">
      🛒 Your Cart
    </div>

    <!-- EMPTY -->
    <div v-if="cart.length === 0" class="text-center q-pa-xl text-grey">
      <q-icon name="shopping_cart" size="90px" />
      <div class="text-subtitle1 q-mt-md">Your cart is empty</div>
    </div>

    <!-- CART -->
    <q-card v-else class="cart-wrapper shadow-3">

      <q-card-section>

        <div
          v-for="(item, index) in cart"
          :key="index"
          class="cart-item row items-center q-mb-md"
        >

          <!-- IMAGE -->
          <q-img :src="item.image" class="cart-img" />

          <!-- INFO -->
          <div class="col q-pl-md">

            <div class="text-h6">{{ item.name }}</div>

            <div class="text-caption text-grey">
              {{ item.description || "Delicious item" }}
            </div>

            <div class="text-primary text-subtitle1 q-mt-xs">
              💰 {{ item.price }} ৳
            </div>

            <!-- QTY -->
            <div class="row items-center q-mt-sm">

              <q-btn dense round icon="remove" color="grey"
                @click="decreaseQty(index)" />

              <div class="q-mx-md text-bold">{{ item.qty }}</div>

              <q-btn dense round icon="add" color="primary"
                @click="increaseQty(index)" />

            </div>

          </div>

          <!-- DELETE -->
          <q-btn icon="delete" color="red" flat round
            @click="removeItem(index)" />

        </div>

      </q-card-section>

      <q-separator />

      <!-- TOTAL + CHECKOUT -->
      <q-card-section class="row items-center justify-between">

        <div>
          <div class="text-caption">Total Amount</div>
          <div class="text-h6 text-primary">
            {{ total }} ৳
          </div>
        </div>

        <q-btn
          color="green"
          icon="payment"
          label="Checkout"
          class="checkout-btn"
          @click="checkout"
        />

      </q-card-section>

    </q-card>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      cart: []
    }
  },

  mounted () {
    this.loadCart()
  },

  computed: {
    total () {
      return this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0)
    }
  },

  methods: {

    loadCart () {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]")
    },

    increaseQty (index) {
      this.cart[index].qty++
      this.saveCart()
    },

    decreaseQty (index) {
      if (this.cart[index].qty > 1) {
        this.cart[index].qty--
      } else {
        this.cart.splice(index, 1)
      }
      this.saveCart()
    },

    removeItem (index) {
      this.cart.splice(index, 1)
      this.saveCart()
    },

    saveCart () {
      localStorage.setItem("cart", JSON.stringify(this.cart))
      this.loadCart()
    },

    // 🚀 FINAL CHECKOUT SYSTEM
    checkout () {
      if (this.cart.length === 0) {
        this.$q.notify({
          type: "warning",
          message: "Cart is empty"
        })
        return
      }

      // 🔥 NEW ORDER
      const newOrder = {
        id: Date.now(),
        tableId: this.$route.params.id || null,

        items: this.cart.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          image: i.image
        })),

        total: this.total,

        status: "pending", // 👈 IMPORTANT

        createdAt: new Date().toLocaleString()
      }

      // 👨‍🍳 CHEF ORDERS (IncomingOrders.vue)
      const chefOrders = JSON.parse(localStorage.getItem("chefOrders") || "[]")
      chefOrders.unshift(newOrder)
      localStorage.setItem("chefOrders", JSON.stringify(chefOrders))

      // 👤 CUSTOMER HISTORY
      const customerOrders = JSON.parse(localStorage.getItem("customerOrders") || "[]")
      customerOrders.unshift(newOrder)
      localStorage.setItem("customerOrders", JSON.stringify(customerOrders))

      // 🧹 CLEAR CART
      localStorage.removeItem("cart")
      this.cart = []

      this.$q.notify({
        type: "positive",
        message: "Order Placed Successfully 🎉"
      })

      // 👉 redirect to status page
      this.$router.push(`/customer/status/${this.$route.params.id}`)
    }

  }
}
</script>

<style scoped>
.cart-wrapper {
  border-radius: 18px;
  overflow: hidden;
  background: white;
}

.cart-item {
  padding: 10px 0;
}

.cart-img {
  width: 85px;
  height: 85px;
  border-radius: 12px;
  object-fit: cover;
}

.checkout-btn {
  border-radius: 12px;
  padding: 8px 20px;
}
</style>
