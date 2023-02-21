import React , {useEffect, useState}from 'react';
import 'antd/dist/antd.css';
import './index.css';
import "./assets/css/styles.css"
import HeaderC from "./components/Header";
import Modal from "./components/Modal";
import {Layout} from 'antd';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getProjectApi} from "./api/adaptor.api";
import {setIsLoggedIn, selectIsLoggedIn, selectModal} from "./app/slice";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase/Firebase"
import {RouteList, AuthRouteList} from "./app/router";
const {Content} = Layout;

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [init, setInit] = useState(false);
    const modal = useSelector(selectModal);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const showCommon = !["/", "/login", "/join"].includes(location.pathname)

    useEffect(()=>{
        console.log("onAuthStateChanged")
        onAuthStateChanged(auth, (userInfo) => {
            if(userInfo) {
                console.log("로그인 성공")
                dispatch(setIsLoggedIn(true));
            } else {
                console.log("로그아웃 성공")
                dispatch(setIsLoggedIn(false));
            }
            getProjectApi();
            setInit(true);
        });
    },[]);

    return (
        <>
            {
                init && <Layout style={{minHeight: '100vh'}}>
                    <Layout className="site-layout">
                        {showCommon && <HeaderC/>}
                        <Content>
                            <Routes>
                                {
                                    isLoggedIn
                                        ? (
                                            <>
                                                {
                                                    RouteList.map((item, index) => (
                                                        <Route key={index} {...item} />
                                                    ))
                                                }
                                                <Route path='*' element={<Navigate replace to='/main'/>} />
                                            </>
                                        )
                                        : (
                                            <>
                                                {
                                                    AuthRouteList.map((item, index) => (
                                                        <Route key={index} {...item} />
                                                    ))
                                                }
                                                <Route path='*' element={<Navigate replace to='/'/>} />
                                            </>
                                        )
                                }
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            }
            {modal.show && <Modal/>}
        </>
    );
};

export default App;
