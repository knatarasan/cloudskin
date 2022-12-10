export async function createInstance() {
  const data = { ec2_instance_id: "not determined" };
  const username = "admin";
  const password = "admin";
  console.log("before request options");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: JSON.stringify(data),
  };
  console.log("requestOptions", JSON.stringify(requestOptions));
  let response = await fetch("/ec2/", requestOptions);
  response = await response.json();
  console.log("Response", response);
  return response;
}

// export const displayHealth = (data) => {
//   // fetch(`http://127.0.0.1:8000/ec2/${id}`)
//   //   .then((response) => response.json())
//   //   .then((response) => console.log("RESPONSE", response));
//   console.log('data',data['ec2_instance_health'])
// };

// export async function getHealth() {

// }

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
  const response = await fetch("/graph/", requestOptions);
  console.log("response", response);
  return await response.json();
}

export async function updateGraph(data, graph_id) {
  data = { graph: data };
  console.log("updateGraph ", data);
  const username = "admin";
  const password = "admin";
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    "/graphs/".concat(graph_id, "/"),
    requestOptions
  );
  return await response.json();
}
