<script setup>
import { RouterLink } from 'vue-router'
import { EditorState } from '@codemirror/state'
import { ref, computed, reactive } from 'vue'
import runCodeOnJudge0 from '../utils'
import { questionBank } from '../data/questionBank.js'
import { languageMetadata } from '../data/languageMetadata.js'
import { Codemirror } from 'vue-codemirror'

const questions = reactive(questionBank)
const codeFromBox = ref('')
const output = ref(null)
const test = defineProps(['test'])
const summary = ref([])
const count = ref(0)
const showTestCase = ref(false)
const userInput = ref(null)
const userOutput = ref(null)

// const submit = () => {
//     codeFromBox = ''
//     summary.value =[]
//     count = 0
//     showTestCase.value = false
// }

const languages = ref(languageMetadata)
const selectedLangauge = ref({
  id: 71,
  name: 'Python (3.8.1)',
  language_code: 'python3',
  version_index: 4
}) // Default selected language in dropdown

//
const runCodeForUserInput = () => {
  console.log(userInput.value)
  runCodeOnJudge0(codeFromBox.value, userInput.value, selectedLangauge.value)
    .then((result) => {
      userOutput.value = result.stdout
      console.log(userOutput.value)
    })
    .catch((error) => {
      console.log('Error:', error.message)
    })
}

const runCodeForTestcaseInput = () => {
  summary.value = []
  count.value = 0
  showTestCase.value = false
  for (let i = 0; i <= test.test.length - 1; i++) {
    runCodeOnJudge0(codeFromBox.value, test.test[i].input, selectedLangauge.value)
      .then((result) => {
        console.log('Submission Result:', result)
        output.value = result.stdout
        // console.log('output.value', output.value)
        // console.log('test.test[i]', test.test[i])
        if (output.value === test.test[i].output) {
          test.test[i].testResult = 'PASS'
          count.value++
          // console.log('pass')
        } else test.test[i].testResult = 'FAIL'
        // console.log('testResult value', test.test[i].testResult)
        summary.value.push(test.test[i].testResult)
        console.log('summary', summary.value)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }
  showTestCase.value = true
}
</script>

<template>
  <div class="code-section">
    <select v-model="selectedLangauge">
      <option v-for="language in languages" :key="language" :value="language">
        {{ language.name }}
      </option>
    </select>
    <div class="code-heading">Code Here...</div>
    <div class="line">
      <hr />
    </div>

    <codemirror
      v-model="codeFromBox"
      placeholder="Code goes here..."
      :style="{
        height: '400px',
        color: 'white',
        fontSize: '20px',
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

    <div v-if="showTestCase" class="count-passing-testcase">
      {{ count }} / 5 Testcases passed
      <!-- <div class="line">
        <hr />
      </div> -->
    </div>

    <div></div>
    <div class="run-n-submit">
      <div>
        <button class="code-sectn-btn" @click="runCodeForTestcaseInput">Run Testcases</button>
      </div>
      <!-- <div> -->
      <!-- <RouterLink class="code-sectn-btn" to="/">Submit</RouterLink> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
.code-sectn-btn {
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

.code-section {
  padding: 1rem;
  background-color: #505050;
  margin: 2rem;
  border: 3px solid black;
  border-radius: 1.25rem;
  width: 100%;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
}
.code-heading {
  font-size: 30px;
  font-weight: bold;
  margin: 2rem 0;
  color: white;
}

.run-n-submit {
  display: flex;
  justify-content: space-between;
}
.output-for-user-input {
  margin-top: 1rem;
}

.count-passing-testcase {
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
