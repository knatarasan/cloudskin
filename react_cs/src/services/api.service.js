export async function createGraph(data) {
  data = { graph: data };
  const username = "admin";
  const password = "admin";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },

    body: JSON.stringify(data),
  };
    // fetch call is made with data object , but react takes care adding owner_id: 2

  const response = await fetch("/graphs/", requestOptions)
  console.log("response", response)
  return await response.json()
}

export async function updateGraph(data) {
  data = { graph: data }
  const username = "admin"
  const password = "admin"
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`)
    },
    body: JSON.stringify(data)
  };
  const response = await fetch("/graphs/", requestOptions)
  return await response.json()
}