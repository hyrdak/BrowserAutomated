import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { QUERY_KEYS } from 'constants-es';

import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { AutoComplete, Button, Card, Form, Input, message, Modal, Select, Space, Switch, Typography } from 'antd';

import { useQueryGetKind } from 'modules/kinds/data/queries/use-query-kinds';
import { useMutationCreateNode } from 'modules/nodes/data/queries/use-mutation-create-node';
import { useQueryGetElementType } from 'modules/nodes/data/queries/use-mutation-get-elementtype';
import { useMutationGetPropsByIdEType } from 'modules/nodes/data/queries/use-mutation-get-propsbyidetype';
import { useMutationUpdateNode } from 'modules/nodes/data/queries/use-mutation-update-node';
import { useQueryGetType } from 'modules/type/data/queries/use-query-types';

interface Props {
    propName: string;
    propValue: string;
    options : [];
}
interface Options {
    propName: string;
    propValue: string;
}
export const ModalCreateNodeEx = (e:any) => {
    const [modal, setModal] = useState(true);
    const queryClient = useQueryClient();
    const mutationCreateNode = useMutationCreateNode();
    const mutationGetPropsByIdEType = useMutationGetPropsByIdEType();
    const mutationUpdateNode = useMutationUpdateNode();
    const { data:dataEType, isFetching:isFetchingEType } = useQueryGetElementType();
    const { data:dataKind, isFetching:isFetchingKind } = useQueryGetKind();
    const { data:dataType, isFetching:isFetchingType } = useQueryGetType();
    const [form] = Form.useForm();
    const [isNextRight, setIsNextRight] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [dataJson, setDataJson] = useState({});
    const [dataPropsL, setDataPropsL] = useState([]);
    const [dataPropsR, setDataPropsR] = useState([]);
    const [flagCheckJson, setFlagCheckJson] = useState(true);
    useEffect(() => {
        if(e.dataForm != undefined) {
            reviewJson();
            if(e.dataForm.dataOptions) {
                if(e.dataForm.dataOptions.length%2) {
                    setIsNextRight(true);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [e.dataForm])
    function getProps(item:any) {
        const newProps: { [key: string]: any } = {};
        newProps['options'] = [];
        item.props.forEach((prop: Props) => {
            if(prop!=undefined){
                // if(prop.propName) {
                    if(prop.propName == 'options' || prop.propName == 'Options') {
                        if(prop.options!=undefined){
                            const newOptions: { [key: string]: any } = {};
                            prop.options.map((option: Options) => {
                                if(prop!=undefined && option){
                                    if(option.propValue) {
                                        newOptions[option.propName] = option.propValue;
                                    } else {
                                        newOptions[option.propName] = '';
                                    }
                                }
                            });
                            if(newProps['options'] == undefined) {
                                newProps['options'] = [];
                            }
                            newProps['options'].push(newOptions);
                        }
                    } else {
                        if (Array.isArray(newProps['options']) && newProps['options'].length === 0) {
                            delete newProps['options'];
                        }
                        if (prop.propValue) {
                            if(prop.propValue == "true") {
                                newProps[prop.propName] = true;
                            } else if (prop.propValue == "false") {
                                newProps[prop.propName] = false;
                            } else {
                                newProps[prop.propName] = prop.propValue;
                            }
                        } else {
                            newProps[prop.propName] = '';
                        }
                    }
                // }
            }
        });
        
        return newProps;
    }
    function reviewJson () {
        setIsVisible(true);
        
        // console.log('reviewJson');
        // console.log(isVisible);
        
    //     console.log(form.getFieldsValue().dataOptions[0]
    // );
        if(form.getFieldsValue().dataOptions){
            
        // if(form.getFieldsValue().dataOptions.length > 0){
        // if(form.getFieldsValue().dataOptions[0] != undefined){
        // if(form.getFieldsValue().dataOptions[0].props){
        // if(form.getFieldsValue().dataOptions[0].props[0] !== undefined){
            const transformedValues = {
                ...form.getFieldsValue(),
                dataOptions: form.getFieldsValue().dataOptions.map((item:any) => {
                    if(item!=undefined){
                        if(item.props) {
                            // console.log(item.props);
                            

                            return {
                                ...item,
                                props: getProps(item)
                            }
                        } else {
                            setDataJson(form.getFieldsValue());

                            return {
                                ...item,
                                props: {}
                            }
                        }
                    } else {
                        setDataJson(form.getFieldsValue());
                    }
                })
            };
            setDataJson(transformedValues);
        } else {
            const newJson = form.getFieldsValue();
            newJson['dataOptions'] = [];
            setDataJson(newJson);
        }
        // } else {
        //     setDataJson(form.getFieldsValue());
        // }
        // } else {
        //     setDataJson(form.getFieldsValue());
        // }
        // } else {
        //     setDataJson(form.getFieldsValue());
        // }
        // } else {
        //     setDataJson(form.getFieldsValue());
        // }
    }
    
    // useEffect(() => {
    //     setTimeout(() => {setIsVisible(true)},1);
    // });

    // const getSelectType = () => {
    //     console.log('Type');
        
        
    //     if (!isFetchingType && dataType?.data != null) {
    //         const dataTpeF:any = dataType.data

    //         return dataTpeF.map((item: any) => (
    //             <Select.Option key={'type-' + item.id} value={item.id}>
    //                 {item.name}
    //             </Select.Option>
    //         ));
    //     }

    //     return null;
    // };
    // const getSelectKind = () => {console.log('Kind');
    //     if (!isFetchingKind && dataKind?.data != null) {
    //         const dataTpeF:any = dataKind.data

    //         return dataTpeF.map((item: any) => (
    //             <Select.Option key={'type-' + item.id} value={item.id}>
    //                 {item.name}
    //             </Select.Option>
    //         ));
    //     }

    //     return null;
    // };
    // const getSelectElementType = () => {console.log('EType');
    //     if (!isFetchingEType && dataEType?.data != null) {
    //         const dataTpeF:any = dataEType.data

    //         return dataTpeF.map((item: any) => (
    //             <Select.Option key={item.id} value={item.name}>
    //                 {item.name}
    //             </Select.Option>
    //         ));
    //     }

    //     return null;
    // };
    const getPropsForAutoCompleteL = (e:any) => {
        mutationGetPropsByIdEType.mutateAsync(form.getFieldsValue().dataOptions[e].elementType, {
            onSuccess: (response: any) => {
                if (response.success) {
                    setDataPropsL(response.data);
                } else {
                    setDataPropsL([]);
                }
            }
        });
    }
    const getPropsForAutoCompleteR = (e:any) => {
        mutationGetPropsByIdEType.mutateAsync(form.getFieldsValue().dataOptions[e].elementType, {
            onSuccess: (response: any) => {
                if (response.success) { 
                    setDataPropsR(response.data);
                } else {
                    setDataPropsR([]);
                }
            }
        });
    }
    function hiddenOptions(a:any,e:any,flag:boolean) {
        const value = form.getFieldsValue().dataOptions[a.name].props[e.name]?.propName;
        // let value = '';
        // form.getFieldsValue().dataOptions[a.name].props.filter((item:any) => {
        //     if(item?.propName == 'options' || item?.propName == 'Options') {
        //         value = item.propName;
        //     }
        // });
        if(value == 'options' || value == 'Options') {
            if (flag) {
                return (<>
                    <Space className='mt-3'>
                        <Form.Item label="options">
                            <Form.List name={[e.name, 'options']}>
                                {(subFieldsOptions, subOptOptions) => (
                                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                        {subFieldsOptions.map((subFieldOptions) => (
                                            <Space key={subFieldOptions.key}>
                                                <Form.Item 
                                                name={[subFieldOptions.name, 'propName']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter a option name"
                                                    }
                                                ]}
                                                hasFeedback
                                                >
                                                    {/* <Input placeholder="Prop Name" /> */}
                                                    <AutoComplete
                                                        style={{ width: 130 }}
                                                        options={[{value: 'label'}, {value: 'value'}]}
                                                        onChange={()=>{reviewJson();}}
                                                        placeholder="option name"
                                                    />
                                                </Form.Item>
                                                <Form.Item 
                                                name={[subFieldOptions.name, 'propValue']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter a option value"
                                                    }
                                                ]}
                                                hasFeedback
                                                >
                                                    <Input style={{ width: 130 }} placeholder="option value" onChange={reviewJson}/>
                                                </Form.Item>
                                                <CloseOutlined
                                                    onClick={() => {
                                                        subOptOptions.remove(subFieldOptions.name);
                                                        reviewJson();
                                                    }}
                                                />
                                            </Space>
                                        ))}
                                        <Button type="primary" ghost onClick={() => subOptOptions.add()} block>
                                            + Add options
                                        </Button>
                                    </div>
                                )}
                            </Form.List>
                        </Form.Item>
                    </Space>
                </>)
            }
        } else if (!flag){
            return (<>
                <Form.Item 
                name={[e.name, 'propValue']}
                rules={[
                    {
                        required: true,
                        message: "Please enter a prop value"
                    }
                ]}
                hasFeedback
                >
                    <Input placeholder="Prop Value" onChange={reviewJson}/>
                </Form.Item>
            </>);
        }

    }
    function handleSubmit() {
        if(e.update) {
            const dataCreate = {
                ...dataJson,
                id: e.id,
                dataForm: form.getFieldsValue()
            };
            mutationUpdateNode.mutate(dataCreate, {
                onSuccess: (response: any) => {
                    if (response.success) {
                        message.success('Update node instance successfully');
                        setModal(false);
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.NODES]
                        });
                    } else {
                        message.error(response.message);
                        setModal(false);
                    }
                }
            });
        } else {
            const dataCreate = {
                ...dataJson,
                dataForm: form.getFieldsValue()
            };
            mutationCreateNode.mutate(dataCreate, {
                onSuccess: (response: any) => {
                    if (response.success) {
                        message.success('Create new node instance successfully');
                        setModal(false);
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.NODES]
                        });
                    } else {
                        message.error(response.message);
                        setModal(false);
                    }
                }
            });
        }
    }

    return (
        modal ? (
            <Modal
                title={e.update?"Update node instance":'Create new node instance'}
                style={{ top: 8 }}
                width={1400}
                open={modal}
                onCancel={() => setModal(false)}
                footer={[]}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="dataNodes"
                    autoComplete="off"
                    initialValues={e.dataForm}
                    onFinish={handleSubmit}
                >
                    <div className='grid grid-cols-7'>
                        <div className='col-span-2 mr-3'>
                            <Form.Item 
                                label="Name" name={['name']}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a Name"
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input onChange={reviewJson}/>
                            </Form.Item>
                            <Form.Item
                                label="Type"
                                name="idType"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a Type"
                                    }
                                ]}
                                hasFeedback
                            >
                                <Select onChange={reviewJson}>
                                    {!isFetchingType && dataType?.data != null && (
                                        <>
                                            {dataType.data.map((item: any) => (
                                                <Select.Option key={'type-' + item.id} value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Kind"
                                name="idKind"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a Kind"
                                    }
                                ]}
                                hasFeedback
                            >
                                <Select onChange={reviewJson}>
                                    {!isFetchingKind && dataKind?.data != null && (
                                        <>
                                            {dataKind.data.map((item: any) => (
                                                <Select.Option key={'kind-' + item.id} value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </Form.Item>
                            {flagCheckJson?(
                                <ReactJson
                                    name={null}
                                    theme={'codeschool'}
                                    src={dataJson}
                                    displayDataTypes={false}
                                    style={{
                                        maxHeight: 500,
                                        overflow: 'auto',
                                        borderRadius: 5,
                                        border: 1,
                                    }}
                                />
                            ):''}
                        </div>
                        <div className='grid grid-cols-2 col-span-5 gap-4'>
                            <Form.List name="dataOptions">
                                {(fields, { add, remove }) => (
                                    <>
                                        <div className='flex flex-col gap-4'>
                                            {fields.filter((_, index) => index % 2 === 0).map((field) => (
                                                <Card
                                                    size="small"
                                                    title={`Option ${field.name + 1}`}
                                                    key={field.key}
                                                    extra={
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                remove(field.name);
                                                                fields.length%2!=0?setIsNextRight(false):setIsNextRight(true)
                                                                reviewJson();
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Form.Item 
                                                    label="Name" 
                                                    name={[field.name, 'name']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter a name option"
                                                        }
                                                    ]}
                                                    hasFeedback>
                                                        <Input onChange={reviewJson}/>
                                                    </Form.Item>
                                                    <Form.Item 
                                                    label="Label" 
                                                    name={[field.name, 'label']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter a label"
                                                        }
                                                    ]}
                                                    hasFeedback>
                                                        <Input onChange={reviewJson}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Element Type"
                                                        name={[field.name, "elementType"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please enter a Element Type"
                                                            }
                                                        ]}
                                                        hasFeedback
                                                    >
                                                        <Select onChange={()=>{reviewJson();getPropsForAutoCompleteL(field.name)}}>
                                                            {!isFetchingEType && dataEType?.data != null && (
                                                                <>
                                                                    {dataEType.data.map((item: any) => (
                                                                        <Select.Option key={'etype-' + item.id} value={item.name}>
                                                                            {item.name}
                                                                        </Select.Option>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </Select>
                                                    </Form.Item>

                                                    {/* Nest Form.List */}
                                                    <Form.Item label="Props">
                                                        <Form.List name={[field.name, 'props']}>
                                                            {(subFields, subOpt) => (
                                                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                                    {subFields.map((subField) => (
                                                                        <div key={subField.key}>
                                                                            <Space>
                                                                                <Form.Item
                                                                                name={[subField.name, 'propName']}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message: "Please enter a prop name"
                                                                                    }
                                                                                ]}
                                                                                hasFeedback
                                                                                >
                                                                                    {/* <Input placeholder="Prop Name" /> */}
                                                                                    <AutoComplete
                                                                                        style={{ width: 160 }}
                                                                                        options={dataPropsL}
                                                                                        onChange={()=>{reviewJson();}}
                                                                                        placeholder="Prop Name"
                                                                                        onClick={()=>{getPropsForAutoCompleteL(field.name)}}
                                                                                    />
                                                                                </Form.Item>
                                                                                {isVisible&&(
                                                                                    hiddenOptions(field,subField,false)
                                                                                )}
                                                                                
                                                                                <CloseOutlined
                                                                                    onClick={() => {
                                                                                        subOpt.remove(subField.name);
                                                                                        reviewJson();
                                                                                    }}
                                                                                />
                                                                            </Space>
                                                                            {isVisible&&(
                                                                                hiddenOptions(field,subField,true)
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                    <Button type="dashed" onClick={() => {
                                                                        subOpt.add();
                                                                        reviewJson();
                                                                    }} block>
                                                                        + Add Prop
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </Form.List>
                                                    </Form.Item>
                                                </Card>
                                            ))}
                                            {!isNextRight && (
                                                <Button type="primary" ghost onClick={() => { add(); setIsNextRight(true); reviewJson(); }} block>
                                                    + Add Option
                                                </Button>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            {fields.filter((_, index) => index % 2 !== 0).map((field) => (
                                                <Card
                                                    size="small"
                                                    title={`Option ${field.name + 1}`}
                                                    key={field.key}
                                                    extra={
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                remove(field.name);setIsNextRight(false);
                                                                fields.length%2!=0?setIsNextRight(false):setIsNextRight(true)
                                                                reviewJson();
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Form.Item 
                                                    label="Name" 
                                                    name={[field.name, 'name']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter a name option"
                                                        }
                                                    ]}
                                                    hasFeedback>
                                                        <Input onChange={reviewJson}/>
                                                    </Form.Item>
                                                    <Form.Item 
                                                    label="Label" 
                                                    name={[field.name, 'label']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter a label"
                                                        }
                                                    ]}
                                                    hasFeedback>
                                                        <Input onChange={reviewJson}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Element Type"
                                                        name={[field.name, "elementType"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please enter a Element Type"
                                                            }
                                                        ]}
                                                        hasFeedback
                                                    >
                                                        <Select onChange={()=>{reviewJson();getPropsForAutoCompleteR(field.name)}}>
                                                            {!isFetchingEType && dataEType?.data != null && (
                                                                <>
                                                                    {dataEType.data.map((item: any) => (
                                                                        <Select.Option key={'etype-' + item.id} value={item.name}>
                                                                            {item.name}
                                                                        </Select.Option>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </Select>
                                                    </Form.Item>

                                                    {/* Nest Form.List */}
                                                    <Form.Item label="Props">
                                                        <Form.List name={[field.name, 'props']}>
                                                            {(subFields, subOpt) => (
                                                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                                    {subFields.map((subField) => (
                                                                        <div key={subField.key}>
                                                                            <Space>
                                                                                <Form.Item
                                                                                name={[subField.name, 'propName']}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message: "Please enter a prop name"
                                                                                    }
                                                                                ]}
                                                                                hasFeedback
                                                                                >
                                                                                    {/* <Input placeholder="Prop Name" /> */}
                                                                                    <AutoComplete
                                                                                        style={{ width: 160 }}
                                                                                        options={dataPropsR}
                                                                                        onChange={()=>{reviewJson();}}
                                                                                        placeholder="Prop Name"
                                                                                        onClick={()=>{getPropsForAutoCompleteR(field.name)}}
                                                                                    />
                                                                                </Form.Item>
                                                                                {isVisible&&(
                                                                                    hiddenOptions(field,subField,false)
                                                                                )}
                                                                                
                                                                                <CloseOutlined
                                                                                    onClick={() => {
                                                                                        subOpt.remove(subField.name);
                                                                                        reviewJson();
                                                                                    }}
                                                                                />
                                                                            </Space>
                                                                            {isVisible&&(
                                                                                hiddenOptions(field,subField,true)
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                    <Button type="dashed" onClick={() => {
                                                                        subOpt.add();
                                                                        reviewJson();
                                                                    }} block>
                                                                        + Add Prop
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </Form.List>
                                                    </Form.Item>
                                                </Card>
                                            ))}
                                            {isNextRight && (
                                                <Button type="primary" ghost onClick={() => { add(); setIsNextRight(false); reviewJson(); }} block>
                                                    + Add Option
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </Form.List>
                        </div>
                    </div>
                    <Space key='footerModal' style={{ width: '100%', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Switch
                                key='switchJson'
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                checked={flagCheckJson}
                                onClick={() => {            
                                    setFlagCheckJson(!flagCheckJson)
                                }}
                            />
                            <span className='ml-2'>View data Json</span>
                        </div>
                        <div>
                            <Button key="back" onClick={() => setModal(false)}>
                                Return
                            </Button>
                            <Button className='ml-2' key="submit" type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Space>
                </Form>
            </Modal>
        ) : (<></>)
    );
};

// return (
//     <>
//         A
//     </>
// );
// };