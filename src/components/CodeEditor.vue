<script setup>
import { ref, computed, reactive } from 'vue'
import runCodeOnJudge0 from '../utils'
import { questionBank } from '../data/questionBank.js'

const questions = reactive(questionBank)
const codeFromBox = ref('')
const output = ref(null)
const test = defineProps(['test'])
const summary = ref([])
const count = ref(0)
const showTestCase = ref(false)


const submit = () => {
    codeFromBox = ''
    summary.value =[]
    count = 0
    showTestCase.value = false
}

const runCode = () => {
  summary.value = []
  count.value = 0
  showTestCase.value = false
  for (let i = 0; i <= test.test.length - 1; i++) {
    runCodeOnJudge0(
      codeFromBox.value,
      test.test[i].input,
      test.test[i].output,
      test.test[i].testResult
    )
      .then((result) => {
        // console.log('Submission Result:', result)
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
    <br />
    <div v-if="showTestCase" class="count-passing-testcase">{{ count }} / 5 Testcases passed
      
    </div>
    <br />
    <div class="line">
      <hr />
    </div>
    <div></div>
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
  color: #002244;
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
  justify-content: space-between;
  }

.count-passing-testcase {
  color: #ccc;
}
</style>
