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
            <label htmlFor={props.name}>{props.label}:</label>
            <input
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                step={props.step}
                onChange={(event) => props.onDataChange(props.dataPath, event.target.value)}
            />
        </>
    )
}

export default Input