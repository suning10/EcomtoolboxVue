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
      redirect: "/CStock",
      children: [
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
        
        {
          path: "CStock",
          component: () => import("@/views/cStock/index.vue"),
          meta: {
            title: "CStock",
          },
          children:[
            {
              path: "/cStock/summary",
              component: () => import("@/views/cStock/cStockSummary.vue"),
              meta: {
                title: "CStock Summary",
                icon: "icon-category",
                subgroup: true
              }
            },
            {
              path: "/cStock/sku",
              component: () => import("@/views/cStock/sku.vue"),
              meta: {
                title: "SKU",
                icon: "icon-category",
                subgroup:true
              }
            },
            {
              path: "/cStock/PUMI",
              component: () => import("@/views/cStock/PUMI.vue"),
              meta: {
                title: "PUMI",
                icon: "icon-category",
                subgroup:true
              }
            },
            {
              path: "/Cstock/add",
              component: () => import("@/views/cStock/newCStockSKU.vue"),
              meta: {
                title: "Edit CStock SKU",
                hidden: true
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
          path: "RDOVertica",
          component: () => import("@/views/vertica/index.vue"),
          meta: {
            title: "RDO-Vertica",
          },
          children:[
            {
              path: "/rdoSearch",
              component: () => import("@/views/vertica/RDOSearch.vue"),
              meta: {
                title: "RDO Search",
                icon: "icon-category",
                subgroup: true
              }
            }
          ]
        },

        {
          path: "SCR Research",
          component: () => import("@/views/scr/index.vue"),
          meta: {
            title: "SCR Research",
          },
          children:[
            {
              path: "/importSCR",
              component: () => import("@/views/scr/importSCRFiles.vue"),
              meta: {
                title: "SCR Import",
                icon: "icon-category",
                subgroup: true
              }
            },           
            {
              path: "/scr/scrReasearch",
              component: () => import("@/views/scr/SCRResearch.vue"),
              name:'sCRResearch',
              meta: {
                title: "SCR Research",
                icon: "icon-category",
                subgroup:true
              }
            },
            {
              path: "/scr/skuReasearch",
              component: () => import("@/views/scr/scrResearchComponent/skuResearch.vue"),
              name:'skuResearch',
              meta: {
                title: "SCR Research",
                hidden: true
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
            },
            {
              path: "/missingTransactions",
              component: () => import("@/views/scr/scrMissingTransaction.vue"),
              meta: {
                title: "MissingTransactions",
                icon: "icon-category",
                subgroup:true
              }
            },
            {
              path: "/history",
              component: () => import("@/views/scr/scrHistory.vue"),
              meta: {
                title: "SCR Trend",
                icon: "icon-category",
                subgroup:true
              }
            }
          ]
        },
        
        {
          path: "AI",
          component: () => import("@/views/vertica/index.vue"),
          meta: {
            title: "AI",
          },
          children:[
            // {
            //   path: "chat",
            //   component: () => import("@/views/chat/index.vue"),
            //   meta: {
            //     title: "AI Chat",
            //     icon: "icon-order",
            //     hideChatWidget: true
            //   }
            // },
            {
              path: "chat-stream",
              component: () => import("@/views/chat-stream/index.vue"),
              meta: {
                title: "AI Chat stream",
                icon: "icon-order",
                hideChatWidget: true
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
              path: "/eddCE",
              component: () => import("@/views/vertica/EDDCE.vue"),
              meta: {
                title: "EDDCE",
                icon: "icon-category",
                subgroup:true
              }
            },
            
            {
              path: "/upsOrigin",
              component: () => import("@/views/vertica/originScanUPS.vue"),
              meta: {
                title: "UPS Origin",
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
