import React from 'react';
import {Modal, Button} from "antd";
import {setModal, selectModal} from "../app/slice";
import {useDispatch, useSelector} from "react-redux";
import Join from "./Join";
import Project from "./Project";
import {deleteProjectApi, deleteCategoryApi} from "../api/adaptor.api";
import Category from "./Category";
import Page from "./Page";

const Default = () => {
    const dispatch = useDispatch();
    const modalData = useSelector(selectModal);
    const {show, type, subType} = modalData;

    const handleCancel = () => {
        dispatch(setModal({show : false, type : "", subType : ""}));
    };

    const modal = {
        "auth/user-not-found" : {
            body : "이메일을 확인해주세요."
        },
        "auth/wrong-password" : {
            body : "비밀번호를 확인해주세요."
        },
        "login-fail" : {
            body : "로그인을 실패했습니다."
        },
        "email-already-in-use" : {
            body : "이미 사용중인 이메일 입니다."
        },
        "join-success" : {
            body : "회원가입에 성공했습니다."
        },
        "join-fail" : {
            body : "회원가입을 실패했습니다."
        },
        "join" : {
            title : "회원가입",
            body : (<Join/>),
            closable : false,
            okEvent : () => {
                handleCancel();
            },
            width : 520
        },
        "project" : {
            title : `프로젝트 ${subType === "create" ? "생성" : "수정"}`,
            body : (<Project subType={subType}/>),
            closable : false,
            okEvent : () => {
                handleCancel();
            },
            width : 520
        },
        "create-project-success" : {
            body : "프로젝트 생성에 성공했습니다."
        },
        "delete-project" : {
            body : "프로젝트를 삭제하시겠습니까?",
            footer : [
                <Button key="submit" type="primary" onClick={deleteProjectApi}>OK</Button>
            ]
        },
        "delete-project-success": {
            body : "프로젝트 삭제를 성공했습니다."
        },
        "update-project-success": {
            body : "프로젝트 업데이트를 성공했습니다."
        },
        "category" : {
            title : `카테고리 ${subType === "create" ? "생성" : "수정"}`,
            body : (<Category subType={subType}/>),
            closable : false,
            okEvent : () => {
                handleCancel();
            },
            width : 520
        },
        "create-category-success" : {
            body : "카테고리 생성에 성공했습니다."
        },
        "delete-category" : {
            body : "카테고리를 삭제하시겠습니까?",
            footer : [
                <Button key="submit" type="primary" onClick={deleteCategoryApi}>OK</Button>
            ]
        },
        "delete-category-success": {
            body : "카테고리 삭제를 성공했습니다."
        },
        "update-category-success": {
            body : "카테고리 업데이트를 성공했습니다."
        },
        "page" : {
            title : `페이지 ${subType === "create" ? "생성" : "수정"}`,
            body : (<Page subType={subType}/>),
            closable : false,
            okEvent : () => {
                handleCancel();
            },
            width : 520
        },
    }
    return (
        <Modal
            title={modal[type]?.title || "알림"}
            open={show}
            footer={modal[type]?.footer || null}
            onCancel={handleCancel}
            width={modal[type]?.width || 300}
        >
            {modal[type]?.body}
        </Modal>
    )
};
export default Default;
