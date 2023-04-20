<script setup>
import { RouterView } from 'vue-router'
import './assets/main.css'
import HomeVue from './views/HomeView.vue'
import QuizVue from './views/QuizView.vue'
</script>

<template>
  <div class="container">
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <RouterView />
  </div>
</template>

<style scoped>
.bg {
  animation: slide 10s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #f5e12d 50%, #272727 50%);
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 12s;
}

.bg3 {
  animation-duration: 15s;
}

.content {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25em;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  left: 50%;
  padding: 10vmin;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-family: monospace;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}

.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  /* padding: 1rem; */
}
</style>
