import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Button, Table, Modal, notification, Switch } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { fetchUserListApi, delUserApi, patchUserApi } from '@/apis/usersApi'
import { fetchRegionListApi } from '@/apis/regionsApi'
import { fetchRoleListApi } from '@/apis/rolesApi'
import UserForm from '@/components/user-manage/UserForm.js'

const { confirm } = Modal

export default function UserList() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])
    const [current, setCurrent] = useState(null)

    const addForm = useRef(null)
    const updateForm = useRef(null)

    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

    // 获取用户列表
    useEffect(() => {
        const roleObj = {
            '1': 'superadmin',
            '2': 'admin',
            '3': 'editor',
        }
        setLoading(true);
        fetchUserListApi.then(res => {
            const dataList = res.data
            dataList.forEach(item => {
                if (item.children?.length === 0) {
                    item.children = ""
                }
            })
            // 用户权限筛选，超级管理员能查看全部用户，区域管理员能查看自己和该区域的区域编辑
            setDataSource(roleObj[roleId] === 'superadmin' ? dataList : [
                ...dataList.filter(item1 => item1.username === username),
                ...dataList.filter(item2 => item2.region === region && roleObj[item2.roleId] === 'editor'),
            ])
            setLoading(false);
        })
    }, [roleId, region, username])

    // 获取角色列表
    useEffect(() => {
        fetchRoleListApi.then(res => {
            setRoleList(res.data)
        })
    }, [])
    // 获取区域列表
    useEffect(() => {
        fetchRegionListApi.then(res => {
            setRegionList(res.data)
        })
    }, [])

    // table表头
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            // width: 300,
            render: (region) => {
                return <b>{region ? region : '全球'}</b>
            },
            filters: [
                ...regionList.map(reg => ({
                    text: reg.title,
                    value: reg.value,
                })), {
                    text: '全球',
                    value: ''
                }],
            onFilter: (value, item) => item.region === value,
            sortDirections: ['descend'],
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role?.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item?.default} onChange={() => { handleChange(item) }}></Switch>
            }
        },
        {
            title: '操作',
            width: 200,
            render: (item) => {
                return (
                    <div>
                        <Button type="primary" ghost shape="circle" icon={<EditOutlined />} disabled={item?.default}
                            onClick={() => {
                                handleUpdate(item)
                            }
                            } />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="dashed" danger shape="circle" icon={<DeleteOutlined />} disabled={item?.default}
                            onClick={() => confirmMethod(item)}
                        />
                    </div>
                );
            },
        },
    ];
    const handleUpdate = (item) => {
        // react 为热更新， 模态框表单还未弹出来updateForm.current?.setFieldsValue(item)已经执行
        // setIsUpdateVisible(true)
        // updateForm.current?.setFieldsValue(item)

        // 异步方法同步化
        setTimeout(() => {
            setIsUpdateVisible(true)
            if (item.roleId === 1) {
                setIsUpdateDisabled(true)
            } else {
                setIsUpdateDisabled(false)
            }
            updateForm.current?.setFieldsValue(item)
        }, 0)
        setCurrent(item)
    }

    // 修改用户状态
    const handleChange = (item) => {
        item.roleState = !item.roleState
        setDataSource([...dataSource])
        patchUserApi(item.id, { roleState: item.roleState })
    }

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
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
        setDataSource(dataSource.filter(data => data.id !== item.id))
        delUserApi(item.id)
    }

    // 添加用户信息
    const addFormOK = () => {
        addForm.current?.validateFields().then(val => {
            setIsAddVisible(false)
            addForm.current.resetFields()
            let obj = {
                ...val,
                roleState: true,
                default: false
            }
            axios.post(`http://localhost:5000/users`, obj).then(res => {
                setDataSource([...dataSource, {
                    ...res.data,
                    role: roleList.filter(item => item.id === val.roleId)[0]
                }])
            })
            // postUserApi(obj).then(res => {
            //     setDataSource([...dataSource, {
            //         ...res.data,
            //         role: roleList.filter(item => item.id === val.roleId)[0]
            //     }])
            // })
        }).catch(err => {
            console.log('err', err);
        })
    }
    // 更新用户信息
    const updateFormOK = () => {
        updateForm.current?.validateFields().then(value => {
            setIsUpdateVisible(false)
            setDataSource(dataSource.map(item => {
                if (item.id === current.id) {
                    return {
                        ...item,
                        ...value,
                        role: roleList.filter(data => data.id === value.roleId)[0]
                    }
                }
                return item
            }))
            setIsUpdateVisible(!isUpdateDisabled)
            patchUserApi(current.id, value)
        }).catch(err => {
            console.log('err', err);
        })
    }

    return (
        <div>
            <Button type="primary" onClick={() => {
                setIsAddVisible(true)
            }
            } >添加用户</Button>

            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }} loading={loading}
                rowKey={(item) => item?.id}
            />;

            <Modal
                visible={isAddVisible}
                title="添加用户"
                okText="确认"
                cancelText="关闭"
                onCancel={() => { setIsAddVisible(false) }}
                onOk={() => addFormOK()}
            >
                <UserForm ref={addForm} roleList={roleList} regionList={regionList}></UserForm>
            </Modal>

            <Modal
                visible={isUpdateVisible}
                title="更新用户"
                okText="更新"
                cancelText="关闭"
                onCancel={() => {
                    setIsUpdateVisible(false)
                    setIsUpdateDisabled(!isUpdateDisabled)
                }}
                onOk={() => { updateFormOK() }}
            >
                <UserForm
                    ref={updateForm}
                    roleList={roleList}
                    regionList={regionList}
                    isUpdateDisabled={isUpdateDisabled}
                    isUpdate = {true}
                >
                </UserForm>
            </Modal>
        </div>
    )
}
