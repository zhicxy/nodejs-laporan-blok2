const getExcelData_1 = require('../utils/excel');
const testController = require('../controllers/testController');

exports.hrIni = tglHariIni('lengkap');

exports.emptyMidnight = { 
        page: 'midnight',

        judul: 'Blok 2 | Entry Midnight',
        
        style1: 'active',
        style2: '',
        style3: '',
        style4: '',


        prod21: '',
        prod22: '',
        prod28: '',
        totalProduksi: '',

        flowGasB1: '',
        energiB1: '',
        flowGasB2: '',
        energiB2: '',

        gwhProduksi: '0'

    };

let gwhB2 = 810 / 1000;
exports.midnight = { 
        page: 'midnight',

        judul: 'Blok 2 | Entry Midnight',
        
        style1: 'active',
        style2: '',
        style3: '',
        style4: '',


        prod21: 810.90,
        prod22: 810.90,
        prod28: 810.90,
        totalProduksi: 810.90,

        flowGasB1: 27,
        energiB1: 25,
        flowGasB2: 25,
        energiB2:25,

        gwhProduksi: gwhB2

    };

exports.dispatcher = { 
        page: 'dispatcher',

        judul: 'Blok 2 | Entry Dispatcher',
        
        style1: '',
        style2: 'active',
        style3: '',
        style4: '',

        prod21: '',
        prod22: '',
        prod28: '',
        totProd: '',
        consGasB2 : '',

    };


exports.koordinasi = { 
        page: 'koordinasi',

        judul: 'Blok 2 | Entry Koordinasi',
        
        style1: '',
        style2: '',
        style3: 'active',
        style4: '',

        hariIni: testController.hariIni(),

        beban21: '',
        beban22: '',
        beban28: '',
        totBeban: '',
        vCondenser: '',
        ps: '',
        totProd: '0',
        agc21 : '',
        agc22 : '',
        pNG21 : '',
        pNG22 : '',
        fNG21 : '',
        fNG22 : '',
        pPSI : '0'

    };
exports.pnp =  {

    page: 'pnp',

    judul: 'Blok 2 | Entry PNP',

    style1: '',
    style2: '',
    style3: '',
    style4: 'active',

    beban21: '',
    beban22: '',
    beban28: '',
    totalBeban: '',

    flowGasB1: '',
    energiB1: '',
    flowGasB2: '',
    energiB2: '',

    prod21: '',
    prod22: '',
    prod28: '',

    hariIni: testController.hariIni('pendek')
};


function tglHariIni(params){
    console.log(params);
    if (params == 'lengkap') {
        return 'Minggu, 20 Desember 2022'
    }
    if (params == 'pendek') {
        return '20/12/2025'
    }

};
