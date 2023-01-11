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
                    <span key={"div-input-" + props.dataPath + "-" + option.value}>
                        <label htmlFor={"radio-input-" + props.dataPath + "-" + option.value}>
                            <input
                                key={"radio-input-" + props.dataPath + "-" + option.value}
                                id={"radio-input-" + props.dataPath + "-" + option.value}
                                type="radio"
                                name={props.name}
                                data-object-path={props.dataPath}
                                value={option.value}
                                checked={option.value === props.value}
                                onChange={(event) => props.onDataChange(props.dataPath, event.target.value)}
                            />
                            {option.label}
                        </label>
                    </span>
                )
            }
            )}
        </>
    )
}

export default RadioInput