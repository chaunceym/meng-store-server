const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router()

router
  .get('/', async (ctx, next) => {
    ctx.body = '这是用户操作界面'
    next()
  })
  .post('/register', async (ctx, next) => {
    const User = mongoose.model('User')
    const newUser = new User(ctx.request.body)

    await newUser.save()
      .then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    })
      .catch(err => {
        ctx.body = {
          code: 500,
          message: err
        }
      })
  })
module.exports = router


