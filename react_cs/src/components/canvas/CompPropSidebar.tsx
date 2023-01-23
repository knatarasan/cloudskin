import { useState } from "react"
import { authAxios } from "../auth/AuthServiceAxios";

const CompPropSidebar = ({ node }: any) => {
    const [apiObject, setApiObject] = useState(node.api_object)

    const handleChange = (e: any) => {
        apiObject[e.target.name] = e.target.value
    };

    const handleSubmit = (e: any) => {
        const end_point = apiObject.aws_component;
        console.log('update call',`/${end_point}/${apiObject.id}`, apiObject);
        authAxios.put(`/${end_point}/${apiObject.id}`, apiObject)
            .then((response) => {
                console.log("AWS Comp updated", response.data.id)
                return response.data
            })
            .catch((error) => {
                console.log("AWS Comp not created", error.response.status)
            })
    }

    return (
        <>
            <div id='node_props'>
                <p><b>Properties of {node.label}</b></p>
                {Object.keys(apiObject).map((key) =>
                    <>
                    <label htmlFor={key}>{key}:</label>
                    <input type="text" name={key} placeholder={apiObject[key]} onChange={handleChange}></input><br /></>
                )}
            </div>
            <button type="submit" onClick={handleSubmit}>Save {node.label}</button>
        </>
    )
}

export default CompPropSidebar