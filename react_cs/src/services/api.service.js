export async function createGraph(data) {
    data = {"graph":data}
    console.log('data ',data)
    const username= 'admin'
    const password= 'admin'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`) },
        
        body: JSON.stringify(data)
    };
    
    fetch('/graphs/', requestOptions)
        .then(response => response.json());

}