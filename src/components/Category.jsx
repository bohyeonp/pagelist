import React from 'react';
import {Form, Input, Button} from "antd";
import {selectProjectData} from "../app/slice";
import {createCategoryApi, updateProjectApi} from "../api/adaptor.api";
import {useSelector} from "react-redux";
import {format} from 'date-fns'

const Category = ({subType}) => {
    const projectData = useSelector(selectProjectData);
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const validateMessages = {
        required: '${label} is required!',
    };

    const onFinish = (values) => {
        let categoryData = {
            title : values.title,
            updatedDate : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        }
        if(subType === "create") {
            categoryData = {...categoryData, ...{id : Math.random().toString(36).substr(2, 16), createdDate : format(new Date(), "yyyy-MM-dd HH:mm:ss")}}
            createCategoryApi(categoryData);
        } else {
            updateProjectApi(projectData);
        }
    };

    return (
        <>
            <Form
                {...layout}
                initialValues={{

                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={'title'}
                    label="Title"
                    rules={[{required: true}]}
                >
                    <Input style={{width : '300px'}} placeholder="카테고리명을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name="submit"
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        {subType}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};
export default Category;
