<template>
  <div class="lg:flex lg:justify-between">
    <div class="w-full lg:w-2/3">
      <div class="newsletter-header-nav py-20 pl-16 lg:pl-32 xl:pl-64">
        <a
          class="logo flex flex-col items-end w-140 md:w-164"
          :href="siteData.domenUrl" target="_blank"
        >
          <img :alt="`${siteData.siteName} logo`" :src="getImageUrl(siteData.logoImg)" />
        </a>
      </div>
      <div class="mx-24 lg:mx-32 xl:mx-64 overflow-hidden lg:overflow-visible">
        <div class="main-content mx-auto">
          <transition name="slot" mode="out-in" appear>
            <slot></slot>
          </transition>
        </div>
      </div>
    </div>

    <aside class="hidden lg:block h-screen w-1/3 sticky top-0">
      <img
        alt="Aside image"
        :src="getImageUrl(siteData.sidebarImg)"
        class="w-full h-full object-cover"
      />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { getSiteData, getImageUrl } from '@/helpers';

const siteData = getSiteData();

</script>

<style scoped>
.main-content {
  max-width: 600px;
  width: 100%;
}
.slot-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slot-enter-active {
  transition: all 0.3s ease-out;
}
.slot-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.slot-leave-active {
  transition: all 0.3s ease-in;
}
</style>
