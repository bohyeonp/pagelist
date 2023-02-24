import React from 'react';
import {Form, Input, Button} from "antd";
import {selectCategoryData, selectProjectData} from "../app/slice";
import {createCategoryApi, updateCategoryApi} from "../api/adaptor.api";
import {useSelector} from "react-redux";
import {format} from 'date-fns'

const Category = ({subType}) => {
    const projectData = useSelector(selectProjectData);
    const categoryData = useSelector(selectCategoryData);

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
            categoryData = {...categoryData, ...{parentId : projectData.id , id : Math.random().toString(36).substr(2, 16), createdDate : format(new Date(), "yyyy-MM-dd HH:mm:ss")}}
            createCategoryApi(categoryData);
        } else {
            updateCategoryApi(categoryData);
        }
    };

    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    title : categoryData.title
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
