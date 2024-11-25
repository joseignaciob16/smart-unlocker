<template>
  <component :is="auth.user ? AuthLayout : 'div'">
    <RouterView />
  </component>
  
</template>

<script setup>
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router'
  import useAuthStore from './stores/auth';
  import AuthLayout from './layouts/AuthLayout.vue';

  const auth = useAuthStore();

  onMounted(async () => {
      await auth.getUser();
  });
</script>
