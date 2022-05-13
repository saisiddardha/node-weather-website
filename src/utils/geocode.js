const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidnNpZGRhcmRoYSIsImEiOiJjbDJ5eGw1cmExYWNvM2NwZjIwdzFjNzd0In0.H8t1VkIevTG4pc8sw_Qxnw&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to mapbox api')
        } else if ((!body.features) || body.features.length === 0) {
            callback('Unable to fetch location. Try with different string')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode