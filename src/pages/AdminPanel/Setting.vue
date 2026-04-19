<template>
  <q-page class="q-pa-md bg-grey-1">

    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-primary">⚙️ Settings</div>
        <div class="text-caption text-grey-7">System & Restaurant Configuration</div>
      </div>

      <q-btn icon="save" color="primary" label="Save Changes" @click="saveSettings" />
    </div>

    <!-- GRID -->
    <div class="row q-col-gutter-md">

      <!-- RESTAURANT INFO -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">🏪 Restaurant Info</div>

          <q-input v-model="form.name" label="Restaurant Name" outlined class="q-mb-sm" />
          <q-input v-model="form.phone" label="Phone" outlined class="q-mb-sm" />
          <q-input v-model="form.email" label="Email" outlined class="q-mb-sm" />
          <q-input v-model="form.address" label="Address" type="textarea" outlined />

        </q-card>
      </div>

      <!-- BUSINESS SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">💰 Business Settings</div>

          <q-input v-model="form.currency" label="Currency" outlined class="q-mb-sm" />
          <q-input v-model="form.tax" label="Tax (%)" type="number" outlined class="q-mb-sm" />
          <q-input v-model="form.serviceCharge" label="Service Charge (%)" type="number" outlined />

        </q-card>
      </div>

      <!-- ORDER SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">🍽️ Order Settings</div>

          <q-toggle v-model="form.autoOrderNumber" label="Auto Order Number" />
          <q-toggle v-model="form.autoCancel" label="Auto Cancel Orders" class="q-mt-sm" />

          <q-input v-model="form.cancelTime" label="Cancel Time (minutes)" type="number" outlined class="q-mt-sm" />

        </q-card>
      </div>

      <!-- TABLE SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">🪑 Table Settings</div>

          <q-input v-model="form.totalTables" label="Total Tables" type="number" outlined class="q-mb-sm" />

          <q-toggle v-model="form.qrTable" label="Enable QR Table System" />

          <q-toggle v-model="form.reservation" label="Enable Reservation" class="q-mt-sm" />

        </q-card>
      </div>

      <!-- PAYMENT SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">💳 Payment Settings</div>

          <q-toggle v-model="form.cash" label="Cash Payment" />
          <q-toggle v-model="form.card" label="Card Payment" class="q-mt-sm" />
          <q-toggle v-model="form.mobile" label="Mobile Payment" class="q-mt-sm" />

        </q-card>
      </div>

      <!-- NOTIFICATION SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">🔔 Notifications</div>

          <q-toggle v-model="form.newOrderSound" label="New Order Sound" />
          <q-toggle v-model="form.lowStockAlert" label="Low Stock Alert" class="q-mt-sm" />
          <q-toggle v-model="form.emailNotify" label="Email Notifications" class="q-mt-sm" />

        </q-card>
      </div>

      <!-- THEME SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">🎨 Theme Settings</div>

          <q-toggle v-model="form.darkMode" label="Dark Mode" />

          <q-input v-model="form.primaryColor" label="Primary Color" outlined class="q-mt-sm" />

        </q-card>
      </div>

      <!-- SECURITY SETTINGS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">🔐 Security</div>

          <q-toggle v-model="form.twoFA" label="Two Factor Authentication" />
          <q-input v-model="form.sessionTimeout" label="Session Timeout (min)" type="number" outlined class="q-mt-sm" />

        </q-card>
      </div>

    </div>

  </q-page>
</template>

<script>
export default {
  name: 'SettingPage',

  data () {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        address: '',

        currency: 'BDT',
        tax: 5,
        serviceCharge: 10,

        autoOrderNumber: true,
        autoCancel: false,
        cancelTime: 30,

        totalTables: 10,
        qrTable: true,
        reservation: true,

        cash: true,
        card: true,
        mobile: true,

        newOrderSound: true,
        lowStockAlert: true,
        emailNotify: false,

        darkMode: false,
        primaryColor: '#1976D2',

        twoFA: false,
        sessionTimeout: 15
      }
    }
  },

  mounted () {
    this.loadSettings()
  },

  methods: {

    // 💾 SAVE SETTINGS
    saveSettings () {
      localStorage.setItem("settings", JSON.stringify(this.form))

      this.$q.notify({
        type: "positive",
        message: "Settings Saved Successfully ✅"
      })
    },

    // 📥 LOAD SETTINGS
    loadSettings () {
      const data = JSON.parse(localStorage.getItem("settings"))
      if (data) {
        this.form = data
      }
    }

  }
}
</script>
