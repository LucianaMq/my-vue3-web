// 统一管理项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './type'

/**
 * 项目用户相关的请求地址
 */
enum API {
  LOGIN_URL = '/user/login', // '/admin/acl/index/login',
  USERINFO_URL = '/api/user/info', // '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

/**
 * 登录接口
 * @param data
 * @returns
 */
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

/**
 * 获取用户信息
 * @returns
 */
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)

/**
 * 退出登录
 * @returns
 */
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
