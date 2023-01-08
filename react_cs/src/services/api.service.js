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
  const response = await fetch("/ec2/", requestOptions);
  console.log("Response", response);
  return await response.json();
}

export async function createUser(data) {
  const username = "admin";
  const password = "admin";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/user/", requestOptions);
  // console.log("response", response);
  return await response.json();
}
