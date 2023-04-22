<script setup>
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'

const result = defineProps(['score'])
</script>

<template>
  <div class="modal">
    <div class="modal_title">Your Score</div>
    <div class="modal_text">{{result.score}}/25</div>
    <div>{{result.score}} testcases passed out of 25</div>
    <RouterLink to="/">
      <button class="modal_btn">Go Back &rarr;</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.modal_btn {
  text-decoration: none;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);

  border-radius: 10px;
  font-size: 20px;
  color: black;
  background-color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 1rem;
}

.modal {
  padding: 1rem;
  border: 3px solid black;
  border-radius: 1.25rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);

  flex-direction: row;
  text-align: center;
  justify-content: center;
  margin: auto;
}

.modal_text {
  font-size: 100px;
  font-weight: 600;
  margin-bottom: 3rem;
}
.modal_title {
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 5rem;
}
</style>
