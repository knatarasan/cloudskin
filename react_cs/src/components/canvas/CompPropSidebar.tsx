import { useState } from "react"
import { authAxios } from "../auth/AuthServiceAxios";

const CompPropSidebar = ({ node }: any) => {
    const apiObject = node.api_object
    const [instanceType, setInstanceType] = useState(apiObject)

    const handleChange = (e: any) => {
        instanceType[e.target.name] = e.target.value
    };

    const handleSubmit = (e: any) => {
        authAxios.put(`/ec2/${instanceType.id}`, instanceType)
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