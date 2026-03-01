const express = require('express');
const router = express.Router();

/*
express().use(express.json());
express().use(express.urlencoded({ extended: true}));
*/


// excel handler
const getExcelData_1 = require('../utils/excel');

/*
router.get('/', async (req, res) => {
    res.send('Ini halaman form');
});




router.get('/midnight/values', async(req, res) => {
    dataMidnight.gwhProduksi = 90;
    res.render('index', dataMidnight);
});

router.post('/midnight/values/submit', async(req, res) => {
    
    dataMidnight.prod21 = parseFloat(req.body.prod21) ;
    dataMidnight.prod22 = parseFloat(req.body.prod22) ;
    dataMidnight.prod28 = parseFloat(req.body.prod28) ;

    dataMidnight.flowGasB1 = parseFloat(req.body.flowGasB1) ;
    dataMidnight.energiB1 = parseFloat(req.body.energiB1) ;
    dataMidnight.flowGasB2 = parseFloat(req.body.flowGasB2) ;
    dataMidnight.energiB2 = parseFloat(req.body.energiB2) ;
    
    dataMidnight.totalProduksi = dataMidnight.prod21     
                                + dataMidnight.prod22
                                + dataMidnight.prod28;

    dataMidnight.gwhProduksi = dataMidnight.totalProduksi / 1000;
    dataMidnight.gwhProduksi = dataMidnight.gwhProduksi.toFixed(3);

    // the logic :
    // 1. check if collection is exist
    //      if not exist create one
    //      if exist, notify client to update collection with current data.




    res.render('index',  dataMidnight);

    //dataMidnight.gwhProduksi = 1000;
    //res.render('index', dataMidnight);
});

*/






router.get('/dispatcher', async (req, res) => {
    res.render('index', { 
        page: 'dispatcher',

        judul: 'BLok 2 | Dispatcher',

        style1: '',
        style2: 'active',
        style3: '',
        style4: ''
    });
});

router.get('/koordinasi', async (req, res) => {
    res.render('index', { 
        page: 'koordinasi',

        judul: 'Blok 2 | Koordinasi',

        style1: '',
        style2: '',
        style3: 'active',
        style4: ''
    });
});
router.get('/pnp', async (req, res) => {
    res.render('index', { 
        page: 'pnp',

        judul: 'Blok 2 | Laporan PNP',

        style1: '',
        style2: '',
        style3: '',
        style4: 'active'
    });
});
module.exports = router;