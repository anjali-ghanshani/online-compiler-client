<script setup>
import { reactive, ref, computed } from 'vue'
import { questionBank } from '../data/questionBank.js'
import Code from '../components/CodeEditor.vue'
import Question from '../components/Question.vue'

const questions = reactive(questionBank)
const currentId = ref(0)

// Define a computed property to get the current item
const currentQuesInputFormat = computed(() => questions[currentId.value].input_format)
const currentQuesOutputFormat = computed(() => questions[currentId.value].output_format)
const currentIndex = computed(() => questions[currentId.value].id)
const currentQuestion = computed(() => questions[currentId.value].question)
const test = computed(() => questions[currentId.value].testcase)

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
</script>

<template>
  <Question
    :currentQuestion="currentQuestion"
    :currentIndex="currentIndex"
    :nextQuestion="nextQuestion"
    :previousQuestion="previousQuestion"
    :currentQuesInputFormat="currentQuesInputFormat"
    :currentQuesOutputFormat="currentQuesOutputFormat"
  />
  <Code :test="test" />
</template>

<style scoped></style>
