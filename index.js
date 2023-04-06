const express = require('express')
const app = express()
const port = 3000

// app.use "tat cac cac duong dan qua duong dan và function này"
app.use((req, res, next) => {
    res.json({
        'name': 'Ngoc',
        
    })
})


app.get('/', (req, res) => {
    console.log("Ngọc ngu");
    res.send('<a href="http://sv.dut.udn.vn/">Ngọc đầu bòi!</a>')
})

app.listen(port, () => console.log(`example listening at port ${port}`))