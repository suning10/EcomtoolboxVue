import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import Cookies from 'js-cookie'

NProgress.configure({ 'showSpinner': false })
console.log(process.env.VUE_APP_Enable_Login)
if(process.env.VUE_APP_Enable_Login === '1'){

  router.beforeEach(async (to: Route, _: Route, next: any) => {
    NProgress.start()
    if (Cookies.get('token')) {
      next()
    } else {
      if (!to.meta.notNeedAuth) {
        next({path:'/login',
              query: {redirect: to.fullPath}
        })
      } else {
        next()
      }
    }
  })
}

router.afterEach((to: Route) => {
  NProgress.done()
  document.title = to.meta.title
})

