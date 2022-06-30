import axios from 'axios'
import baseURL from './baseURL'

export const fetchRoleList = axios.get(`${baseURL}/roles`) // 角色列表