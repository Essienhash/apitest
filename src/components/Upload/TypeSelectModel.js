import { TreeSelect } from 'antd';
import { useState } from 'react';
const treeData = [
    {
        key:'parent 1',
        value: 'parent 1',
        title: 'parent 1',
    },
    {
        key:'parent 2',
        value: 'parent 2',
        title: 'parent 2',
    },
    {
        key:'parent 3',
        value: 'parent 3',
        title: 'parent 3',
    },
    {
        key:'parent 4',
        value: 'parent 4',
        title: 'parent 4',
    },
];
const TypeSelect = () => {
    const [defaultkey,setDefaultkey]= useState();
    const [value, setValue] = useState();
    const onSelect = (newValue) => {
        setValue(newValue);

        console.log(newValue)
        setDefaultkey (newValue);
    };
    return (
        <TreeSelect
            showSearch
            style={{
                width: '100%',
            }}
            value={value}
            dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
            }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onSelect={onSelect}
            treeData={treeData}
            defaultSelectedKeys={`[${defaultkey}]`}
        />
    );
};
export default TypeSelect;