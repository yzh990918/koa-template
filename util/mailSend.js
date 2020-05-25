const nodemailer = require('nodemailer')
async function send(sendInfo) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, 
    //配置授权邮箱 和授权码
    auth: {
      user: '251205668@qq.com', // generated ethereal user
      pass: 'wsrnpqaeinswbjcc', // generated ethereal password
    },
  })
  // 配置跳转的路由
  let url = 'http://www.imooc.com'
  let info = await transporter.sendMail({
    from: '"认证邮件" <251205668@qq.com>', // sender address
    to: sendInfo.email, // 发送的邮箱账号
    // 配置主题
    subject:
      sendInfo.user !== ''
        ? `你好开发者，${sendInfo.user}！《论坛》验证码`
        : '《论坛》验证码', // Subject line
    text: `您在《论坛》中注册，您的邀请码是${
      sendInfo.code
    },邀请码的过期时间: ${sendInfo.expire}`,// 模拟生成的30分钟倒计时
    html: `
        <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">论坛社区——欢迎来到官方社区</div>
        <div style="padding: 25px">
          <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${
      sendInfo.expire
    }之前重置您的密码：</div>
          <a href="${url}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>
          <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>
    `, // html body
  })

  return 'Message sent: %s', info.messageId
}

module.exports = {
  send
};

