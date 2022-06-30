import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, notification, Tree } from 'antd'
import { fetchRoleListApi, delRoleApi, patchRoleApi } from '@/apis/rolesApi'
import { fetchRightTreeListApi } from '@/apis/rightListApi'
import {
    UnorderedListOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

const { confirm } = Modal
export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    const [rightList, setRightList] = useState([])
    const [currentRights, setCurrentRights] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setisModalVisible] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetchRoleListApi.then(res => {
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
    useEffect(() => {
        fetchRightTreeListApi.then(res => {
            const dataList = res.data
            setRightList(dataList)
        })
    }, [])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 300,
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            width: 200,
            render: (item) => {
                return (
                    <div>
                        <Button type="primary" ghost shape="circle" icon={<UnorderedListOutlined />}
                            onClick={() => {
                                setisModalVisible(true)
                                setCurrentRights(item.rights)
                                setCurrentId(item.id)
                            }
                            } />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="dashed" danger shape="circle" icon={<DeleteOutlined />}
                            onClick={() => confirmMethod(item)}
                        />
                    </div>
                );
            },
        },
    ];

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
        setdataSource(dataSource.filter(data => data.id !== item.id))
        delRoleApi(item.id)
    }
    const handleOk = () => {
        setisModalVisible(false)
        // 同步dataSource
        setdataSource(dataSource.map(item => {
            if (item.id === currentId) {
                return {
                    ...item,
                    rights: currentRights
                }
            }
            return item
        }))
        patchRoleApi((currentId), { rights: currentRights })
    }
    const handleCancel = () => {
        setisModalVisible(false)
    }
    const onCheck = (checkedKeys) => {
        setCurrentRights(checkedKeys.checked)
    };

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }} loading={loading}
                rowKey={({ id }) => id}
            />;
            <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    checkStrictly={true}
                    treeData={rightList}
                />
            </Modal>
        </div>
    )
}
