import Main from '../pages/Main';
import Detail from "../pages/Detail";
import Login from "../pages/Login";

const RouteList = [
    {
        path : '/main',
        element :  <Main/>
    },
    {
        path : '/detail/:projectId',
        element :  <Detail/>
    }
]

const AuthRouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/detail/:projectId',
        element :  <Detail/>
    }
]

export {RouteList, AuthRouteList};
