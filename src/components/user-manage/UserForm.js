import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'


const { Option } = Select
const UserForm = forwardRef((props, ref) => {
    // 根据角色名称判断区域是否需要填写，超级管理员区域则禁用
    const [isDisabled, setisDisabled] = useState(false)
    // 解构角色列表、区域列表
    const { regionList, roleList } = props

    useEffect(() => {
        // 将isUpdateDisabled赋值给isDisabled，超级管理员区域不可改（默认为全球
        setisDisabled(props.isUpdateDisabled)
    }, [props.isUpdateDisabled])

    const { roleId, region } = JSON.parse(localStorage.getItem("token"))
    const roleObj = {
        "1": "superadmin",
        "2": "admin",
        "3": "editor"
    }

    const checkRegionDisabled = (item) => {
        // 更新功能
        if (props.isUpdate) {
            // 只有超级管理员才能更新修改区域
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return true
            }
        } else {
            // 添加功能
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                // 区域管理员只能添加自己所在区域的用户，不是自己区域的选项都禁用
                return item.value !== region
            }
        }
    }
    
    const checkRoleDisabled = (item) => {
        // 更新功能
        if (props.isUpdate) {
            // 只有超级管理员才能更新修改区域
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return true
            }
        } else {
            // 添加功能
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return roleObj[item.id] !== "editor"
            }
        }
    }

    return (
        <Form layout="vertical" ref={ref}>
            <Form.Item name="username" label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名！',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                ]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item name="region" label="区域"
                rules={
                    isDisabled ? [] : [{
                        required: true,
                        message: '请选择区域！'
                    }]
                }
            >
                <Select disabled={isDisabled}>
                    {
                        regionList.map(item => {
                            return (
                                <Option value={item.title} key={item.id} disabled={checkRegionDisabled(item)}>
                                    {item.title}
                                </Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name="roleId" label="角色名称"
                rules={[
                    {
                        required: true,
                        message: '请输入角色名称！'
                    }
                ]}
            >

                <Select onChange={(value) => {
                    if (value === 1) {
                        setisDisabled(true)
                        ref.current.setFieldsValue({
                            region: ""
                        })
                    } else {
                        setisDisabled(false)
                    }
                }}>
                    {
                        roleList.map(item => {
                            return (
                                <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>
                                    {item.roleName}
                                </Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})
export default UserForm