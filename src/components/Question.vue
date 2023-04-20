<script setup>
const {
  currentIndex,
  currentQuestion,
  nextQuestion,
  previousQuestion,
  currentQuesInputFormat,
  currentQuesOutputFormat
} = defineProps([
  'currentIndex',
  'currentQuestion',
  'nextQuestion',
  'previousQuestion',
  'currentQuesInputFormat',
  'currentQuesOutputFormat'
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
      <br />
      <div class="question-text">{{ currentQuestion }}</div>
      <br />
    </div>
    <div>
      <hr />
      <br />
      <div class="question-input-output">Input Format:</div>
      <div>{{ currentQuesInputFormat }}</div>
      <br />
    </div>
    <div>
      <hr />
      <br />
      <div class="question-input-output">Output Format:</div>
      <div>{{ currentQuesOutputFormat }}</div>
      <br />
    </div>
  </div>
</template>

<style scoped>
.question-input-output {
  font-weight: 900;
}
.heading {
  color: white;
  display: flex;
  justify-content: space-between;
}

.question {
  color: white;
  padding: 1rem;
  background-color: #505050;
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
  height: 52px;
  width: 52px;
  background-color: white;
  color: black;
  margin: 0.5rem 1rem;
  cursor: pointer;
  border: none;
}

.line {
  background: black;
  margin: 1rem 0;
}
</style>
