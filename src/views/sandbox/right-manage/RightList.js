import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Modal, notification, Popover, Switch } from 'antd'
import {
    fetchRightTreeListApi,
    delRightApi,
    delRightChildrenApi,
    patchRightApi,
    patchRightChildrenApi
} from '@/apis/rightListApi'
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

const { confirm } = Modal
export default function RightList() {
    const [dataSource, setdataSource] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetchRightTreeListApi.then(res => {
            const dataList = res.data
            dataList.forEach(item => {
                if (item.children?.length === 0) {
                    item.children = ""
                }
            })
            setdataSource(dataList)
            setLoading(false);
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 300,
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="orange">{key}</Tag>
            }
        },
        {
            title: '操作',
            width: 200,
            render: (item) => {
                return (
                    <div>
                        {/* <Button type="primary" ghost shape="circle" icon={<EditOutlined />} /> */}
                        <Popover
                            content={<div style={{ textAlign: "center" }}><Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch></div>}
                            title="页面配置项" trigger={item.pagepermisson === undefined ? '' : 'click'}>
                            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} />
                        </Popover>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="dashed" danger shape="circle" icon={<DeleteOutlined />}
                            onClick={() => confirmMethod(item)}
                        />
                    </div>
                );
            },
        },
    ];

    // 该菜单是否出现在左侧菜单
    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        // console.log(item)
        setdataSource([...dataSource])

        if (item.grade === 1) {
            patchRightApi((item.id), { pagepermisson: item.pagepermisson })
        } else {
            patchRightChildrenApi((item.id), { pagepermisson: item.pagepermisson })
        }
    }

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                notification.info({
                    message: `提示`,
                    description: '您已取消删除',
                    placement: 'top',
                });
            },
        });

    }
    //删除
    const deleteMethod = (item) => {
        // 当前页面同步状态 + 后端同步
        if (item.grade === 1) {
            setdataSource(dataSource.filter(data => data.id !== item.id))
            delRightApi(item.id)
        } else {
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            setdataSource([...dataSource])
            delRightChildrenApi(item.id)
        }
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }} loading={loading}
            />;
        </div>
    )
}
