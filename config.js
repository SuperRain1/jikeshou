var host = "https://www.jikeshou.com.cn"//线上
// var host = "http://140.143.171.159"//测试

var api ={
  host,
  // 接口地址
  codeHandler: `${host}/jikeshou/mini/user/codeHandler`, //登陆
  getUser: `${host}/jikeshou/mini/user/getUser`, //获取绑定手机号和订单数
  index: `${host}/jikeshou/index`, //首页
  myOrder: `${host}/jikeshou/mini/user/myOrder`,//我的订单
  myAddress: `${host}/jikeshou/mini/user/myAddress`,//我的地址
  updateAddress: `${host}/jikeshou/mini/user/updateAddress`,//修改、新增地址
  getCategory: `${host}/jikeshou/mini/Goods/getcategory`,//获取回收页一级分类
  getGoods: `${host}/jikeshou/mini/Goods/getgoods`,//获取回收页二级分类
  addCollector: `${host}/jikeshou/mini/collector/AddCollector`,//添加揽件人  增加收件人信息
  addScore: `${host}/jikeshou/mini/score/addscore`,//评价订单
  help: `${host}/jikeshou/mini/user/help`,//帮助中心
  addUser: `${host}/jikeshou/mini/user/addUser`,//更新用户信息
  getSmsCode: `${host}/jikeshou/mini/user/getSmsCode`,//获取验证码
  addOrder: `${host}/jikeshou/mini/order/addorder`,//下单
  banner: `${host}/jikeshou/index/detail`, //banner详情
  cancelOrder: `${host}/jikeshou/mini/order/updateUserOrderstatus`,//取消订单
};
module.exports = api