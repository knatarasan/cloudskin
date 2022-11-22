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

  const response = await fetch("/graphs/", requestOptions)

  return await response.json()
}
