
1. To set httpOnly cookie make sure the following
   - At `settings.py` </br>
        `CORS_ALLOW_CREDENTIALS = True`
   - While making request from axios make sure it has `withCredentials`
```js
    const authAxios = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
        headers: {}
    });
```

```mermaid
sequenceDiagram
    actor user
    user->>Server: /token POST { username:'Bob', password:'Bobs_secret' } can I get access token    
    Server-->>user: Let me check { access token }  and httpOnly cookie :  refresh token
    user->>Server: /plan GET { access token } :  can I get protected resource  
    activate Server 
    Server-->>user:  { access token } => [ user_id , user_name , email] here is list of plans 
    user->>Server: Thx 
    deactivate Server
    Note left of Server: 5 min Gap
    user->>Server: /plan GET { access token } :  can I get protected resource
    activate Server 
    Server-->>user:  { access token } 401 your access token expired 
    user->>Server: /token/refresh POST { refresh token } httpOnly cookie
    Server-->>user: Let me check , { access token }  and httpOnly cookie :  refresh token
    
    user->>Server: /plan GET { access token } :  can I get protected resource  
    activate Server 
    Server-->>user:  { access token } => [ user_id , user_name , email] here is list of plans 
    user->>Server: Thx 
    deactivate Server
```

Login flow:

```mermaid
graph TD;
  A[Login] --> B[AuthService];
  B --> C[TokenService];
  C -. Local Storage is added .-> B;
  B -. Context is Set .-> A;
```

Login.tsx -->  auth.service.ts --> token.service.ts (localStorage is added)
