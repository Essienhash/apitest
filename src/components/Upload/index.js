import { Form, InputNumber, Popconfirm, Table, Typography ,Input} from 'antd';
import { useState } from 'react';
import UploadModel from "./UploadModel";
import TypeSelect from "./TypeSelectModel";
import ImageUpload from "./ImageUpload";
import Test from "./test";
const originData = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const Upload = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: '编号',
            dataIndex: 'name',
            width: '10%',
            editable: true,
        },
        {
            title: '类型',
            dataIndex: 'name',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ?  (
                    // <TypeSelect  />
<Test />
                ) : <p>model1</p>;
            },
            width: '5%',
            height:'auto',
            editable: false,
        },
        {
            title: '文件名',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },

        {
            title: '封面',
            dataIndex: 'address',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ?   (
                    <ImageUpload />
                ) : <p> pic</p>;
            },
            width: '10%',
            editable: false,
        },
        {
            title: '文件地址',
            dataIndex: 'fileUrl',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ?  (
                        <UploadModel />
                ) : <p>fileUrl</p>;
            },
            width: '10%%',
            editable: false,
        },
        {
            title: '更新时间',
            dataIndex: 'age',
            width: '10%',
            editable: false,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default Upload;