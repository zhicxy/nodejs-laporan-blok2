const testData = require('../utils/testData');
const testController = require('./testController');

const db = require('../config/db');
const dailyData = db.collections;
const hariIni = testController.hariIni;

exports.index = async (req, res) => {
    testData.dispatcher.prod21 = '';
    testData.dispatcher.prod22 = '';
    testData.dispatcher.prod28 = '';
    testData.dispatcher.totProd = '';
    testData.dispatcher.totProd = '';
    res.render('index', testData.dispatcher)
};

exports.load = async (req, res) => {
    const data = await dailyData.findOne({date : hariIni});
    console.log(data);

    console.log(testData.dispatcher);

    testData.dispatcher.prod21 = data.data00.prod21;
    testData.dispatcher.prod22 = data.data00.prod22;
    testData.dispatcher.prod28 = data.data00.prod28;
    testData.dispatcher.totProd = data.data00.totalProduksi;

    console.log(testData.dispatcher);



    res.render('index', testData.dispatcher)

    console.log(`load button clicked`);
};

/*
exports.values = async (req, res) => {
    res.render('index', testData.midnight);
};

exports.submit = async (req, res) => {

    // validate all datas is number if not valid return empty form
    if (!isNum(req.body)) {
        console.log('Peringatan! tidak valid')
        res.render('index', testData.emptyMidnight);
    } else {

        // check if ther is no data is empty
        // create doc after input data validated
        const docExist = await dailyData.findOne({ date: hariIni });
        if (docExist) {                                                         
            console.log('disini data exist')                                            // peringatkan client bahwa data exist, apakah ingin mengupdate data
        } else {
            console.log('data tidak exist');

            dailyData.insertOne({
                date: hariIni,
                data00: {
                    prod21: parseFloat(req.body.prod21),
                    prod22: parseFloat(req.body.prod22),
                    prod28: parseFloat(req.body.prod28),

                    totalProduksi:
                        parseFloat(req.body.prod21) +
                        parseFloat(req.body.prod22) +
                        parseFloat(req.body.prod28),

                    flowGasB1: parseFloat(req.body.flowGasB1),
                    energiB1: parseFloat(req.body.energiB1),
                    flowGasB2: parseFloat(req.body.flowGasB2),
                    energiB2: parseFloat(req.body.energiB2),
                }


            });

        }





        testData.midnight.prod21 = parseFloat(req.body.prod21);
        testData.midnight.prod22 = parseFloat(req.body.prod22);
        testData.midnight.prod28 = parseFloat(req.body.prod28);

        testData.midnight.flowGasB1 = parseFloat(req.body.flowGasB1);
        testData.midnight.energiB1 = parseFloat(req.body.energiB1);
        testData.midnight.flowGasB2 = parseFloat(req.body.flowGasB2);
        testData.midnight.energiB2 = parseFloat(req.body.energiB2);

        testData.midnight.totalProduksi = testData.midnight.prod21
            + testData.midnight.prod22
            + testData.midnight.prod28;

        testData.midnight.gwhProduksi = testData.midnight.totalProduksi / 1000;
        testData.midnight.gwhProduksi = testData.midnight.gwhProduksi.toFixed(3);


        res.render('index', testData.midnight);

    };
};

exports.anotherSubmit = async (req, res) => {
    if (!isNum(req.body)) {
       console.log('Data tidak valid! Periksa data kembali')
       res.send({ nilai : 0})
    } else {

    const tota = parseFloat(req.body.prod21)
                    +parseFloat(req.body.prod22)
                    +parseFloat(req.body.prod28)
    //res.send(`Total Produksi: ${tota/1000} GWh`);
    res.send({nilai: 256});
    }

    
}

exports.mencoba = async (req, res) => {

    res.send('nama');
}

exports.cobaPost = async (req, res) => {
    if (!isNum(req.body)) {
        res.send({
            modalHeader: 'Data Tidak Valid',
            modalBody:  'Periksa data kembali'


        })
    }



    const today = req.query.date;
    const data = {
        date    : today,
        data00  : req.body
    }

    try {
        const docExist = await dailyData.findOne({ date: today });
        if (!docExist) {
            dailyData.insertOne(data);
            res.send(data);
        } else {
            res.send({ 
                modalHeader: 'Data Conflict', 
                modalBody: `Data tanggal ${today} telah diinput sebelumnya. Update dengan data saat ini?`  })
            // data conflict pas mengupload. beri tombol "update" dan "Close"
            // jika tombol update di click maka update data 
        }
    } catch (err) {
        console.error(err);
        res.send('Terjadi kesalahan pada database. Perbaikan sedang dilakukan.')
    }
}

exports.cobaUpdate = async (req, res) => {
    const today = req.query.date;
    const data = req.body;
    
    try {
        
        const docExist = await dailyData.findOne({ date: today });
        if (docExist) {
            dailyData.updateOne(
                { date: today },
                {
                    $set: { 'data00': data },
                    $currentDate: { lastModified: true }
                }
            );
            res.send(data);
        } else {
            res.send(`Data tanggal ${today} tidak ditemukan`);
        }
    } catch (e) {
        console.error(e)
        res.send('terjadi kesalahan database');
    }
}

function isNum(obj) {

    for (let key in obj) {
        numToCheck = obj[key];

        if (!Number(numToCheck)) {
            return false;
        }
    }
    return true;
}


*/