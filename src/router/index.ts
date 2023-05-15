import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import Home from "../views/page/home/index.vue";
// import Upload from "../views/page/upload/index.vue";
// import Layout from "../views/layout/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/index.vue"),
    children: [
      {
        // 会员列表
        path: "home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/page/home/index.vue"),
      },
      {
        // 会员等级
        path: "upload",
        name: "Upload",
        component: () =>
          import(
            /* webpackChunkName: "upload" */ "../views/page/upload/index.vue"
          ),
      },
    ],
  },
];

//createWebHistory 采用history模式会出现子路由刷新空白的问题
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
