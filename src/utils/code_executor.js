export default async function runCodeonCompilerAPI(input_code, input, selected_language) {
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

    const response = await fetch(proxy + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    console.log('Req: ', requestBody)
    return await response.json()
  } catch (error) {
    console.error('Error:', error.message)
  }
}
