import React, { } from 'react'
import { Layout, Dropdown, Menu, Button } from 'antd';
import {
    DownOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

import './TopHeader.css'
import worktileLogo from '@/images/svg/worktile-logo.svg'
import worktileTel from '@/images/imgs/tel.png'

const { Header } = Layout;

const TopHeader = (props) => {
    // const [collapsed, setCollapsed] = useState(false)
    // const changeCollapsed = () => {
    //     setCollapsed(!collapsed)
    // }

    const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token'))
    const menu = (
        <Menu>
            <Menu.Item key={1}>
                {roleName}-{username}
            </Menu.Item>
            <Menu.Item key={2} danger onClick={() => {
                localStorage.removeItem('token')
                props.history.replace('/login')
            }}>退出</Menu.Item>
        </Menu>
    );


    return (
        <Header>
            <div className='topHeader-wrapper wrapper'>
                <div className='left-header-box'>
                    <div className='header-logo-box'>
                        <img alt="worktile logo" src={worktileLogo} />
                    </div>
                    <div className='center-nav-box'>
                        <ul className='header-nav-list'>
                            <li className='header-nav-item'>
                                <div className='nav-title-icon'>
                                    <span>产品</span>
                                    <Dropdown overlay={menu}>
                                        <DownOutlined />
                                    </Dropdown>
                                </div>

                            </li>
                            <li className='header-nav-item'>

                                <div className='nav-title-icon'>
                                    <span>解决方案</span>
                                    <Dropdown overlay={menu}>
                                        <DownOutlined />
                                    </Dropdown>
                                </div>
                            </li>
                            <li className='header-nav-item'>

                                <div className='nav-title-icon'>
                                    <span>支持</span>
                                    <Dropdown overlay={menu}>
                                        <DownOutlined />
                                    </Dropdown>
                                </div>
                            </li>
                            <li className='header-nav-item'>
                                <span>价格</span>
                            </li>
                            <li className='header-nav-item'>
                                <span>企业微信版</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='right-login-box'>
                    <span className='header-phone-num'>
                        <img className='wt-phone' alt="worktile 电话" src={worktileTel}/>
                    </span>
                    <Button type="primary" ghost className='btn-login'>登录</Button>
                    <Button type="primary" className='btn-try'>免费试用</Button>

                </div>


            </div>
        </Header>

    )
}
export default withRouter(TopHeader)