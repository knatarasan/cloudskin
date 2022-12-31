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

// export async function createPlan(data) {
//   const plan_obj = { 
//     plan: data,
//     name:'unnammed',
//     deploy_status:'not deployed',
//     running_status:'NA',

//   };
//   // const username = "admin";
//   // const password = "admin";
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//       // 'Authorization': 'Bearer ' + currentUser.tokenAccess
//     },
//     body: JSON.stringify(plan_obj),
//   };
//   // fetch call is made with data object , but react takes care adding owner_id: 2
//   console.log("request Options ", requestOptions);
//   const response = await fetch("/plan/", requestOptions);
//   console.log("response", response);
//   return await response.json();
// }

export async function createUser(data) {
  const username = "admin";
  const password = "admin";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/user/", requestOptions);
  // console.log("response", response);
  return await response.json();
}

export async function updatePlan(data, plan_id) {
  data = { plan: data };
  console.log("updatePlan ", data);
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
  const response = await fetch("/plan/".concat(plan_id, "/"), requestOptions);
  return await response.json();
}
