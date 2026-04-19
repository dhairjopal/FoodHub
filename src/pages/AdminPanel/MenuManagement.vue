<template>
  <q-page class="q-pa-md">

    <!-- 🔥 TITLE -->
    <div class="text-h5 q-mb-md">🍽️ Menu Management</div>

    <!-- ➕ ADD BUTTON -->
    <q-btn color="primary" label="Add Food" @click="openForm()" class="q-mb-md" />

    <!-- 📦 FOOD LIST -->
    <div class="row q-col-gutter-md">

      <div
        v-for="item in menu"
        :key="item.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card>

          <!-- 🖼️ IMAGE -->
          <img :src="item.image" style="height: 150px; object-fit: cover;" />

          <q-card-section>
            <div class="text-subtitle1">{{ item.name }}</div>
            <div class="text-caption text-grey">{{ item.price }} ৳</div>
          </q-card-section>

          <!-- ✏️ ACTIONS -->
          <q-card-actions align="between">
            <q-btn flat color="orange" label="Edit" @click="editItem(item)" />
            <q-btn flat color="red" label="Delete" @click="deleteItem(item.id)" />
          </q-card-actions>

        </q-card>
      </div>

    </div>

    <!-- 📝 FORM DIALOG -->
    <q-dialog v-model="dialog">
      <q-card style="min-width: 350px">

        <q-card-section>
          <div class="text-h6">
            {{ editId ? "Edit Food" : "Add Food" }}
          </div>
        </q-card-section>

        <q-card-section>

          <q-input v-model="form.name" label="Food Name" outlined class="q-mb-sm" />
          <q-input v-model="form.price" label="Price" type="number" outlined class="q-mb-sm" />
          <q-input v-model="form.image" label="Image URL" outlined class="q-mb-sm" />
          <q-input v-model="form.description" label="Description" outlined type="textarea" />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveFood" />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: "MenuManagement",

  data() {
    return {
      menu: [],
      dialog: false,
      editId: null,

      form: {
        name: "",
        price: "",
        image: "",
        description: ""
      }
    }
  },

  mounted() {
    this.loadMenu()
  },

  methods: {

    // 📥 load menu
    loadMenu() {
      this.menu = JSON.parse(localStorage.getItem("menu") || "[]")
    },

    // ➕ open form
    openForm() {
      this.dialog = true
      this.editId = null
      this.form = { name: "", price: "", image: "", description: "" }
    },

    // ✏️ edit
    editItem(item) {
      this.dialog = true
      this.editId = item.id
      this.form = { ...item }
    },

    // 💾 save
    saveFood() {
      if (!this.form.name || !this.form.price) {
        this.$q.notify({ type: "warning", message: "Fill required fields" })
        return
      }

      const menu = JSON.parse(localStorage.getItem("menu") || "[]")

      if (this.editId) {
        const index = menu.findIndex(i => i.id === this.editId)
        menu[index] = { ...this.form, id: this.editId }
      } else {
        menu.push({
          ...this.form,
          id: Date.now()
        })
      }

      localStorage.setItem("menu", JSON.stringify(menu))

      this.$q.notify({ type: "positive", message: "Saved Successfully" })

      this.dialog = false
      this.loadMenu()
    },

    // ❌ delete
    deleteItem(id) {
      const menu = JSON.parse(localStorage.getItem("menu") || "[]")

      const updated = menu.filter(i => i.id !== id)

      localStorage.setItem("menu", JSON.stringify(updated))

      this.$q.notify({ type: "negative", message: "Deleted" })

      this.loadMenu()
    }

  }
}
</script>
