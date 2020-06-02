const STATUS_REPORTS = ['Pendiente', 'En revisión', 'Resuelto']
const MONGO_URI_DEV = 'mongodb://localhost:27017/nwz'

const path = require('path'),
    mongoose = require('mongoose'),
    StatusReport = require(path.join(__dirname, '..', 'models', 'StatusReports'));

mongoose.connect(MONGO_URI_DEV);

async function main() {
    for(let statusReport of STATUS_REPORTS) {
        await StatusReport.create({
            name: statusReport
        })
    }
}

main()