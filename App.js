import { questionBank, testcases } from "./questionBank.js"
// console.log(questions[0])

const app = Vue.createApp({

    data() {
        return {
            questions: questionBank,
            currentQuestionIndex: 0,
            output: null,
            codeFromBox: null,
            testcases: testcases,
            flag: 'false',
            trueFlagCount: 0
        }

    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        currentTestcaseSet() {
            let currentTestcaseSet = this.testcases[this.currentQuestionIndex]
            // console.log(currentTestcaseSet[0])
            return currentTestcaseSet
        }
    },
    methods: {
        previousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--
            }
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            }
        },
        runCode() {

            // Function to run code on Judge0
            async function runCodeOnJudge0(input_code, input, output) {
                try {
                    // Define the API endpoint for running code on Judge0
                    const apiUrl = 'http://192.168.1.107:2358/submissions?wait=true';

                    // Prepare the request body
                    const requestBody = {
                        source_code: input_code,
                        language_id: 71, // Specify the language ID (e.g., 71 for Python)
                        stdin: input, // Optional standard input for the code
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

            // Example usage: Call the function with the code to run on Judge0
            // for each value in the testcaseList the code will run on Judge0
            let testcaseList = this.testcases[this.currentQuestionIndex]
            for (let i = 0; i <= testcaseList.length - 1; i++) {
                runCodeOnJudge0(this.codeFromBox, testcaseList[i].input, testcaseList[i].output)
                    .then(result => {
                        console.log('Submission Result:', result);

                        this.output = result.stdout
                        if (this.output === testcaseList[i].output) this.trueFlagCount++


                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                    });
            }


        }

    }
})

app.mount('#app')