<template>
  <q-page class="q-pa-md">

    <!-- 🔥 TITLE -->
    <div class="text-h5 q-mb-md">🍽️ Food Menu</div>

    <!-- 🍽️ MENU LIST -->
    <div class="row q-col-gutter-md">

      <div
        v-for="item in menu"
        :key="item.id"
        class="col-12 col-sm-6 col-md-4"
      >

        <q-card class="shadow-3">

          <!-- 🖼️ IMAGE -->
          <q-img :src="item.image" height="160px" />

          <q-card-section>

            <div class="text-h6">{{ item.name }}</div>

            <div class="text-caption text-grey">
              {{ item.description }}
            </div>

            <div class="text-subtitle1 text-primary q-mt-sm">
              💰 {{ item.price }} ৳
            </div>

          </q-card-section>

          <!-- ⚡ ACTION BUTTONS -->
          <q-card-actions align="between">

            <!-- 📄 DETAILS -->
            <q-btn
              flat
              color="blue"
              icon="info"
              label="Details"
              @click="showDetails(item)"
            />

            <!-- 🛒 ADD TO CART -->
            <q-btn
              color="green"
              icon="shopping_cart"
              label="Add"
              @click="addToCart(item)"
            />

          </q-card-actions>

        </q-card>

      </div>

    </div>

  </q-page>
</template>

<script>
export default {
  name: "MenuPage",

  data () {
    return {
      menu: []
    }
  },

  mounted () {
    this.loadMenu()
    window.addEventListener("storage", this.loadMenu)
  },

  beforeUnmount () {
    window.removeEventListener("storage", this.loadMenu)
  },

  methods: {

    // 📥 LOAD MENU FROM ADMIN
    loadMenu () {
      this.menu = JSON.parse(localStorage.getItem("menu") || "[]")
    },

    // 🛒 ADD TO CART (FIXED VERSION)
    addToCart (item) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]")

      const existing = cart.find(i => i.id === item.id)

      if (existing) {
        existing.qty += 1
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          qty: 1
        })
      }

      localStorage.setItem("cart", JSON.stringify(cart))

      this.$q.notify({
        type: "positive",
        message: "Added to cart 🛒"
      })
    },

    // 📄 DETAILS
    showDetails (item) {
      this.$q.dialog({
        title: item.name,
        message: `
💰 Price: ${item.price} ৳

📝 ${item.description || "No description"}
        `,
        ok: "Close"
      })
    }

  }
}
</script>
