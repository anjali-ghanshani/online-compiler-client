<script setup>
import { ref, computed } from 'vue'
import runCodeOnJudge0 from '../utils/code_executor'
import { questionBank } from '../data/questionBank.js'
import { languageMetadata } from '../data/languageMetadata.js'
import { Codemirror } from 'vue-codemirror'

const codeFromBox = ref('')
const output = ref(null)
const i = defineProps(['currentIndex'])
const emit = defineEmits(['totalScoreEmit'])
const test = ref(questionBank)
const count = ref(0)
const userInput = ref(null)
const userOutput = ref(null)
const totalScore = ref(0)

const submit = () => {
  totalScore.value = 0
  codeFromBox.value = ''
  count.value = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (test.value[i].testcase[j].testResult === null)
        return console.log('please attempt all 5 questions!')
      if (test.value[i].testcase[j].testResult === 1) totalScore.value++
    }
  }
  emit('totalScoreEmit', totalScore.value)
}
const testList = computed(() => test.value[i.currentIndex - 1].testcase)
const languages = ref(languageMetadata)
const selectedLangauge = ref({
  id: 71,
  name: 'Python (3.8.1)',
  language_code: 'python3',
  version_index: 4
}) // Default selected language in dropdown

const runCodeForUserInput = () => {
  console.log(userInput.value)
  runCodeOnJudge0(codeFromBox.value, userInput.value, selectedLangauge.value)
    .then((result) => {
      userOutput.value = result.output
      console.log(userOutput.value)
    })
    .catch((error) => {
      console.log('Error:', error.message)
    })
}

const runCodeForTestcaseInput = () => {
  count.value = 0

  for (let i = 0; i <= 4; i++) {
    runCodeOnJudge0(codeFromBox.value, testList.value[i].input, selectedLangauge.value)
      .then((result) => {
        console.log('Submission Result:', result)
        output.value = result.output
        if (output.value === testList.value[i].output) {
          testList.value[i].testResult = 1
          count.value++
        } else testList.value[i].testResult = 0

        console.log('testResult value', testList.value[i].testResult)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }
  console.log(test.value)
  console.log(totalScore.value)
}
</script>

<template>
  <div class="code-section">
    <select class="select-lang" v-model="selectedLangauge">
      <option v-for="language in languages" :key="language" :value="language">
        {{ language.name }}
      </option>
    </select>
    <div class="code-heading">Your Solution</div>
    <div class="line">
      <hr />
    </div>

    <codemirror
      v-model="codeFromBox"
      placeholder="Code goes here..."
      :style="{
        height: '300px',
        color: 'white',
        fontSize: '15px',
        fontFamily: 'monospace',
        backgroundColor: 'black'
      }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
    />
    <div class="line">
      <hr />
    </div>
    <div class="run-code-user-input">
      <label for="user-input">provide input: </label>
      <input id="user-input" type="text" v-model="userInput" />
      <button @click="runCodeForUserInput">run</button>
      <div class="output-for-user-input">
        output:
        <div class="output">
          {{ userOutput }}
        </div>
      </div>
    </div>

    <div class="count-passing-testcase">{{ count }} / 5 Testcases passed for this question!</div>

    <div class="run-n-submit">
      <div>
        <button class="code-sectn-btn" @click="runCodeForTestcaseInput">Run Tests</button>
      </div>
      <div>
        <button class="code-sectn-btn" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-lang {
  background-color: #f5e12d;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;
}
.code-sectn-btn {
  text-decoration: none;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);

  border-radius: 10px;
  font-size: 20px;
  color: black;
  background-color: #f5e12d;
  border: 2px solid black;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 1rem;
}

.code-section {
  padding: 1rem;
  background-color: #505050;
  margin: 2rem 1rem;
  border: 3px solid black;
  border-radius: 1.25rem;
  width: 60em;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
}
.code-heading {
  font-size: 30px;
  font-weight: bold;
  margin: 1rem 0;
  color: white;
  text-align: center;
}

.run-n-submit {
  display: flex;
  justify-content: space-between;
}
.output-for-user-input {
  margin-top: 1rem;
}

.count-passing-testcase {
  font-size: 0.8rem;
  color: #ccc;
}

#user-input {
  height: 1rem;
  margin-right: 0.5rem;
}
.run-code-user-input {
  margin: 1rem 0;
  color: #ccc;
  font-weight: 800;
}

.run-code-user-input .output {
  font-style: oblique;
  color: #3aac30;
}
</style>
