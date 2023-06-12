import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'first',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/enquiryForm/FirstStep.vue'),
    },
    {
      path: '/second',
      name: 'second',
      component: () => import('../views/enquiryForm/SecondStep.vue'),
    },
    {
      path: '/third',
      name: 'third',
      component: () => import('../views/enquiryForm/ThirdStep.vue'),
    },
    {
      path: '/thank-you',
      name: 'thankYou',
      component: () => import('../views/enquiryForm/ThankYou.vue'),
    },
    {
      path: '/newsletter',
      name: 'newsletter',
      component: () => import('../views/newsletterForm/Newsletter.vue'),
    },
    {
      path: '/newsletter-thank-you',
      name: 'newsletterThankYou',
      component: () => import('../views/newsletterForm/NewsletterThankYou.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
