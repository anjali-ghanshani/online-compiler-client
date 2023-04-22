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
  'currentQuesOutputFormat',
  'questionStatus',
  'barPercentage'
])
</script>

<template>
  <div class="question">
    <div class="heading">
      <button class="question-btn" @click="previousQuestion">&lArr;</button>
      <h1>Question {{ currentIndex }}</h1>
      <button class="question-btn" @click="nextQuestion">&rArr;</button>
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
      <div class="progress">

        <h4>Question {{questionStatus}}</h4>
        <div class="bar">
            <div class="completion" :style="{width: barPercentage}"></div>
        </div>
      </div>

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
  position: relative;
  color: white;
  padding: 1rem;
  background-color: #505050;
  margin: 2rem;
  border: 3px solid black;
  border-radius: 1.25rem;
  width: 50rem;
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
  border: 2px solid black;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.5);
}

.line {
  background: black;
  margin: 1rem 0;
}
.progress {
  text-align: center;
  position: absolute;
  bottom: 20px;
  width: 90%;

}

        .bar {
        /* width: 300px; */
        height: 26px;
        border: 2px solid white;
        border-radius: 1rem 
    }

    .completion {
        height: 100%;
        width: 0%;
        background-color: white;
        border-radius: 1rem 

    }

</style>
