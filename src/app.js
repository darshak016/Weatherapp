const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express();

const weatherdata = require('../utilities/weather')

const port = process.env.PORT || 3000

const Staticpath = path.join(__dirname,'../public')

const views = path.join(__dirname, '../views')

app.set('view engine','hbs')
app.set('views',views)
app.use(express.static(Staticpath))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather App'
    })
})

//localhost:3000/weather?address=surat
app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            err: "You must Enter Address in search box"
        })
    }
    weatherdata(address,(err,{temp,min_temp,max_temp,description,city} = {})=>{
        if(err){
            return res.send({
                err
            })
        }
        console.log(temp,min_temp,max_temp,description,city)
        res.send({
            temp,
            min_temp,
            max_temp,
            description,
            city 
        })
    })
})
//write after all route
app.get('*',(req,res)=>{
    res.render('error',{
        title: 'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('server is running on port',port)
})