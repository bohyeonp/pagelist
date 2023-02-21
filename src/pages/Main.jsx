import React from "react";
import {selectProjectList, setModal, setProjectData, selectProjectData} from "../app/slice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Space, Card, Dropdown} from 'antd'
import {PlusOutlined} from "@ant-design/icons";

const uploadStyle = {
    display: 'inline-block',
    width: '300px',
    height: '183px',
    marginTop : '10px',
    overflow: 'hidden',
    backgroundColor : '#fefefe',
    position : 'relative'
};

function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projectList = useSelector(selectProjectList);
    const projectData = useSelector(selectProjectData);

    const createProject = () => {
        projectData.id !== "" && dispatch(setProjectData({title : "", id : ""}));
        dispatch(setModal({show: true, type: 'project', subType : 'create'}));
    }
    const updateProject = () => dispatch(setModal({show: true, type: 'project', subType : 'update'}));
    const deleteProject = () => dispatch(setModal({show: true, type: 'delete-project'}));

    const items = [
        {
            label: '수정',
            key: '1',
            onClick : () => {updateProject()}
        },
        {
            label: '삭제',
            key: '2',
            onClick : () => {deleteProject()}
        }
    ];
    const menuProps = {items};

    return (
        <div style={{textAlign:'center'}}>
            {
                <Space style={{marginTop:  '20px', flexWrap: 'wrap'}} size={16}>
                    <div onClick={createProject} style={uploadStyle} className={"upload_btn"}>
                        <PlusOutlined style={{marginTop:  '20%', marginBottom : '10px'}}/>
                        <div>프로젝트 생성</div>
                    </div>
                    {/*<Card*/}
                    {/*    title={"프로젝트 생성"}*/}
                    {/*    style={{*/}
                    {/*        width: 300,*/}
                    {/*        height: '179px'*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <div style={{display : 'flex', marginTop : '15px'}}>*/}
                    {/*        <Input placeholder="프로젝트명을 입력해주세요."/>*/}
                    {/*        <Button type="primary" htmlType="submit">Create</Button>*/}
                    {/*    </div>*/}
                    {/*</Card>*/}
                    {projectList.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            extra={<Dropdown.Button menu={menuProps} />}
                            style={{width: 300}}
                            onClick={() => {dispatch(setProjectData({title : item.title, id : item.id}))}}
                        >
                            <div onClick={() => {navigate(`/detail/${item.id}`)}}>
                                <p>생성일 : {item.createdDate}</p>
                                <p>수정일 : {item.updatedDate}</p>
                            </div>
                        </Card>
                    ))}
                </Space>
            }
        </div>
    );
}

export default Main;
