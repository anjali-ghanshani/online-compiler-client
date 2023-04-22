<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/quiz" class="home-button">Start Coding</RouterLink>
</template>

<style scoped>
.home-button {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin: auto;
  text-decoration: none;
  background-color: white;
  opacity: 0.8;
  color: black;
  font-size: 2rem;
  font-weight: 800;
  padding: 1rem 2rem;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  border: 3px solid black;
  transition: background-color 0.5s ease-in-out;
}

.home-button:hover {
  border: 3px solid white;
  background-color: black;
  color: white;
}
</style>
