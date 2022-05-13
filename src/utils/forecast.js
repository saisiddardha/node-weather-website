const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4148ffb6c5671e483067fe03295dd2ab&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to weather api')
        } else if (body.error) {
            callback('Unable to fetch weather updates. Try different coordinates')
        } else {
            callback(undefined, {
                forecastData: body.current.weather_descriptions[0] + ". It's " + body.current.temperature + " degrees out",
                temperature: body.current.temperature,
                weatherDesc: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast