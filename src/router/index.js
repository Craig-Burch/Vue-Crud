import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: "/", component: "Admin" },

];
//  
//{ path: "/home", component: "Home", meta: { requiresAuth: true } },
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`../components/${route.component}.vue`)
  };
});

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes,
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },

});


// old router
// import HelloWorld from '@/components/HelloWorld'
// import Index from '@/components/Index'

// Vue.use(Router)

// export default new Router({
//   mode:'hash',
//   routes: [
//     {
//       path: '/',
//       name: 'Index',
//       component: Index
//     },
//     {
//       path: '/HelloWorld',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ],
//   scrollBehavior: to => {
//     if (to.hash) {
//       return { selector: to.hash };
//     } else {
//       return { x: 0, y: 0 };
//     }
//   },
// })
