<template>
  <div class="spin"></div>
</template>

<style>
.spin {
  @apply mx-auto w-40 h-40 rounded-full border-transparent border-t-secondary border-2 animate-spin;
}
@keyframes spin {
  to {
    -webkit-transform: rotateZ(360deg);
  }
}
</style>
