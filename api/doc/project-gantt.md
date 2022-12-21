

```mermaid
gantt
    title cloudskin v1
    dateFormat  YYYY-MM-DD
    axisFormat %Y-%m

    
section api                       
    aws instances   :done, a1, 2022-12-10, 10d
    authentication  :active, after a1  , 5d

section ui-react
    customer facing UI      :crit, done, 2022-12-22  , 3d
    UI testing              : 4d
```

[To build Gantt chart](https://mermaid.js.org/syntax/gantt.html)