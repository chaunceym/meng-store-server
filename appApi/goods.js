const Router = require('koa-router')
const router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router
  .get('/insertAllGoodsInfo', async ctx => {
    fs.readFile('./store-data/goods.json', 'utf8', (err, data) => {
      if (err) return console.log(err)
      const newData = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Good')
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
  .get('/insertAllCategory', async ctx => {
    fs.readFile('./store-data/categories.json', 'utf8', (err, data) => {
      if (err) return console.log(err)
      const newData = JSON.parse(data)
      let saveCount = 0
      const Category = mongoose.model('Category')
      newData.RECORDS.map(value => {
        const newGoods = new Category(value)
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
  .get('/insertCategorySub', async ctx => {
    fs.readFile('./store-data/category_sub.json', 'utf8', (err, data) => {
      if (err) return console.log(err)
      const newData = JSON.parse(data)
      let saveCount = 0
      const Category_sub = mongoose.model('Category_sub')
      newData.RECORDS.map(value => {
        const newGoods = new Category_sub(value)
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
  .post('/getDetailGoodInfo', async ctx => {
    try {
      let {goodId} = ctx.request.body
      const Good = mongoose.model('Good')
      let result = await Good.findOne({ID: goodId}).exec()
      ctx.body = {code: 200, message: result}
    } catch (err) {
      ctx.body = {code: 500, message: err}
    }
  })
  .get('/getCategoryList', async ctx => {
    try {
      const Category = mongoose.model('Category')
      const result = await Category.find().exec()
      ctx.body = {code: 200, message: result}
    } catch (err) {
      ctx.body = {code: 500, message: err}
    }
  })
  .post('/getCategorySubList', async ctx => {
    try {
      const {categoryId} = ctx.request.body
      const Category_sub = mongoose.model('Category_sub')
      const result = await Category_sub.find({
        MALL_CATEGORY_ID: categoryId
      }).exec()
      ctx.body = {code: 200, message: result}
    } catch (err) {
      ctx.body = {code: 500, message: err}
    }
  })
  .post('/getGoodsListByCategorySubId', async ctx => {
    try {
      const {categorySubId, page} = ctx.request.body
      console.log(categorySubId)
      console.log(page)
      const size = 10
      const start = (page - 1) * size
      const Good = mongoose.model('Good')
      const result = await Good.find({
        SUB_ID: categorySubId
      }).skip(start).limit(size).exec()
      console.log(result.length)
      ctx.body = {code: 200, message: result}
    } catch (err) {
      ctx.body = {code: 500, message: err}
    }
  })
module.exports = router