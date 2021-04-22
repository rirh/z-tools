import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { HOME_URL, Home, HOME_ICON, } from 'src/pages/Home/Home'
import { LOGIN_URL, Login } from 'src/pages/Login/Login'
import { ENCODING_URL, Encoding } from 'src/pages/Encoding/Encoding'
import { PROFILE_URL, Profile } from 'src/pages/Profile/Profile'



export const AllRoutesList = [
    {
        name: 'Profile',
        path: PROFILE_URL,
        component: Profile,
    },
    {
        name: 'EnCoding',
        path: ENCODING_URL,
        component: Encoding,
        icon: HOME_ICON,
        ismenu: false,
    },
    {
        name: 'Login',
        path: LOGIN_URL,
        component: Login,
        icon: null,
        ismenu: false,
    }, {
        name: '首页',
        path: HOME_URL,
        component: Home,
        icon: HOME_ICON,
        ismenu: true,
    },
]



const AllRoute = () => <BrowserRouter>
    <Switch>
        {AllRoutesList.map(route => <Route key={route.name} path={route.path} component={route.component}></Route>)}
        <Redirect to={HOME_URL}></Redirect>
    </Switch>
</BrowserRouter>;

export default AllRoute;