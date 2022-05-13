const express = require('express')
const path = require('path')
const hbs = require('hbs')

//importing utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Settingup static directory for Express
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'vsiddardha@qualys.com'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'vsiddardha@qualys.com',
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'vsiddardha@qualys.com',
        title: "Help"
    })
})

//realtime weather data
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'search address must be entered'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { forecastData, temperature, weatherDesc } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecastData,
                temperature,
                weatherDesc,
                location,
                address
            })
        })
    })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'search term must be entered'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'vsiddardha@qualys.com',
        title: "404",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'vsiddardha@qualys.com',
        title: "404",
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running')
})