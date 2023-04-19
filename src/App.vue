<script setup>
import { reactive , ref , computed} from 'vue';
import { questionBank } from "./data/questionBank.js"
import './assets/main.css'
import Code from './components/Code.vue'


const questions = reactive(questionBank)
const currentId = ref(0)
// const codeFromBox = ref("")
const test = computed(() => questions[currentId.value].testcase)


// Define a computed property to get the current item
const currentIndex = computed(() => questions[currentId.value].id)
const currentQuestion = computed(() => questions[currentId.value].question)

const nextQuestion = () => {
  if (currentId.value < questions.length - 1) {
    currentId.value++;
  }
};

const previousQuestion = () => {
  if (currentId.value > 0) {
    currentId.value--;
  }
};

</script>

<template>
  
  <div class="container">
    <div class="question">
      <div class="heading">
        <button class="question-btn" @click="previousQuestion">
          Prev
        </button>
        <h1>Question {{ currentIndex }}</h1>
        <button class="question-btn" @click="nextQuestion">Next</button>
      </div>
            <div class="line">
              <hr>
            </div>
      <div>
        <div class="question-text">{{ currentQuestion }}</div>

      </div>

    </div>
    <Code :test="test"/>
    <!-- <div class="code-section">
              <div class="code-heading">Code Here...</div>
              <div class="line">
                <hr>
              </div>


      <textarea id="inputCode" 
                  class="code-mirror" 
                  rows="15" 
                  cols="100" 
                  placeholder="your code goes here" 
                  v-model="codeFromBox"
      />

      <div class="line">
        <hr>
      </div>

      <div class="run-n-submit">
      <div>
        <button class="code-sectn-btn" @click="runCode">Run</button>
      </div>
      <div>
        <button class="code-sectn-btn">Submit</button>
      </div>
      </div>
    </div> -->

    <!-- <div>
      <h3>Testcases</h3>
      <div v-for="test in test" :key="test.id">
        input - > {{ test.input }}
        | output - > {{ test.output}} | result -> {{ test.testResult }}
      </div>
    </div> -->

  </div>

</template>


<style scoped>


  .container {
    display: flex;
    background-color: #8DA399;
    height: 100vh;
    width: 100vw;
    padding: 1rem;
  }

  .heading {
    display: flex;
    justify-content: space-between;
  }

  .question {
    padding: 1rem;
    background-color: #76ABDF;
    margin: 2rem;
    border:  3px solid black;
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
    background-image:
        linear-gradient(to right, white 10px, transparent 10px),
        linear-gradient(to left, white 10px, transparent 10px),
        repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);
    line-height: 31px;
    padding: 8px 10px; 
  }

  .code-section {
   padding: 1rem;
   background-color: #002244;;
   margin: 2rem;
   border:  3px solid black;
   border-radius: 1.25rem;
   width: 100%;
  }
  .code-heading {
       font-size: 30px;
       font-weight: bold;
       margin: 2rem;
       color: white

  }

  .run-n-submit {
    display: flex;
    justify-content: space-around;
  }

</style>