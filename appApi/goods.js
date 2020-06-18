const Router = require('koa-router')
const router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async ctx => {
  fs.readFile('./store-data/goods.json', 'utf8', (err, data) => {
    if (err) return console.log(err)
    const newData = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('goods')
    newData.RECORDS.map(value => {
      const newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('success' + saveCount)
      }).catch(err => {
        console.log('fail' + err)
      })
    })
  })
  ctx.body = '开始导入数据'
})
module.exports = router