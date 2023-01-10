import { InputHTMLAttributes, OptionHTMLAttributes, ReactElement } from "react";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    options: ReadonlyArray<OptionHTMLAttributes<HTMLOptionElement>>;
    dataPath: string;
    onDataChange: (dataPath: string, newValue: number | string | boolean) => void;
}

const RadioInput = (props: RadioInputProps): ReactElement => {

    return (
        <>
            <span>{props.name}:</span>
            {props.options.map((option, index) => {
                return (
                    <>
                        <input
                            id={option.id}
                            type="radio"
                            name={props.name}
                            value={option.value}
                            checked={option.selected}
                            onChange={(event) => props.onDataChange(props.dataPath, event.target.value)}
                        />
                        <label htmlFor={option.id}>{option.label}</label>
                    </>
                )
            }
            )};
        </>
    )
}

export default RadioInput