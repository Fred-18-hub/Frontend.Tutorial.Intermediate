<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink :to="{ name: 'about' }">About</RouterLink> |
    <RouterLink :to="{ name: 'jobs' }">Jobs</RouterLink>
  </nav>

  <!-- Programmatic Navigation -->
  <button @click="redirect">Redirect</button>
  <button @click="back">Back</button>
  <button @click="forward">Forward</button>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter();

function redirect() {
  router.push({ name: 'home' });
}

function back() {
  router.back();
}

function forward() {
  router.forward();
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

nav a.router-link-exact-active {
  color: white;
  background: crimson;
}

button {
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
}
</style>
