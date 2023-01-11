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
            <span
                key={"title-" + props.dataPath}
                id={"title-" + props.dataPath}
            >
                {props.name}:
            </span>
            {props.options.map((option, index) => {
                console.log(props.id + "-" + option.value)
                return (
                    <>
                        <input
                            key={"radio-input-" + props.dataPath + "-" + option.value}
                            id={"radio-input-" + props.dataPath + "-" + option.value}
                            type="radio"
                            name={props.name}
                            data-object-path={props.dataPath}
                            value={option.value}
                            // checked={props.value === option.selected}
                            onChange={(event) => props.onDataChange(props.dataPath, event.target.value)}
                        />
                        <label
                            key={"label-" + props.dataPath + "-" + option.value}
                            id={"label-" + props.dataPath + "-" + option.value}
                            htmlFor={"radio-input-" + props.dataPath + "-" + option.value}
                        >
                            {option.label}
                        </label>
                    </>
                )
            }
            )}
        </>
    )
}

export default RadioInput