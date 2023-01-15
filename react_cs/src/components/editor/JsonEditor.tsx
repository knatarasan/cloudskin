import React, { ReactElement } from 'react'
import {
    cloneDeep,
    get,
    set
} from "lodash";
import Input from './Input';
import { useImmer } from "use-immer";
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import { nanoid } from "nanoid"

type JsonEditorProps = {
    readonly schema: any,
    data?: any,
}


const JsonEditor = ({ schema, data }: JsonEditorProps): ReactElement => {

    const [dataObj, setDataObj] = useImmer<any>(() => {
        // Insert missing values in the data with default values from schema 
        function initialize(parentPath: string, schema: any, clonedData: any) {
            for (var elem in schema) {
                var dataPath = (parentPath ? `${parentPath}.${elem}` : elem);
                var elemDef = schema[elem];
                var inputType = elemDef['type'].toLowerCase()

                if (inputType === 'object') {
                    initialize(dataPath, elemDef['properties'], clonedData);
                }
                else if (get(clonedData, dataPath) === undefined) {
                    if (elemDef['default']) {
                        set(clonedData, dataPath, elemDef['default'])
                    }
                    else {
                        switch (inputType) {
                            case 'string':
                                set(clonedData, dataPath, "");
                                break;
                            case 'number':
                            case 'integer':
                                set(clonedData, dataPath, 0);
                                break;
                            case 'boolean':
                                set(clonedData, dataPath, "false");
                                break;
                        }
                    }
                }
            }
            return clonedData;
        }
        console.log(cloneDeep(data));
        var clone = initialize('', schema['properties'], cloneDeep(data));
        console.log(clone);
        return clone;
    });

    const onChange = (dataPath: string, newValue: number | string | boolean) => {
        setDataObj((draft: any) => {
            set(draft, dataPath, newValue);
        });
    };


    function recursiveParseJson(parentPath: string, schemaFragment: any, data: any, onChange: (dataPath: string, newValue: number | string | boolean) => void) {
        var htmlElements: ReactElement[] = [];

        for (var elem in schemaFragment) {
            var dataPath = (parentPath ? `${parentPath}.${elem}` : elem);
            var elemDef = schemaFragment[elem];

            // console.log(elem + ' - ' + elemDef);
            // console.log(dataPath);

            var inputType = elemDef['type'].toLowerCase()
            switch (inputType) {
                case 'object':
                    var childHTMLElems = recursiveParseJson(dataPath, elemDef['properties'], dataObj, onChange);
                    htmlElements = htmlElements.concat(<li key={`li-${elem}`}>{elem}{childHTMLElems}</li>);
                    break;
                case 'string':
                    if (elemDef['options']) {
                        htmlElements.push(
                            <li key={`tr-${elem}`}>
                                <SelectInput
                                    name={elem}
                                    label={elem}
                                    value={get(data, dataPath, elemDef['default'])}
                                    options={elemDef['options'].map(
                                        (option: [number, string]) => {
                                            return {
                                                id: option[0],
                                                label: option[1],
                                                value: option[0]
                                            }
                                        }
                                    )}
                                    dataPath={dataPath}
                                    onDataChange={onChange}
                                />
                            </li>
                        );
                    }
                    else {
                        htmlElements.push(
                            <li key={`tr-${elem}`}>
                                <Input
                                    name={elem}
                                    label={elem}
                                    type={elemDef['format'] === 'date' ? 'date' : 'text'}
                                    value={get(data, dataPath, elemDef['default'])}
                                    dataPath={dataPath}
                                    onDataChange={onChange}
                                />
                            </li>
                        );
                    }
                    break;
                case 'number':
                case 'integer':
                    htmlElements.push(
                        <li key={`tr-${elem}`}>
                            <Input
                                name={elem}
                                label={elem}
                                type='number'
                                step={inputType === 'integer' ? 1 : 0.01}
                                value={get(data, dataPath, elemDef['default'])}
                                dataPath={dataPath}
                                onDataChange={onChange}
                            />
                        </li>
                    );
                    break;
                case 'boolean':
                    htmlElements.push(
                        <li key={`tr-${elem}`}>
                            <RadioInput
                                name={elem}
                                label={elem}
                                type='radio'
                                value={get(data, dataPath, elemDef['default'])}
                                options={[{ label: 'Yes', value: "true" }, { label: 'No', value: "false" }]}
                                dataPath={dataPath}
                                onDataChange={onChange}
                            />
                        </li>
                    );
                    break;
            }

            // if (elemDef['type'].toLowerCase() === 'object') {
            //     console.log(elemDef['type']);
            //     var childHTMLElems = recursiveParseJson(dataPath, elemDef['properties'], dataObj, onChange);
            //     htmlElements = htmlElements.concat(childHTMLElems);
            // }
            // else {
            //     htmlElements.push(
            //         <tr key={`tr-${elem}`}>
            //             <td>
            //                 <Input dataPath={dataPath} name={elem} label={elem} value={elemDef['default']} onDataChange={onChange} />
            //             </td>
            //         </tr>
            //     );
            // }
        }

        return (
            <ul>{htmlElements}</ul>
        );
    }

    var elems = recursiveParseJson('', schema['properties'], dataObj, onChange)

    return (
        <>
            {elems}
            {JSON.stringify(dataObj)}
        </>
    )
}

export default JsonEditor