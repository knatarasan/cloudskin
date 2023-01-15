import { InputHTMLAttributes, OptionHTMLAttributes, ReactElement } from "react";

interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    options: ReadonlyArray<OptionHTMLAttributes<HTMLOptionElement>>;
    dataPath: string;
    onDataChange: (dataPath: string, newValue: number | string | boolean) => void;
}

const SelectInput = (props: SelectInputProps): ReactElement => {

    return (
        <>
            <label htmlFor={props.id}>{props.label}:</label>
            <select
                key={"select-" + props.dataPath}
                id={"select-" + props.dataPath}
                value={props.value}
                data-object-path={props.dataPath}
                onChange={(event) => props.onDataChange(props.dataPath, event.target.value)}
            >
                {props.options.map((option, index) => {
                    return (
                        <option
                            key={"select-option-" + props.dataPath + "-" + option.value}
                            id={"select-option-" + props.dataPath + "-" + option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    )
                }
                )};
            </select>
        </>
    )
}

export default SelectInput