import http from './http'

export const forget = function () {
  return http.get('/api/mi')
}

// 获取验证码
export const sendCode = function (mobile, agentCode) {
  return http.post('/login/sendCode', {mobile: mobile, agentCode: agentCode})
}

// 注册
export const register = function (username, code, password, agent_code) {
  return http.post('login/register', {username: username, code: code, password: password, agent_code: agent_code}, true)
}

// 登录
export const login = function (username, password) {
  return http.post('/Login/login', {username: username, password: password}, true)
}

// 找回密码 验证码
export const fsendCode = function (mobile) {
  return http.post('/login/fsendCode', {mobile: mobile}, true)
}

// 找回密码
export const findpassword = function (mobile, code, new_password) {
  return http.post('login/findpassword', {mobile: mobile, code: code, new_password: new_password}, true)
}

// 首页商场
export const getGoodsList = function (limit, page, goodsName) {
  return http.post('/Goods/getGoodsList', {limit: limit, page: page, goodsName}, true)
}

// 商品详情
export const getGoodsDetail = function (goodsId) {
  return http.post('/Goods/getGoodsDetail', {goodsId: goodsId}, true)
}

// 创建订单
export const buildOrder = function (goods_id, goods_num, address_id) {
  return http.post('/Order/buildOrder', {goods_id: goods_id, goods_num: goods_num, address_id: address_id}, true)
}

// 余额支付
export const goYEpay = function (orderId, total_money) {
  return http.post('/Order/goYEpay', {orderId: orderId, total_money: total_money}, true)
}

// 支付宝支付
export const goZFBPay = function (orderId, total_money) {
  return http.post('/Order/goZFBPay', {orderId: orderId, total_money: total_money}, true)
}

// 购货款支付
export const goGHKpay = function (orderId, total_money) {
  return http.post('/Order/goGHKpay', {orderId: orderId, total_money: total_money}, true)
}

// 微信支付
export const goWXPay = function (orderId, total_money) {
  return http.post('/Order/goWXPay', {orderId: orderId, total_money: total_money}, true)
}

// 订单列表

export const getOrderList = function (page, limit, status) {
  return http.post('/Order/getOrderList', {page: page, limit: limit, status}, true)
}

// 取消订单
export const cancelOrder = function (orderId) {
  return http.post('/order/cancelOrder', {orderId: orderId}, true)
}

// 确认收货
export const receipt = function (orderId) {
  return http.post('/Order/receipt', {orderId: orderId}, true)
}

// 订单详情
export const orderDetail = function (orderId) {
  return http.post('/Order/orderDetail', {orderId: orderId}, true)
}

// 设备
export const machineList = function (page, sn) {
  return http.post('/machine/index', {page: page, sn: sn}, true)
}
// 报单

export const order_list = function (page, id, status) {
  return http.post('/machine/order_list', {page: page, id: id, status: status}, true)
}

// 报单详情
export const machineDetail = function (id) {
  return http.post('/machine/order_detail', {id: id}, true)
}

// 团队
export const getMyTeamData = function () {
  return http.post('/My_Team/getMyTeamData', {}, true)
}

// 直推
export const getZTAgentList = function (page, limit, mobile) {
  return http.post('/My_Team/getZTAgentList', {page: page, limit: limit, mobile: mobile}, true)
}

// 间推
export const getJTAgentList = function (page, limit, mobile) {
  return http.post('My_Team/getJTAgentList', {page: page, limit: limit, mobile: mobile}, true)
}

// 代理详情
export const getTeamDetall = function (agent_id) {
  return http.post('/My_Team/getAgentDetall', {agent_id: agent_id}, true)
}

// 个人信息
export const getAgentDetall = function () {
  return http.post('/My/getAgentDetall', {}, true)
}

// 金额
export const getMyReward = function () {
  return http.post('/Reward/getMyReward', {}, true)
}

// 实名
export const getAuth = function (name, ids, alipay, password) {
  return http.post('/My/auth', {name: name, ids: ids, alipay: alipay, password: password}, true)
}

// 获取当前是否实名认证
export const getAgentPayData = function () {
  return http.post('/My/getAgentPayData', {}, true)
}

// 提现
export const getApply = function (name, alipay, money) {
  return http.post('/My/apply', {name: name, alipay: alipay, money: money}, true)
}

// 体现明细
export const getRewardSoure = function (type, page, limit) {
  return http.post('/Reward/getRewardSoure', {type: type, page: page, limit: limit}, true)
}

