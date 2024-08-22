import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index.vue";
import importNPS from "@/views/NPS/importNPS.vue";
// import {
//   getToken,
//   setToken,
//   removeToken,
//   getStoreId,
//   setStoreId,
//   removeStoreId,
//   setUserInfo,
//   getUserInfo,
//   removeUserInfo
// } from "@/utils/cookies";
// import store from "@/store";

Vue.use(Router);

const router = new Router({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
      meta: { title: "Ecom ToolBox", hidden: true, notNeedAuth: true }
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: { title: "Ecom ToolBox", hidden: true, notNeedAuth: true }
    },
    {
      path: "/",
      component: Layout,
      redirect: "/NPS",
      children: [
        // {
        //   path: "dashboard",
        //   component: () =>  import("@/views/dashboard/index.vue"),
        //   name: "Dashboard",
        //   meta: {
        //     title: "工作台",
        //     icon: "dashboard",
        //     affix: true
        //   }
        // },
		    // {
        //   path: "/statistics",
        //   component: () => import("@/views/statistics/index.vue"),
        //   meta: {
        //     title: "数据统计",
        //     icon: "icon-statistics"
        //   }
        // },
        // {
        //   path: "order",
        //   component: () => import("@/views/orderDetails/index.vue"),
        //   meta: {
        //     title: "订单管理",
        //     icon: "icon-order"
        //   }
        // },
        // {
        //   path: "setmeal",
        //   component: () => import("@/views/setmeal/index.vue"),
        //   meta: {
        //     title: "套餐管理",
        //     icon: "icon-combo"
        //   }
        // },
        // {
        //   path: "dish",
        //   component: () => import("@/views/dish/index.vue"),
        //   meta: {
        //     title: "菜品管理",
        //     icon: "icon-dish"
        //   }
        // },
        // {
        //   path: "/dish/add",
        //   component: () => import("@/views/dish/addDishtype.vue"),
        //   meta: {
        //     title: "添加菜品",
        //     hidden: true
        //   }
        // },
        
        // {
        //   path: "category",
        //   component: () => import("@/views/category/index.vue"),
        //   meta: {
        //     title: "分类管理",
        //     icon: "icon-category"
        //   }
        // },
        {
          path: "user",
          component: () => import("@/views/employee/index.vue"),
          meta: {
            title: "Manage user",
            hidden: true
          }

        },
        
        {
          path: "/user/add",
          component: () => import("@/views/employee/addEmployee.vue"),
          meta: {
            title: "Edit User",
            hidden: true
          }
        },
        
        // {
        //   path: "/setmeal/add",
        //   component: () => import("@/views/setmeal/addSetmeal.vue"),
        //   meta: {
        //     title: "添加套餐",
        //     hidden: true
        //   }
        // },

        {
          path: "NPS",
          component: () => import("@/views/NPS/index.vue"),
          meta: {
            title: "NPS",
          },
          children:[
            {
              path: "/NPS/import",
              component: () => import("@/views/NPS/importNPS.vue"),
              meta: {
                title: "NPSImport",
                icon: "icon-category",
                subgroup: true
              }
            },
            {
              path: "/NPS/search",
              component: () => import("@/views/NPS/npsSearch.vue"),
              meta: {
                title: "NPSSearch",
                icon: "icon-category",
                subgroup:true
              }
            }
          ]
        },

        {
          path: "AgedReturn",
          component: () => import("@/views/ageReturn/index.vue"),
          meta: {
            title: "Aged Return",
          },
          children:[
            {
              path: "/AgedReturn/importSimple",
              component: () => import("@/views/ageReturn/importAgeReturnSimple.vue"),
              meta: {
                title: "New Return Import",
                icon: "icon-category",
                subgroup: true
              }
            },
            {
              path: "/AgedReturn/SimpleRDOSearch",
              component: () => import("@/views/ageReturn/ageReturnSearchSimple.vue"),
              meta: {
                title: "New RDO Search",
                icon: "icon-category",
                subgroup: true
              }
            },
            {
              path: "/AgedReturn/import",
              component: () => import("@/views/ageReturn/importAgeReturn.vue"),
              meta: {
                title: "Aged Return Import",
                icon: "icon-category",
                subgroup: true
              }
            },
            {
              path: "/AgedReturn/search",
              component: () => import("@/views/ageReturn/ageReturnSearch.vue"),
              meta: {
                title: "Aged Return Search",
                icon: "icon-category",
                subgroup:true
              }
            }
          ]
        },

        {
          path: "SCR",
          component: () => import("@/views/scr/index.vue"),
          meta: {
            title: "SCR",
          },
          children:[
            {
              path: "/import",
              component: () => import("@/views/scr/importSCR.vue"),
              meta: {
                title: "SCR Import",
                icon: "icon-category",
                subgroup: true
              }
            },
            {
              path: "/result",
              component: () => import("@/views/scr/scrResult.vue"),
              meta: {
                title: "SCR Summary",
                icon: "icon-category",
                subgroup:true
              }
            },
            {
              path: "/history",
              component: () => import("@/views/scr/scrHistory.vue"),
              meta: {
                title: "SCR History",
                icon: "icon-category",
                subgroup:true
              }
            },
            {
              path: "/dod",
              component: () => import("@/views/scr/dodResearch.vue"),
              meta: {
                title: "DOD Research",
                icon: "icon-category",
                subgroup:true
              }
            }
          ]
        },

        {
          path: "Vertica",
          component: () => import("@/views/vertica/index.vue"),
          meta: {
            title: "Vertica",
          },
          children:[
            {
              path: "/ups",
              component: () => import("@/views/vertica/upsTracking.vue"),
              meta: {
                title: "UPSTracking",
                icon: "icon-category",
                subgroup:true
              }
            },

            {
              path: "/fedex",
              component: () => import("@/views/vertica/fedExTracking.vue"),
              meta: {
                title: "FedExTracking",
                icon: "icon-category",
                subgroup:true
              }
            },

            {
              path: "/pb",
              component: () => import("@/views/vertica/pbTracking.vue"),
              meta: {
                title: "pbTracking",
                icon: "icon-category",
                subgroup:true
              }
            },

            {
              path: "/edd",
              component: () => import("@/views/vertica/EDD.vue"),
              meta: {
                title: "EDD",
                icon: "icon-category",
                subgroup:true
              }
            },

            {
              path: "/empty",
              component: () => import("@/views/vertica/EDD.vue"),
              meta: {
                title: "EDD",
                icon: "icon-category",
                subgroup:true
              }
            }
          ]

        }

      ]
    },
    {
      path: "*",
      redirect: "/404",
      meta: { hidden: true }
    }
  ]
});

export default router;
