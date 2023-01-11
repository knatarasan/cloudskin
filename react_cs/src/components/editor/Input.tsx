import { InputHTMLAttributes, ReactElement } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    dataPath: string;
    onDataChange: (dataPath: string, newValue: number | string | boolean) => void;
}

const Input = (props: InputProps): ReactElement => {
    // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     onDataChange(dataPath, event.target.value);
    // };

    return (
        <>
            <label htmlFor={"input-" + props.dataPath}>{props.label}:</label>
            <input
                key={"input-" + props.dataPath}
                id={"input-" + props.dataPath}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                data-object-path={props.dataPath}
                value={props.value}
                step={props.step}
                onChange={(event) => props.onDataChange(props.dataPath, event.target.value)}
            />
        </>
    )
}

export default Input