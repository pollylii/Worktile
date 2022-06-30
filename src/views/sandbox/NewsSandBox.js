import React, { useEffect } from 'react'
import SideMenu from '@/components/sandbox/SideMenu'
import TopHeader from '@/components/sandbox/TopHeader'
import NewsRouter from '@/components/sandbox/NewsRouter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//css
import './NewsSandBox.css'
//antd
import { Layout } from 'antd'
const { Content } = Layout

export default function NewsSandBox() {
    // 顶部进度条渲染开始
    NProgress.start()
    useEffect(() => {
        // 顶部进度条渲染结束
        NProgress.done()
    })
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto'
                    }}
                >
                    <NewsRouter></NewsRouter>
                </Content>
            </Layout>
        </Layout>
    )
}
