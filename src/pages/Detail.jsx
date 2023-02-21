import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectProjectList} from "../app/slice";
import {Tree, Tag} from 'antd';

const { DirectoryTree } = Tree;

const Detail = () => {
    const params = useParams();
    const id = params.projectId;
    const projectList = useSelector(selectProjectList);
    const [category, setCategory] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [url, setUrl] = useState("https://ant.design/");

    useEffect(()=> {
        console.log("카테고리")
        projectList.forEach( val =>{
            if(val.id === id) setCategory(val.category)
        })
    },[]);

    useEffect(() => {
        let newArr = [];
        category.map((val, idx)=> {
            let y = {};
            y['title'] = val['title'];
            y['key'] = idx;
            y['children'] = val.page.map((val2, idx2) => {
                let z = {};
                z['title'] = <>
                    <Tag color={val2['completed'] ? 'green' : 'volcano'}>
                        {val2['completed'] ? '완료' : '진행중'}
                    </Tag>
                    {val2['title']}
                    <img style={{marginLeft : '10px', marginBottom : '2px', width: '10px', height: '10px'}}
                         src={"https://cdn-icons-png.flaticon.com/128/2089/2089708.png"} alt=""/>
                </>
                z['key'] = `${idx}-${idx2}`;
                z['isLeaf'] = true;
                z['url'] = val2['url'];
                return z
            });
            newArr.push(y);
        });
        console.log(newArr);
        setTreeData(newArr);
    }, [category]);

    const onSelect = (keys, info) => {
        if(info.nativeEvent.target.tagName === "IMG"){
            window.open(info.node.url, "_blank")
        }else{
            info.node.url !== undefined && setUrl(info.node.url)
        }
    };

    return (
        treeData.length !== 0 && <div style={{display : 'flex'}}>
            <div style={{width: '15%'}}>
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
