const express = require('express');
const router = express.Router();

// excel handler
const getExcelData_1 = require('../utils/excel');

router.get('/', async (req, res) => {
    res.send('Ini halaman report');
});
router.get('/00', async (req, res) => {
    res.render('laporan-00', { 
        judul: 'Input Data laporan 00:00', 
        prod21: '',
        prod22: '',
        prod28: '',
        totProdB2: '',
        mmscfdB1: '',
        mmscfdB2: '',
        mmbtuB1: '',
        mmbtuB2: ''
    });
});

//isi text field dengan data terbaru sesuai data yang di input di excel
router.get('/00/values', async (req, res) => {
    getExcelData_1('5', 'Sheet1', 'B6', 'C6', 'D6', 'B8', 'C8', 'D8', 'E8')
        .then((val) => {

            const prd21 = val[0];
            const prd22 = val[1];
            const prd28 = val[2];
            const totProd = (prd21 + prd22 + prd28).toFixed(2);
            const flwB1 = val[3];
            const flwB2 = val[4];
            const ergB1 = val[5];
            const ergB2 = val[6];


            res.render('laporan-00', {
                judul: 'Input Data laporan 00:00',
                prod21: prd21,
                prod22: prd22,
                prod28: prd28,
                totProdB2: totProd,
                mmscfdB1: flwB1,
                mmscfdB2: flwB2,
                mmbtuB1: ergB1,
                mmbtuB2: ergB2
            });
        })
        .catch((e) => { console.error(e.message) });
})

module.exports = router;