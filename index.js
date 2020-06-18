const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const mongoose = ('mongoose')
const {connect, initSchemas} = require('./database/init')
const user = require('./appApi/user')
;(async () => {
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  const oneUser = new User({userName: 'jspang13', password: '123456'})

  oneUser.save().then(() => {
    console.log('插入成功')

  })
  const users = await User.find({}).exec()

  console.log('------------------')
  console.log(users)
  console.log('------------------')
})()

const app = new Koa()
const router = Router()

app.use(cors())

router.use('/user', user.routes())

app.use(router.routes())

app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server is start at 3000 port')
})

