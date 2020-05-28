const FORMATS = ['PDF', 'EPUB', 'FÍSICO']
const MONGO_URI_DEV = 'mongodb://localhost:27017/nwz'

const path = require('path'),
    mongoose = require('mongoose'),
    Format = require(path.join(__dirname, '..', 'models', 'Formats'));

mongoose.connect(MONGO_URI_DEV);

async function main() {
    for(let format of FORMATS) {
        await Format.create({
            name: format
        })
    }
}

main()