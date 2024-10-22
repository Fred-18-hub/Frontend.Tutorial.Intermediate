import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/jobs/JobsView.vue';
import JobMessage from '@/components/JobMessage.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NoAccessView from '@/views/NoAccessView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: "/jobs",
      component: JobsView,
      children: [
        {
          path: "",
          name: "jobs",
          component: JobMessage,
          beforeEnter: (to, from, next) => {
            console.log("before enter ran");
            
            if (from.name === "noAccess") {
              next("/no-access");
            }
            else {
              next();
            }
          }
        },
        {
          path: ":id",
          name: "jobDetails",
          component: () => import('@/views/jobs/JobDetailsView.vue'),
          props: true
        },
      ]
    },
    
    // Redirect
    {
      path: "/all-jobs",  // old/non-existing route to be redirected
      redirect: "jobs"  // existing route to be redirected to
    },
    // Not found
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: NotFoundView
    },
    {
      path: "/no-access",
      name: "noAccess",
      component: NoAccessView
    }
  ]
})

function accessAuth(to: RouteLocationNormalizedGeneric) {
  return new Promise((resolve) => {
    if (to.name == "about") {
      resolve(false)
    }
    else {
      resolve(true)
    }
  })
}

router.beforeEach(async (to) => {
  console.log("before each ran");
  
  const hasAccess = await accessAuth(to);
  if (!hasAccess) {
    return { name: "noAccess" }
  }
  else {
    return true
  }
});

router.beforeResolve((to) => {
  console.log('before resolve ran');
  if (to.name === 'jobs') {
    // Jobs can be fetched here and passed to the component through state management
    // This will prevent the component from fetching the jobs again when it is mounted
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('i finally resolved');
        resolve(true);
      }, 2000);
    });
  }
});

router.afterEach(to => {
  console.log(`Navigated to: ${to.name?.toString()}`);
});

export default router
