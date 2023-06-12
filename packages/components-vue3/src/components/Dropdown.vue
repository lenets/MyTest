<template>
  <!-- max-width is a quickfix for mobile we will need to handle it differently -->
  <div
    ref="dropdownEl"
    class="bg-white z-50 rounded-md p-16 text-black font-normal text-16 shadow-md"
    style="max-width: 75vw; display: none"
    @click="onClick($event)"
  >
    <slot>Dropdown content</slot>
  </div>
</template>

<script setup lang="ts">
import type { PositioningStrategy } from '@popperjs/core';
import { createPopper, preventOverflow, flip, offset } from '@popperjs/core';
import { onMounted, onUnmounted, ref, watch } from 'vue';

export interface Props {
  strategy?: PositioningStrategy;
  manualOpen?: boolean;
  open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  strategy: 'absolute' as PositioningStrategy,
});

let parentEl = null as HTMLElement | null; // defined on mount
const dropdownEl = ref<HTMLElement | null>(null);

onMounted(() => {
  parentEl = (dropdownEl.value as HTMLElement).parentElement;
  (dropdownEl.value as HTMLElement).style.display = 'block';
  initPopper(parentEl as HTMLElement);
});

if (props.manualOpen) {
  watch(
    () => props.open,
    (value) => {
      if (value) {
        (dropdownEl.value as HTMLElement).style.visibility = 'visible';

        open();
      } else {
        close();
      }
    }
  );
} else {
  onMounted(() => {
    (parentEl as HTMLElement).addEventListener('click', toggle);
    window.addEventListener('click', close);
  });

  onUnmounted(() => {
    (parentEl as HTMLElement).removeEventListener('click', toggle);
    window.removeEventListener('click', close);
  });
}

let isOpen = false;
function toggle() {
  if (isOpen) {
    close();
  } else {
    open();
  }
}

function open() {
  // it looks like this is the recommended way of hiding drop
  // taken from https://github.com/atomiks/tippyjs/blob/ea753de47a27418f317296020fe9807f3ad1b117/src/createTippy.ts#L1000
  (dropdownEl.value as HTMLElement).style.visibility = 'visible';
  isOpen = true;
}

function close(event?: Event) {
  if (event && event.target === parentEl) {
    return;
  }

  (dropdownEl.value as HTMLElement).style.visibility = 'hidden';
  isOpen = false;
}

function initPopper(parentEl: HTMLElement) {
  const modifiers = [
    preventOverflow,
    flip,
    offset,
    {
      name: 'offset',
      options: {
        offset: [0, 10],
      },
    },
  ];

  createPopper(parentEl, dropdownEl.value as HTMLElement, {
    placement: 'bottom',
    strategy: props.strategy,
    modifiers,
  });

  (dropdownEl.value as HTMLElement).style.visibility = 'hidden';
}

function onClick($event: Event) {
  $event.preventDefault();
  $event.stopPropagation();
}
</script>
