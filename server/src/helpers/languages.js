const LANGUAGES = ['Chino', 'Español', 'Inglés', 'Hindi', 'Arabe', 'Portugués', 'Bengalí', 'Ruso', 'Japonés', 'Panayabí']
const MONGO_URI_DEV = 'mongodb://localhost:27017/nwz'

const path = require('path'),
    mongoose = require('mongoose'),
    Language = require(path.join(__dirname, '..', 'models', 'Languages'));

mongoose.connect(MONGO_URI_DEV);

async function main() {
    for(let language of LANGUAGES) {
        await Language.create({
            name: language
        })
    }
}

main()