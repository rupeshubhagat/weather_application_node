const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// Define a path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

// set up handlebar and view engine.
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

// set up static path:
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
   res.render('index',{
       title:'Weather',
       name:'RUPESH BHAGAT'
   });
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'RUPESH BHAGAT'
    });
 })


 
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'RUPESH BHAGAT'
    });
 })

 
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
      return res.send({
          error:'You must provide a address !'
      });
    }
    geocode(req.query.address,(error,{latidue,longitude,location}={})=>{
      if(error){
       return res.send({ error })
      }

      forecast(latidue,longitude,(error,forecastData)=>{
        if(error){
            return res.send({ error })
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
      })

    })
})


 app.get('/help/*',(req,res)=>{
    res.render('pageNotFound',{
        titte: '404',
        error: 'Help page content not found'
    })
})

 app.get('*',(req,res)=>{
    res.render('pageNotFound',{
        titte: '404',
        error: '404 page not found'
    })
 })

app.listen(3000,()=>{
    console.log('Web server started on port 3000');
})





