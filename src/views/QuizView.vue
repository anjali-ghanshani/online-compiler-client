<script setup>
import { reactive, ref, computed } from 'vue'
import { questionBank } from '../data/questionBank.js'
import CodeEditor from '../components/CodeEditor.vue'
import Question from '../components/Question.vue'
import Result from '../components/Result.vue'

const questions = reactive(questionBank)
const currentId = ref(0)
const showResult = ref(false)
let score = 0
const currentQuesInputFormat = computed(() => questions[currentId.value].input_format)
const currentQuesOutputFormat = computed(() => questions[currentId.value].output_format)
const currentIndex = computed(() => questions[currentId.value].id)
const currentQuestion = computed(() => questions[currentId.value].question)

const questionStatus = computed(() => `${currentId.value}/5`)
const barPercentage = computed(() => `${(currentId.value / 5) * 100}%`)

const nextQuestion = () => {
  if (currentId.value < questions.length - 1) {
    currentId.value++
  }
}

const previousQuestion = () => {
  if (currentId.value > 0) {
    currentId.value--
  }
}

const showResultFunction = (totalScore) => {
  console.log(totalScore)
  score = totalScore
  showResult.value = true
}
</script>

<template>
  <Question
    v-if="!showResult"
    :currentQuestion="currentQuestion"
    :currentIndex="currentIndex"
    :nextQuestion="nextQuestion"
    :previousQuestion="previousQuestion"
    :currentQuesInputFormat="currentQuesInputFormat"
    :currentQuesOutputFormat="currentQuesOutputFormat"
    :questionStatus="questionStatus"
    :barPercentage="barPercentage"
  />
  <CodeEditor
    v-if="!showResult"
    :currentIndex="currentIndex"
    @totalScoreEmit="showResultFunction"
  />

  <Result v-else :score="score" />
</template>

<style scoped></style>
