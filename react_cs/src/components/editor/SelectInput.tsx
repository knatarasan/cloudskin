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
            <select id={props.id} onChange={(event) => console.log(event.target.value)}>
                {props.options.map((option, index) => {
                    return (
                        <option
                            value={option.value}
                            selected={option.selected}
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