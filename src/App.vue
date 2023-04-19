<script setup>
import { reactive , ref , computed} from 'vue';
import { questionBank } from "./data/questionBank.js"
import './assets/main.css'

const questions = reactive(questionBank)
const currentId = ref(0)
const codeFromBox = ref("")
const output = ref(null)

// Define a computed property to get the current item
const currentIndex = computed(() => questions[currentId.value].id)
const currentQuestion = computed(() => questions[currentId.value].question)
const test = computed(() => questions[currentId.value].testcase)

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

    // Return the data and methods to be used in the template
    function runCode() {

            // Currently running on local Judge0 compiler API for fast feedback
            // Will use Jdoodle API later.
            // Function to run code on Judge0
            async function runCodeOnJudge0(input_code, input, output) {
                try {
                    const apiUrl = 'http://192.168.1.108:2358/submissions?wait=true';

                    const requestBody = {
                        source_code: input_code,
                        language_id: 71, // Specify the language ID (e.g., 71 for Python)
                        stdin: input, // Optional standard input for the code
                        
                        // TODO: expected_output is not availble on Jdoodle, will need to be removed
                        expected_output: output, // Optional expected output for the code
                    };

                    // Make a POST request to the Judge0 API to submit the code
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });

                    // Return the submission status and result
                    return await response.json();
                } catch (error) {
                    // Handle any errors that may occur during the API call
                    console.error('Error:', error.message);
                }
            }
            console.log(test.value[0].testResult)
            for (let i=0 ; i<= test.value.length - 1; i++) {
              runCodeOnJudge0(codeFromBox.value, test.value[i].input, test.value[i].output,test.value[i].testResult)
                    .then(result => {
                      console.log('Submission Result:', result);
                      output.value = result.stdout
                      console.log(output.value)
                      if (output.value === test.value[i].output) {
                        test.value[i].testResult = "PASS"
                        console.log("pass")
                      }
                      else test.value[i].testResult = "Fail"
                      console.log('testResult value', test.value[i].testResult);

                    })
                    .catch(error => {
                      console.error('Error:', error.message);
                    }); 
            }
        }

</script>

<template>
  
  <div class="container">
    
    <header>
      <h1>Compile App</h1>
    </header>

    <div class="question">
      <h2>{{ currentIndex }}. {{ currentQuestion }}</h2>
      <button class="question-btn" @click="previousQuestion">Prev</button>
      <button class="question-btn" @click="nextQuestion">Next</button>
    </div>

    <div>
      <textarea id="inputCode" 
                  class="code-mirror" 
                  rows="20" 
                  cols="100" 
                  placeholder="your code goes here" 
                  v-model="codeFromBox"
                  />
      <button class="run-btn" @click="runCode">Run</button>
    </div>

    <div>
      <h3>Testcases</h3>
      <div v-for="test in test" :key="test.id">
        input - > {{ test.input }}
        | output - > {{ test.output}} | result -> {{ test.testResult }}
      </div>
    </div>

  </div>

</template>


<style scoped>
  .container {
    background-color: #91ccff;
    height: 100vh;
    width: 100vw;
    padding: 1rem
  }

  header {
    display: flex;
    align-items: center;
  }

  .question-btn {
    border-radius: 100%;
    height: 50px;
    width: 50px;
    background-color: black;
    color: #91ccff;
  }

  .run-btn {
    border-radius: 5px;
    color: #91ccff;
    background-color: black;
  }

  .code-mirror {
    margin-top: 10px;
  }

  .code-mirror {
    border-radius: 5px;
    background-color: rgb(230, 230, 230);
  }

</style>