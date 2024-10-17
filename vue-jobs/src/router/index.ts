import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/jobs/JobsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import JobMessage from '@/components/JobMessage.vue';

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
      name: "jobs",
      component: JobsView,
      children: [
        {
          path: "",
          component: JobMessage,
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
    }
  ]
})

export default router
