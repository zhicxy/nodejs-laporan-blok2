const testData = require('../utils/testData');
const testController = require('./testController');

const db = require('../config/db');
const dailyData = db.collections;
const hariIni = testController.hariIni;

exports.index = async (req, res) => {
    try {
    const data = await dailyData.findOne({ date: hariIni });
    } catch (err) {
        console.error(err)
    }
    //testData.koordinasi.totProd = data.data00.totProd;
    res.render('index', testData.pnp);
};
exports.ambilData = async (req, res) => {
    const data = await dailyData.findOne({ date: hariIni });
    if (data) {
        try {
            testData.pnp.beban21 = data.data06.bebanGT21;
            testData.pnp.beban22 = data.data06.bebanGT22;
            testData.pnp.beban28 = data.data06.bebanST28;
            testData.pnp.totalBeban = data.data06.totalBeban;
            testData.pnp.energiB1 = data.data00.energiB1;
            testData.pnp.energiB2 = data.data00.energiB2;
            testData.pnp.prod21 = Number(data.data00.prod21) * 1000;
            testData.pnp.prod22 = Number(data.data00.prod22) * 1000;
            testData.pnp.prod28 = Number(data.data00.prod28) * 1000;
        } catch (err) {
            //console.error(err);
            res.send({data : ''})
        }
        res.send(testData.pnp)
    } else {
            res.send('tidak ada data')
    }


    //res.render('index', testData.pnp);
};