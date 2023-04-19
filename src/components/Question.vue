<script setup>
const { currentIndex, currentQuestion, nextQuestion, previousQuestion } = defineProps([
  'currentIndex',
  'currentQuestion',
  'nextQuestion',
  'previousQuestion'
])
</script>

<template>
  <div class="question">
    <div class="heading">
      <button class="question-btn" @click="previousQuestion">Prev</button>
      <h1>Question {{ currentIndex }}</h1>
      <button class="question-btn" @click="nextQuestion">Next</button>
    </div>
    <div class="line">
      <hr />
    </div>
    <div>
      <div class="question-text">{{ currentQuestion }}</div>
    </div>
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  justify-content: space-between;
}

.question {
  padding: 1rem;
  background-color: #76abdf;
  margin: 2rem;
  border: 3px solid black;
  border-radius: 1.25rem;
}

.question-text {
  font-size: 20px;
}

.question-btn {
  border-radius: 100%;
  font-size: 20px;
  height: 50px;
  width: 50px;
  background-color: white;
  color: #91ccff;
  margin: 0.5rem 1rem;
  cursor: pointer;
  border: none;
}

.line {
  background: black;
  margin: 1rem 0;
}
</style>
