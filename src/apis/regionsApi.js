import axios from 'axios'
import baseURL from './baseURL'

const URL = `${baseURL}/regions`

const fetchRegionListApi = axios.get(URL) // 角色列表

const delRegionApi = (id) => {
    axios.delete(URL + `/${id}`) // 删除角色
}

const patchRegionApi = (id, obj) => {
    axios.patch(URL + `/${id}`, obj) // 修改角色
}

export { fetchRegionListApi, delRegionApi, patchRegionApi }