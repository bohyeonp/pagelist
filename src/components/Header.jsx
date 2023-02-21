import React from 'react';
import {Layout, Space, Button} from "antd";
import {Link} from "react-router-dom";
import {
    LogoutOutlined
} from '@ant-design/icons';
import {auth} from "../firebase/Firebase"
import {signOut} from "firebase/auth";
import {selectIsLoggedIn} from "../app/slice";
import {useSelector} from "react-redux";

const { Header} = Layout;

function HeaderC() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <Header
            style={{
                backgroundColor : "#001529",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px"
            }}
        >
            <div className="header-logo">
                <Link to={"/main"}  style={{letterSpacing: '5px', color: '#fff', fontSize: '24px'}}>
                    PLVS
                </Link>
            </div>
            {
                isLoggedIn &&
                <div className="header-icon" style={{marginTop : '5px'}}>
                    <Space>
                        <Space wrap>
                            <Button
                                type="text"
                                icon={<LogoutOutlined  style={{ color: '#fff', fontSize: '24px' }} />}
                                onClick={() => signOut(auth)}
                            />
                        </Space>
                    </Space>
                </div>
            }
        </Header>
    );
}

export default HeaderC;
