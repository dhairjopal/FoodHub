const routes = [

  // 🔐 AUTH
  {
    path: "/",
    component: () => import("layouts/Authlayout.vue"),
  },

  // 👑 ADMIN
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", redirect: "dashboard" },

      {
        path: "dashboard",
        component: () => import("pages/AdminPanel/DashboardPage.vue"),
      },
      {
        path: "menu",
        component: () => import("pages/AdminPanel/MenuManagement.vue"),
      },
      {
        path: "staff",
        component: () => import("pages/AdminPanel/StaffManagement.vue"),
      },
      {
        path: "tables",
        component: () => import("pages/AdminPanel/TableManagement.vue"),
      },
      {
        path: "orders",
        component: () => import("pages/AdminPanel/orderPage.vue"),
      },
       {
        path: "reports",
        component: () => import("pages/AdminPanel/ReportPage.vue"),
      },
      {
        path: "pos",
        component: () => import("pages/AdminPanel/posPage.vue"),
      },
       {
        path: "profile",
        component: () => import("pages/AdminPanel/Profile.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/AdminPanel/Setting.vue"),
      },
    ],
  },

  // 👨‍💼 STAFF
  {
    path: "/staff",
    component: () => import("layouts/StaffLayout.vue"),
    children: [
      { path: "", redirect: "active-orders" },

      {
        path: "active-orders",
        component: () => import("pages/StaffPanel/ActiveOrders.vue"),
      },
      {
        path: "create-order",
        component: () => import("pages/StaffPanel/CreateOrder.vue"),
      },
      {
        path: "table-dashboard",
        component: () => import("pages/StaffPanel/TableDashboard.vue"),
      },
      {
        path: "serve-food",
        component: () => import("pages/StaffPanel/ServeFoodPage.vue"),
      },
      {
        path: "notifications",
        component: () => import("pages/StaffPanel/NotificationsPage.vue"),
      },
      {
        path: "profile",
        component: () => import("pages/StaffPanel/MyProfile.vue"),
      },
    ],
  },

  // 👨‍🍳 CHEF
  {
    path: "/chef",
    component: () => import("layouts/ShafeLayout.vue"),
    children: [
      { path: "", redirect: "incoming-orders" },

      {
        path: "incoming-orders",
        component: () => import("pages/ShafePanel/IncomingOrders.vue"),
      },
      {
        path: "order-details",
        component: () => import("pages/ShafePanel/OrderDetails.vue"),
      },
      {
        path: "cooking-queue",
        component: () => import("pages/ShafePanel/CookingQueue.vue"),
      },
      {
        path: "ready-orders",
        component: () => import("pages/ShafePanel/ReadyOrders.vue"),
      },
      {
        path: "call-staff",
        component: () => import("pages/ShafePanel/CallStaff.vue"),
      },
      {
        path: "kitchen-status",
        component: () => import("pages/ShafePanel/KitchenStatusDashboard.vue"),
      },
      {
        path: "issue",
        component: () => import("pages/ShafePanel/IssueHandling.vue"),
      },
      {
        path: "profile",
        component: () => import("pages/ShafePanel/Profile.vue"),
      },
    ],
  },

  // 👤 CUSTOMER (QR BASED SYSTEM)
  {
    path: "/customer",
    component: () => import("layouts/MainLayout.vue"),
    children: [

      // 🍽️ MENU (QR → table id)
      {
        path: "menu/:id",
        component: () => import("pages/MenuPage.vue"),
      },

      // 🛒 CART (table based)
      {
        path: "cart/:id",
        component: () => import("pages/CartPage.vue"),
      },

      // 📦 ORDER STATUS
      {
        path: "status/:id",
        component: () => import("pages/OrderStatus.vue"),
      },

      // 🍽️ SERVE INFO (optional tracking page)
      {
        path: "serve/:id",
        component: () => import("pages/Serve.vue"),
      },


    ],
  },

  // ❌ NOT FOUND
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
