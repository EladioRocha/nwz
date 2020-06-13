const path = require('path'),
    mongoose = require('mongoose'),
    moment = require('moment-timezone'),
    Record = require(path.join(__dirname, '..', 'models', 'Records')),
    Book = require(path.join(__dirname, '..', 'models', 'Books')),
    CronJob = require('cron').CronJob;

new CronJob('0 23 * * * *', verifyDateExpired, null, true, 'America/Mexico_City').start()
  
async function verifyDateExpired() {
    const currentDate = new Date(moment.tz('America/Mexico_City').format()),
        todayDate = new Date(moment.tz('America/Mexico_City').startOf('day').format())
        data = await Record.aggregate([
            {
                $match: {
                    end_date: {
                        $gte: todayDate,
                        $lte: currentDate
                    },
                    format_id: mongoose.Types.ObjectId('5ecec9791ba037668c2fc64c')
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'book_id',
                    foreignField: '_id',
                    as: 'book_id'
                }
            },
            {
                $group: {
                    originalId: {$last: '$_id'},
                    _id: '$book_id',
                    end_date: {$last: '$end_date'}
                }
            },
            {
                $project: {
                    _id: '$originalId',
                    book_id: '$_id',
                    end_date: '$end_date'
                }   
            }
        ]);


    for(let record of data) {
        const borrowed = record.book_id[0].borrowed
        borrowed[0] = false
        await Book.updateOne(
            { _id: mongoose.Types.ObjectId(record.book_id[0]._id) },
            { $set: { borrowed: borrowed } } 
        )
    }    
}