<template>
  <div class="flex-col w-full">
    <div class="text-13 font-bold flex items-center flex-grow justify-center">
      <router-link :to="isPrevious ? { name: link } : ''">
        <div
          class="rounded-full h-28 w-28 flex items-center justify-center flex-shrink-0 bg-primary-lighter"
          :class="[
            isPrevious ? 'cursor-pointer prev' : 'cursor-not-allowed',
          ]"
        >
          <div
            class="rounded-full h-20 w-20 flex items-center justify-center"
            :class="[
              active ? 'bg-primary' : 'bg-white',
              isPrevious ? 'bg-grey' : '',
            ]"
          >
            <span
              class="counter font-secondary leading-none text-[12px]"
              :class="active ? 'text-white' : 'text-grey-dark'"
            >
              {{ stepNumber }}
            </span>
          </div>
        </div>
      </router-link>

      <div
        class="flex items-center w-6/12 md:w-auto percent ml-[calc(50%_-_2rem)]"
      >
        <span v-if="name">
          <span
            v-if="!isPrevious"
            class="ml-8 hidden md:block"
            :class="active ? 'text-primary' : 'text-grey-dark'"
            >{{ name }}
          </span>
          <a
            v-else
            :href="link"
            class="ml-8 hidden md:block hover:text-primary-light"
            :class="active ? 'text-primary' : 'text-grey-dark'"
          >
            {{ name }}
          </a>
        </span>
        <div
          v-show="hasSeparator"
          class="w-16 ml-15 h-1 border-b border-grey-dark"
        ></div>
      </div>
    </div>
    <div v-if="name && active" class="md:hidden text-primary text-14">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  name?: string;
  stepNumber: number;
  link: string;
  active: boolean;
  isPrevious: boolean;
  hasSeparator: boolean;
}

withDefaults(defineProps<Props>(), {
  active: false,
  isPrevious: false,
  hasSeparator: true,
});
</script>

<style scoped>
.prev {
  @apply bg-[#C4C4C4];
}
.prev .counter {
  @apply text-white;
}
.prev > div {
  @apply bg-[#777];
}
</style>
