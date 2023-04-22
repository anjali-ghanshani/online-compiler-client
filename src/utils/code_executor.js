// Currently running on local Judge0 compiler API for fast feedback
// Will use Jdoodle API later.
// Function to run code on Judge0
export default async function runCodeOnJudge0(input_code, input, selected_language) {
  try {
    // Need temporary proxy to fix cors error
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://api.jdoodle.com/v1/execute/'

    const requestBody = {
      script: input_code,
      language: selected_language.language_code,
      versionIndex: selected_language.version_index,
      stdin: input,
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET
    }

    // Make a POST request to the Judge0 API to submit the code
    const response = await fetch(proxy + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    console.log('Req: ', requestBody)
    // Return the submission status and result
    return await response.json()
  } catch (error) {
    // Handle any errors that may occur during the API call
    console.error('Error:', error.message)
  }
}
