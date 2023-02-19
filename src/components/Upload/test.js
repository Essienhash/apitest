import {TreeSelect} from 'antd';
import {useState} from 'react';

const treeData = [
    {
        key: 'parent 1',
        value: 'parent 1',
        title: 'parent 1',

    },
    {
        key: 'parent 2',
        value: 'parent 2',
        title: 'parent 2',

    },
    {
        key: 'parent 3',
        value: 'parent 3',
        title: 'parent 3',

    },
    {
        key: 'parent 4',
        value: 'parent 4',
        title: 'parent 4',

    },
];
const Test = () => {
    const [key, setDefaultkey] = useState( treeData[0].key);
    const [value, setValue] = useState();
    const onChange = (newValue) => {
        setValue(newValue);

    };

    const onSelect = (newKey) => {
        setDefaultkey(newKey)
        console.log(newKey)

    };
    return (
        <TreeSelect
            showSearch
            style={{
                width: '100%',
            }}
            defaultValue={`${key}`}
            value={value}
            dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
            }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            onSelect={onSelect}
            treeData={treeData}
        />
    );
};
export default Test;