import React, { ReactElement } from 'react'
import {
    set
} from "lodash";
import Input from './Input';
import { useImmer } from "use-immer";
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';


type JsonEditorProps = {
    readonly schema: any,
    data?: any,
}


const JsonEditor = ({ schema, data }: JsonEditorProps): ReactElement => {

    const [dataObj, setDataObj] = useImmer<any>(data);

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
            console.log(elem + ' - ' + elemDef);
            console.log(dataPath);


            var inputType = elemDef['type'].toLowerCase()
            switch (inputType) {
                case 'object':
                    var childHTMLElems = recursiveParseJson(dataPath, elemDef['properties'], dataObj, onChange);
                    htmlElements = htmlElements.concat(childHTMLElems);
                    break;
                case 'string':
                    if (elemDef['enum']) {
                        htmlElements.push(
                            <tr key={`tr-${elem}`}>
                                <td>
                                    <SelectInput
                                        name={elem}
                                        label={elem}
                                        value={elemDef['default']}
                                        options={elemDef['enum'].map(
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
                                </td>
                            </tr>
                        );
                    }
                    else {
                        htmlElements.push(
                            <tr key={`tr-${elem}`}>
                                <td>
                                    <Input
                                        name={elem}
                                        label={elem}
                                        type={elemDef['format'] === 'date' ? 'date' : 'text'}
                                        value={elemDef['default']}
                                        dataPath={dataPath}
                                        onDataChange={onChange}
                                    />
                                </td>
                            </tr>
                        );
                    }
                    break;
                case 'number':
                case 'integer':
                    htmlElements.push(
                        <tr key={`tr-${elem}`}>
                            <td>
                                <Input
                                    name={elem}
                                    label={elem}
                                    type='number'
                                    step={inputType === 'integer' ? 1 : 0.01}
                                    value={elemDef['default']}
                                    dataPath={dataPath}
                                    onDataChange={onChange}
                                />
                            </td>
                        </tr>
                    );
                    break;
                case 'boolean':
                    htmlElements.push(
                        <tr key={`tr-${elem}`}>
                            <td className={elem}>
                                <RadioInput
                                    name={elem}
                                    label={elem}
                                    type='radio'
                                    options={[{ id: 'yes', label: 'yes', value: 1 }, { id: 'no', label: 'no', value: 0 }]}
                                    dataPath={dataPath}
                                    onDataChange={onChange}
                                />
                            </td>
                        </tr >
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

        return htmlElements;
    }

    var elems = recursiveParseJson('', schema['properties'], dataObj, onChange)


    return (
        <>
            <table>
                <tbody>
                    {elems}
                </tbody>
            </table>
            {JSON.stringify(dataObj)}
        </>
    )
}

export default JsonEditor