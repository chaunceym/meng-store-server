const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const {connect, initSchemas} = require('./database/init')
const user = require('./appApi/user')
const goods = require('./appApi/goods')

const app = new Koa()
const router = Router()

router.use('/user', user.routes())
router.use('/goods', goods.routes())

app.use(cors())
app.use(bodyParser())

app.use(router.routes())

app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchemas()
})()

app.listen(3000, () => {
  console.log('server is start at 3000 port')
})

