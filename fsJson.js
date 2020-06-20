const fs = require('fs')
fs.readFile('./store-data/goods.json', 'utf8', (err, data) => {
  const newData = JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.map((value, index) => {
    if (value.IMAGE1 !== null) {
      i++
      pushData.push(value)
    }
  })
  fs.writeFile('./store-data/newGoods.json',JSON.stringify(pushData),err=>{
    if(err) console.log('写文件失败')
    else console.log('写文件成功')
  })
})

