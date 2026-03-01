const testData = require('../utils/testData');
const testController = require('./testController');

const db = require('../config/db');
const { param } = require('../routes/koordinasiRouter');
const dailyData = db.collections;
// const hariIni = "12/11/2025";
const hariIni = testController.hariIni;

exports.index = async (req, res) => {
    const data = await dailyData.findOne({ date: hariIni });
    const gwh = data.data00.totalProduksi/1000
    testData.koordinasi.totProd = gwh.toFixed(2);
    res.render('index', testData.koordinasi);
};
exports.wa = async (req, res) => {
    const data = req.body;
    const laporan = buatLaporanWhatsapp(data);
    res.status(200).json(laporan);
}
exports.getGas = async (req, res) => {
    const data = req.body;
    const data1 = { 'nama' : 'alex'}
    res.status(200).json(data1);
}
exports.gas = async (req, res) => {
    const data1 = req.body;
    const laporanGas = buatLaporanGas(data1)
    res.status(200).json(laporanGas);
    
}
function buatLaporanGas(params) {
    const teksLaporanGas = 
`*Laporan Gas Up Sengkang*

GT21 : ${params.beban21} MW
GT22 : ${params.beban22} MW
ST28 : ${params.beban28} MW
Total Beban : ${params.totalBeban} MW

Supply Gas 
Pressure NG :  ${psiToBar(params.psi)} bar
GT21 + blok1 : ${params.fNG21} mmscfd
GT22 : ${params.fNG22} mmscfd

Pres. Upstream GT21 : ${params.pNG21} Bar
Pres. Upstream GT22 : ${params.pNG22} Bar
    `
    return teksLaporanGas
}
function buatLaporanWhatsapp(params) {

    const textLaporan = `
*Laporan Operasional UP Sengkang Blok 2*

Hari, Tanggal : *Sabtu, 13 Desember 2025*
Pukul : ${params.jam} WITA

GT21 : ${params.beban21} MW
GT22 : ${params.beban22} MW
ST28 : ${params.beban28} MW
Total Beban : ${params.totalBeban} MW

Vacuum : ${params.vacuum} BarA
Pemakaian Sendiri : ${params.ps} MW

AGC 21 ${params.agc21}
AGC 22 ${params.agc22}

Supply Gas 
GT21 + Blok1 : ${params.fNG21} mmscfd
GT22 : ${params.fNG22} mmscfd

Pressure NG 21 : ${params.pNG21} Bar
Pressure NG 22 : ${params.pNG22} Bar
    `;


    const teksLaporanJam6 = `
*Laporan Operasional UP Sengkang Blok 2*

Hari, Tanggal : *Sabtu, 13 Desember 2025*
Pukul : ${params.jam} WITA

GT21 : ${params.beban21} MW
GT22 : ${params.beban22} MW
ST28 : ${params.beban28} MW
Total Beban : ${params.totalBeban} MW

Vacuum : ${params.vacuum} BarA
Pemakaian Sendiri : ${params.ps} MW

Total Produksi tgl 12 Desember 2025 : ${params.totalProduksi} GWh

AGC 21 ${params.agc21}
AGC 22 ${params.agc22}

Supply Gas 
GT21 + Blok1 : ${params.fNG21} mmscfd
GT22 : ${params.fNG22} mmscfd

Pressure NG 21 : ${params.pNG21} Bar
Pressure NG 22 : ${params.pNG22} Bar
    `;

    if (params.jam == '06:00') {
        updateSatu(params);
        return  teksLaporanJam6;
    } else {
        return textLaporan;
    }

    return teksLaporan;
}

function psiToBar(psi) {
    const bar = psi*0.0689476;
    return  bar.toFixed(2);
}

async function updateSatu(params) {
    const keyJam = 'data06';
    try {
       const data =  await dailyData.updateOne(
            { date : hariIni },
            {
                $set: {
                    'data06': {
                        'bebanGT21': params.beban21,
                        'bebanGT22': params.beban22,
                        'bebanST28': params.beban28,
                        'totalBeban': params.totalBeban,
                        'vacuum': params.vacuum,
                        'ps': params.ps,
                        'agc21': params.agc21,
                        'agc22': params.agc22,
                        'flowB1': params.fNG21,
                        'flowB2': params.fNG22,
                        'pNG21': params.pNG21,
                        'pNG22': params.pNG22
                } },
                $currentDate: {lastModified: true}
            }
        )

        if (data) {
            console.log(`berhasil update data tanggal ${hariIni}`);
        } else {
            console.log(`tidak berhasil update data tanggal ${hariIni}`);
        }
        
    } catch (err) {
        console.error(err);
    }
}