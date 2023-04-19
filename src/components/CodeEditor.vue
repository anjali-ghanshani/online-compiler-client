<script setup>
import { ref, computed, reactive } from 'vue'
import runCodeOnJudge0 from '../utils'
import { questionBank } from '../data/questionBank.js'
import { languageMetadata } from '../data/languageMetadata.js'

const questions = reactive(questionBank)
const codeFromBox = ref('')
const output = ref(null)
const test = defineProps(['test'])

const languages = ref(languageMetadata)
const selectedLangauge = ref({
  id: 71,
  name: 'Python (3.8.1)',
  language_code: 'python3',
  version_index: 4
}) // Default selected language in dropdown

console.log('testing this:', test.test)
const runCode = () => {
  for (let i = 0; i <= test.test.length - 1; i++) {
    runCodeOnJudge0(codeFromBox.value, test.test[i].input, selectedLangauge.value)
      .then((result) => {
        console.log('Submission Result:', result)
        output.value = result.stdout
        console.log(output.value)
        console.log(test.test[i])
        if (output.value === test.test[i].output) {
          test.test[i].testResult = 'PASS'
          console.log('pass')
        } else test.test[i].testResult = 'Fail'
        console.log('testResult value', test.test[i].testResult)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }
}
</script>

<template>
  <div class="code-section">
    <!-- <div v-for="language in languages"> {{ language.id }} - {{ language.language_code }}  </div> -->
    <select v-model="selectedLangauge">
      <option v-for="language in languages" :key="language" :value="language">
        {{ language.name }}
      </option>
    </select>
    <div class="code-heading">Code Here...</div>
    <div class="line">
      <hr />
    </div>

    <textarea
      id="inputCode"
      class="code-mirror"
      rows="15"
      cols="100"
      placeholder="your code goes here"
      v-model="codeFromBox"
    />

    <div class="line">
      <hr />
    </div>

    <div class="run-n-submit">
      <div>
        <button class="code-sectn-btn" @click="runCode">Run</button>
      </div>
      <div>
        <button class="code-sectn-btn">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-sectn-btn {
  border-radius: 10px;
  font-size: 20px;
  color: #91ccff;
  background-color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 1rem;
}

.code-mirror {
  background-attachment: local;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);
  line-height: 31px;
  padding: 8px 10px;
}

.code-section {
  padding: 1rem;
  background-color: #002244;
  margin: 2rem;
  border: 3px solid black;
  border-radius: 1.25rem;
  width: 100%;
}
.code-heading {
  font-size: 30px;
  font-weight: bold;
  margin: 2rem;
  color: white;
}

.run-n-submit {
  display: flex;
  justify-content: space-around;
}
</style>
