const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../src/templates/views')
const partialPath=path.join(__dirname,'../src/templates/partials')

//set up static directories to serve
app.use(express.static(publicDirectoryPath))

//set up handle bars engine
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//home page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sourav Singh'
    })
})

//help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Sourav Singh'
    })
})

//about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Sourav Singh'
    })

})
//weather page
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
            error:'Please provide some address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                location:data.location,
                forecast:forecastData,
                address:req.query.address
            })
        })
    })
})


//another error page
app.get('/help/*',(req,res)=>{
    res.render('errorPage',{//jis name se views me file create krte hai wahi name yhn likhte h
        title:'404',
        name:'Sourav Singh',
        errorMessage:'Help page not found'
    })

})


//error page---must be at last
app.get('*',(req,res)=>{
    res.render('errorPage',{
        title:'404',
        name:'Sourav singh',
        errorMessage:'Page not found'
    })

})

//use to start the server
app.listen(port,()=>{
console.log('Server is up on port '+port)
})