// 修改昵称
export const editAgent = function (nickname) {
  return http.post('/My/editAgent', {nickname: nickname}, true)
}

// 修改头像
export const editHeadPicture = function (file) {
  return http.post('/My/editHeadPicture', {file: file}, true)
}

// 修改密码
export const editAgentPassword = function (old_password, password, new_password) {
  return http.post('/My/editAgentPassword', {old_password: old_password, password: password, new_password: new_password}, true)
}

// 分享海报
export const getMask = function (url) {
  return http.post('/dui/getMask', {url: url}, true)
}

// 收货地址
export const getAddressList = function () {
  return http.post('/address/getAddressList', {}, true)
}

// 添加
export const getAddressAdd = function (name, mobile, province, city, county, detail_address, is_default) {
  return http.post('/address/add', {name: name, mobile: mobile, province: province, city: city, county: county, detail_address: detail_address, is_default: is_default}, true)
}

// 删除地址
export const getAddressDel = function (address_id) {
  return http.post('/address/dele', {address_id: address_id}, true)
}

// 设为默认

export const setIsDefault = function (address_id) {
  return http.post('/address/setIsDefault', {address_id: address_id}, true)
}

// 修改
export const getAddressEdit = function (name, mobile, province, city, county, detail_address, is_default, address_id) {
  return http.post('address/edit', {name: name, mobile: mobile, province: province, city: city, county: county, detail_address: detail_address, is_default: is_default, address_id: address_id}, true)
}

// 文章列表
export const getWYDataList = function (page, limit, pid) {
  return http.post('/wy/getkylist', {page: page, limit: limit, pid: pid}, true)
}

// 文章详情
export const getKyDetail = function (ky_id) {
  return http.post('/Wy/detail', {ky_id: ky_id}, true)
}

// 商学院banner
export const getKyBanner = function () {
  return http.post('/Wy/getBanner', {}, true)
}

// 文章分类
export const getCate = function () {
  return http.post('/Wy/catelist', {}, true)
}

// 未读消息数量
export const getNewsNum = function () {
  return http.post('/news/getNewsNum', {}, true)
}

// 消息
export const newsList = function (page, limit, type) {
  return http.post('/news/news_list', {page: page, limit: limit, type: type}, true)
}

// 消息详情
export const newsDetails = function (news_id) {
  return http.post('/news/detail', {news_id: news_id}, true)
}

// 用户协议
export const getuserXieyi = function () {
  return http.post('/wy/getuserXieyi', {}, true)
}

// banner
export const getBanner = function () {
  return http.post('/Goods/getBanner', {}, true)
}

// 达标返现
export const exchange_detail = function (id) {
  return http.post('/machine/exchange_detail', {id: id}, true)
}

// 机主价格表
export const gradeIndex = function () {
  return http.post('/bank/index', {}, true)
}

// 提现记录
export const getApplyList = function (status, page, limit) {
  return http.post('/My/apply_list', {status: status, page: page, limit: limit}, true)
}

// 微信登陆
export const wxLogin = function (code) {
  return http.post('/wx/login', {code: code}, true)
}

// 微信注册
export const wxReg = function (username, code, password, agent_code, access_token, openid) {
  return http.post('/wx/wxReg', {username: username, code: code, password: password, agent_code: agent_code, access_token: access_token, openid: openid}, true)
}

// 绑定微信
export const wxbindUser = function (code) {
  return http.post('/wx/wxbindUser', {code: code}, true)
}

// 获取验证码  判断是否注册
export const wsendCode = function (mobile) {
  return http.post('/login/wsendCode', {mobile: mobile}, true)
}

// 微信绑定用户
export const wxBindUserByMP = function (username, code, password, access_token, openid) {
  return http.post('/wx/wxBindUserByMP', {username: username, code: code, password: password, access_token: access_token, openid: openid}, true)
}

// 余额转增
export const yueTransfer = function (money, password, username) {
  return http.post('/My/yueTransfer', {money: money, password: password, username: username}, true)
}

// 购物款 转赠
export const ghkTransfer = function (money, password, username) {
  return http.post('/My/ghkTransfer', {money: money, password: password, username: username}, true)
}

// 购物款明细
export const getGWKlist = function (page, limit) {
  return http.post('/My/getGWKlist', {page: page, limit: limit}, true)
}
