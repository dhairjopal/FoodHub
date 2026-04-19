<template>
  <q-page class="q-pa-md bg-grey-1">

    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-primary">👨‍🍳 Staff Management</div>
        <div class="text-caption text-grey-7">Manage team, roles & performance</div>
      </div>

      <div class="row q-gutter-sm">
        <q-btn color="orange" icon="restaurant" label="Add Chef" @click="openForm('Chef')" />
        <q-btn color="primary" icon="person_add" label="Add Staff" @click="openForm('Waiter')" />
      </div>
    </div>

    <!-- KPI -->
    <div class="row q-col-gutter-md q-mb-md">

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Total Staff</div>
          <div class="text-h6">{{ staff.length }}</div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Online</div>
          <div class="text-h6 text-green">
            {{ staff.filter(s => s.status === 'Online').length }}
          </div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Busy</div>
          <div class="text-h6 text-orange">
            {{ staff.filter(s => s.status === 'Busy').length }}
          </div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Offline</div>
          <div class="text-h6 text-red">
            {{ staff.filter(s => s.status === 'Offline').length }}
          </div>
        </q-card>
      </div>

    </div>

    <!-- TABLE -->
    <q-card class="q-pa-md shadow-2">

      <q-table :rows="staff" :columns="columns" row-key="id" flat>

        <!-- IMAGE COLUMN -->
        <template v-slot:body-cell-avatar="props">
          <q-td :props="props">
            <q-avatar>
              <img :src="props.row.avatar || defaultImg" />
            </q-avatar>
          </q-td>
        </template>

        <!-- STATUS -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="getStatusColor(props.row.status)">
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <!-- ACTIONS -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">

            <q-btn dense flat icon="edit" color="primary"
              @click="editStaff(props.row)" />

            <q-btn dense flat icon="delete" color="red"
              @click="deleteStaff(props.row.id)" />

          </q-td>
        </template>

      </q-table>

    </q-card>

    <!-- FORM -->
    <q-dialog v-model="dialog">
      <q-card style="min-width: 380px">

        <q-card-section>
          <div class="text-h6">
            {{ editId ? "Edit Staff" : "Add Staff" }}
          </div>
        </q-card-section>

        <q-card-section>

          <q-input v-model="form.name" label="Name" outlined class="q-mb-sm" />
          <q-input v-model="form.role" label="Role" outlined class="q-mb-sm" />

          <q-select
            v-model="form.status"
            :options="['Online','Busy','Offline']"
            label="Status"
            outlined
            class="q-mb-sm"
          />

          <!-- ⭐ IMAGE UPLOAD -->
          <q-file
            v-model="imageFile"
            label="Select Photo"
            outlined
            accept="image/*"
            class="q-mb-sm"
            @update:model-value="onImageChange"
          />

          <div v-if="form.avatar" class="text-center q-mt-sm">
            <q-avatar size="80px">
              <img :src="form.avatar" />
            </q-avatar>
          </div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveStaff" />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      staff: [],
      dialog: false,
      editId: null,
      imageFile: null,

      defaultImg: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",

      form: {
        name: '',
        role: '',
        status: 'Online',
        avatar: ''
      },

      columns: [
        { name: 'avatar', label: 'Photo', field: 'avatar' },
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'role', label: 'Role', field: 'role' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'actions', label: 'Actions', field: 'actions' }
      ]
    }
  },

  mounted () {
    this.loadStaff()
  },

  methods: {

    loadStaff () {
      this.staff = JSON.parse(localStorage.getItem("staff") || "[]")
    },

    openForm (role) {
      this.dialog = true
      this.editId = null
      this.imageFile = null

      this.form = {
        name: '',
        role,
        status: 'Online',
        avatar: ''
      }
    },

    editStaff (row) {
      this.dialog = true
      this.editId = row.id
      this.form = { ...row }
    },

    // ⭐ IMAGE TO BASE64
    onImageChange (file) {
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        this.form.avatar = reader.result
      }
      reader.readAsDataURL(file)
    },

    saveStaff () {
      let data = JSON.parse(localStorage.getItem("staff") || "[]")

      if (this.editId) {
        const i = data.findIndex(s => s.id === this.editId)
        data[i] = { ...this.form, id: this.editId }
      } else {
        data.push({
          ...this.form,
          id: Date.now()
        })
      }

      localStorage.setItem("staff", JSON.stringify(data))

      this.dialog = false
      this.loadStaff()

      this.$q.notify({
        type: "positive",
        message: "Saved Successfully"
      })
    },

    deleteStaff (id) {
      let data = JSON.parse(localStorage.getItem("staff") || "[]")
      data = data.filter(s => s.id !== id)

      localStorage.setItem("staff", JSON.stringify(data))
      this.loadStaff()

      this.$q.notify({
        type: "negative",
        message: "Deleted"
      })
    },

    getStatusColor (status) {
      if (status === 'Online') return 'green'
      if (status === 'Busy') return 'orange'
      return 'red'
    }

  }
}
</script>
