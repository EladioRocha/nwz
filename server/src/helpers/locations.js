const LOCATIONS_URL = 'http://vikku.info/programming/geodata/geonames-get-country-state-city-hierarchy.htm'
const SELECT_DATA = [{selector: '#continent', value: '6255149'}, {selector: '#country', value: '3996063'}, {selector: '#province'}, {selector: '#region'}]
const SELECT_STATE_OPTIONS = '#province > option'
const SELECT_CITY_OPTIONS = '#region > option'
const DELAY_TIME = 5000
const MONGO_URI_DEV = 'mongodb://localhost:27017/nwz'
const OBJECT_ID_MEXICO = '5ecdcaac6c9c6564c47acb94'
const SELECT_INVALID_NAME = 'Select'

const path = require('path'),
    puppeteer = require('puppeteer'),
    $ = require('cheerio'),
    mongoose = require('mongoose'),
    State = require(path.join(__dirname, '..', 'models', 'States')),
    City = require(path.join(__dirname, '..', 'models', 'Cities'));


mongoose.connect(MONGO_URI_DEV);

async function main() {
    const {browser, page} = await openBrowser()
    await page.waitFor(DELAY_TIME)
    await page.select(SELECT_DATA[0].selector, SELECT_DATA[0].value)
    await page.waitFor(DELAY_TIME)
    await page.select(SELECT_DATA[1].selector, SELECT_DATA[1].value)
    await page.waitFor(DELAY_TIME)
    await saveStatesAndCities(page, $(SELECT_STATE_OPTIONS, await page.content()).toArray());
    await browser.close()
}

async function saveStatesAndCities(page, states) {
    for(let state of states) {
        state = {name: $(state).text(), value: $(state).attr('value')}
        if(state.name !== SELECT_INVALID_NAME) {
            let stateData = await State.create({
                country_id: mongoose.Types.ObjectId(OBJECT_ID_MEXICO),
                name: state.name
            })
            await page.select(SELECT_DATA[2].selector, state.value)
            await page.waitFor(DELAY_TIME)
            for(let city of $(SELECT_CITY_OPTIONS, await page.content()).toArray()) {
                city = $(city).text()
                if(city !== SELECT_INVALID_NAME) {
                    await City.create({
                        state_id: stateData._id,
                        name: city
                    })
                }
            }
        }
    }
}

async function openBrowser() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(LOCATIONS_URL)
    return {browser, page}
}

main()