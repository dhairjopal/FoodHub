<template>
  <q-page class="q-pa-md bg-grey-1">

    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-primary">📊 Reports</div>
        <div class="text-caption text-grey-7">Business Analytics & Performance Overview</div>
      </div>

      <q-btn icon="date_range" label="Filter Date" color="primary" flat />
    </div>

    <!-- KPI CARDS -->
    <div class="row q-col-gutter-md q-mb-md">

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Total Revenue</div>
          <div class="text-h6 text-green">৳ 1,25,400</div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Total Orders</div>
          <div class="text-h6">320</div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Net Profit</div>
          <div class="text-h6 text-blue">৳ 42,800</div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md shadow-2">
          <div class="text-caption text-grey">Cancelled Orders</div>
          <div class="text-h6 text-red">8</div>
        </q-card>
      </div>

    </div>

    <!-- MAIN GRID -->
    <div class="row q-col-gutter-md">

      <!-- SALES SUMMARY -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">💰 Sales Summary</div>

          <q-list>
            <q-item>
              <q-item-section>Cash Sales</q-item-section>
              <q-item-section side>৳ 70,000</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>Online Payments</q-item-section>
              <q-item-section side>৳ 40,000</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>Discount Given</q-item-section>
              <q-item-section side class="text-orange">৳ 5,000</q-item-section>
            </q-item>

          </q-list>
        </q-card>
      </div>

      <!-- TOP SELLING ITEMS -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h6 q-mb-md">🔥 Top Selling Items</div>

          <q-list separator>
            <q-item v-for="item in topItems" :key="item.name">
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption>{{ item.qty }} sold</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-badge color="green">৳ {{ item.revenue }}</q-badge>
              </q-item-section>
            </q-item>
          </q-list>

        </q-card>
      </div>

    </div>

    <!-- STAFF REPORT -->
    <div class="q-mt-md">
      <q-card class="q-pa-md shadow-2">
        <div class="text-h6 q-mb-md">👨‍🍳 Staff Performance</div>

        <q-table
          flat
          :rows="staff"
          :columns="columns"
          row-key="name"
        />

      </q-card>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'ReportPage',
  data () {
    return {
      topItems: [
        { name: 'Burger', qty: 120, revenue: 24000 },
        { name: 'Pizza', qty: 90, revenue: 27000 },
        { name: 'Chicken Rice', qty: 150, revenue: 30000 },
        { name: 'Coffee', qty: 200, revenue: 20000 }
      ],

      staff: [
        { name: 'Rahim', orders: 80, avgTime: '5m' },
        { name: 'Karim', orders: 65, avgTime: '6m' },
        { name: 'Jamal', orders: 90, avgTime: '4m' }
      ],

      columns: [
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'orders', label: 'Orders Handled', field: 'orders' },
        { name: 'avgTime', label: 'Avg Time', field: 'avgTime' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
