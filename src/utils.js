// Currently running on local Judge0 compiler API for fast feedback
// Will use Jdoodle API later.
// Function to run code on Judge0
export default async function runCodeOnJudge0(input_code, input, selected_language) {
  try {
    const apiUrl = 'http://192.168.1.108:2358/submissions?wait=true'

    const requestBody = {
      source_code: input_code,
      language_id: selected_language.id,
      stdin: input // Optional standard input for the code

      // TODO: expected_output is not availble on Jdoodle, will need to be removed
      // expected_output: output // Optional expected output for the code
    }

    // Make a POST request to the Judge0 API to submit the code
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    // Return the submission status and result
    return await response.json()
  } catch (error) {
    // Handle any errors that may occur during the API call
    console.error('Error:', error.message)
  }
}
