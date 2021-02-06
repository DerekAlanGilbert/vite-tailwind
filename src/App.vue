<template>
  <div>
    <nav
      class="flex items-center justify-center w-full h-16 border-b border-gray-200"
    >
      <h2 class="text-xl">Nav</h2>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({}),
})
</script>

<style>
html,
body {
  @apply h-screen w-screen bg-gray-100;
}
</style>
