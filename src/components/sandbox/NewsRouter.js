import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import Home from '@/views/sandbox/home/Home'
import Nopermission from '@/views/sandbox/nopermission/Nopermission'
import RightList from '@/views/sandbox/right-manage/RightList'
import RoleList from '@/views/sandbox/right-manage/RoleList'
import UserList from '@/views/sandbox/user-manage/UserList'
import NewsAdd from '@/views/sandbox/news-manage/NewsAdd'
import NewsDraft from '@/views/sandbox/news-manage/NewsDraft'
import NewsCategory from '@/views/sandbox/news-manage/NewsCategory'
import NewsPreview from '@/views/sandbox/news-manage/NewsPreview'
import NewsUpdate from '@/views/sandbox/news-manage/NewsUpdate'
import Audit from '@/views/sandbox/audit-manage/Audit'
import AuditList from '@/views/sandbox/audit-manage/AuditList'
import Unpublished from '@/views/sandbox/publish-manage/Unpublished'
import Published from '@/views/sandbox/publish-manage/Published'
import Sunset from '@/views/sandbox/publish-manage/Sunset'

const LocalRouterMap = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft": NewsDraft,
    "/news-manage/category": NewsCategory,
    "/news-manage/preview/:id": NewsPreview,
    "/news-manage/update/:id": NewsUpdate,
    "/audit-manage/audit": Audit,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": Unpublished,
    "/publish-manage/published": Published,
    "/publish-manage/sunset": Sunset
}

export default function NewsRouter() {
    const [BackRouteList, setBackRouteList] = useState([])
    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:5000/rights'),
            axios.get('http://localhost:5000/children')
        ]).then(res => {
            setBackRouteList([...res[0].data, ...res[1].data])
        })
    }, [])

    const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }

    const checkUserPermission = (item) => {
        return rights.includes(item.key)
    }

    return (
        <Switch>
            {
                BackRouteList.map(item => {
                    if (checkRoute(item) && checkUserPermission(item)) {
                        return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />
                    }
                    return null
                })
            }

            {/* <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} /> */}

            <Redirect from="/" to="/home" exact />
            {
                BackRouteList.length > 0 && <Route path="*" component={Nopermission} />
            }

        </Switch>
    )
}
