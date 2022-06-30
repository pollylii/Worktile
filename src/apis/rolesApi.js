import axios from 'axios'
import baseURL from './baseURL'

const URL = `${baseURL}/roles`

const fetchRoleListApi = axios.get(URL) // 角色列表

const delRoleApi = (id) => {
    axios.delete(URL + `/${id}`) // 删除角色
}

const patchRoleApi = (id, obj) => {
    axios.patch(URL + `/${id}`, obj) // 修改角色
}

export { fetchRoleListApi, delRoleApi, patchRoleApi }