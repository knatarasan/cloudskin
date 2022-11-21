export async function createGraph(data) {
    data = {"graph":data}
    console.log('data ',data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    
    fetch('/graphs/', requestOptions)
        .then(response => response.json());

}