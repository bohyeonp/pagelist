import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectProjectList, setModal, setCategoryList, selectCategoryList, selectIsLoggedIn} from "../app/slice";
import {Tree, Tag} from 'antd';
import {PlusOutlined, FolderOpenOutlined} from "@ant-design/icons";

const { DirectoryTree } = Tree;

const Detail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.projectId;
    const projectList = useSelector(selectProjectList);
    const categoryList = useSelector(selectCategoryList);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [treeData, setTreeData] = useState([]);
    const [url, setUrl] = useState("");

    useEffect(()=> {
        projectList.forEach( val =>{
            if(val.id === id) dispatch(setCategoryList(val.category));
        })
    },[projectList]);

    useEffect(() => {
        if(categoryList.length === 0 && isLoggedIn){
            setTreeData([{title : "+ 카테고리 생성", key : '999'}])
        }else{
            let newArr = [];
            categoryList.map((val, idx)=> {
                let y = {};
                y['title'] = <>
                    {!isLoggedIn
                        ? val['title']
                        : <>
                            {val['title']}
                            <PlusOutlined style={{float: 'right', marginTop : '5px', fontSize: '10px'}}/>
                        </>
                    }
                </>
                y['key'] = idx;
                y['children'] = val.page.map((val2, idx2) => {
                    let z = {};
                    z['title'] = <>
                        <Tag color={val2['state'] === "0" ? 'default' : val2['status'] === "2" ? 'green' : 'volcano'}>
                            {val2['state'] === "0" ? 'TODO' : val2['status'] === "2" ? 'DONE' : 'IN PROGRESS'}
                        </Tag>
                        {val2['title']}
                        <img style={{float: 'right', marginBottom : '2px', width: '10px', height: '10px'}}
                             src={"https://cdn-icons-png.flaticon.com/128/2089/2089708.png"} alt=""/>
                    </>
                    z['key'] = `${idx}-${idx2}`;
                    z['isLeaf'] = true;
                    z['url'] = val2['url'];
                    return z
                });
                newArr.push(y);
            });
            if(isLoggedIn) newArr.push({title : "+ 카테고리 생성", key : '999'});
            setTreeData(newArr);
        }
    }, [categoryList]);

    const onSelect = (keys, info) => {
        if(info.nativeEvent.target.tagName === "IMG"){
            window.open(info.node.url, "_blank")
        }else if(info.nativeEvent.target.tagName === "svg"){
            dispatch(setModal({show: true, type: 'page', subType : 'create'}));
        }else if(info.nativeEvent.target.innerHTML === "+ 카테고리 생성") {
            dispatch(setModal({show: true, type: 'category', subType : 'create'}));
        }else {
            info.node.url !== undefined && setUrl(info.node.url)
        }
    };

    return (
         <div style={{display : 'flex'}}>
            <div style={{width: '25%'}}>
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onSelect={onSelect}
                    treeData={treeData}
                    defaultSelectedKeys={['0-0']}
                    style={{fontSize : '16px', marginTop : '10px'}}
                />
            </div>
            <div style={{width: '85%',height: '800px'}}>
                <iframe src={url} height="100%" width="100%"/>
            </div>
        </div>
    )
}
export default Detail;
