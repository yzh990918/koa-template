module.exports = {
  successResponse: (msg = '操作成功', data = null) => {
    return {
      code: 200,
      msg,
      data,
    }
  },
}
