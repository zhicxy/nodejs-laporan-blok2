
const ExcelJS = require('exceljs');
const wb = new ExcelJS.Workbook();

async function getExcelData(filePath, sheetName = 'Sheet1') {
    await wb.xlsx.readFile(filePath)
    const ws = wb.getWorksheet(sheetName);

    const a1 = ws.getCell('A1');
    const a2 = ws.getCell('A2');
    const a3 = ws.getCell('A3');
    const cellValue = [a1.value, a2.value, a3.value];
    return cellValue;
}


/*
 * melakukan koneksi ke file excel midnigh dan dan data pemakaian gas kemudian
 * menrik data dari cell sesuai parameter dan menyimpannya kedalam array
 */

let arExcel = [];
async function getExcelData_1(
    midnightWsName,
    gasWsName,
    prod21Cell,
    prod22Cell,
    prod28Cell,
    mmscfdB1Cell,
    mmscfdB2Cell,
    mmbtuB1Cell,
    mmbtuB2Cell) {
    const midnightPath = '../Source1.xlsm'
    const gasPath = '../Source2.xlsm'

         
    try{

        const wbMidnight = await wb.xlsx.readFile(midnightPath);
        const wsMidnight = wbMidnight.getWorksheet(midnightWsName);
//        console.log('connected to file midnight');

        const prod21 = wsMidnight.getCell(prod21Cell).value;
        const prod22 = wsMidnight.getCell(prod22Cell).value;
        const prod28 = wsMidnight.getCell(prod28Cell).value;

        const wbGas = await wb.xlsx.readFile(gasPath);
        const wsGas = wbGas.getWorksheet(gasWsName);
//        console.log('connected to file data pemakaian gas');

        const mmscfdB1 = wsGas.getCell(mmscfdB1Cell).value;
        const mmscfdB2 = wsGas.getCell(mmscfdB2Cell).value;
        const mmbtuB1 = wsGas.getCell(mmbtuB1Cell).value;
        const mmbtuB2 = wsGas.getCell(mmbtuB2Cell).value;

        arExcel.push(prod21, prod22, prod28, mmscfdB1, mmscfdB2, mmbtuB1, mmbtuB2);
        return arExcel;

    } catch (e) {
        console.error(e.message);

    }
}

/*
 * async function getExcelData_1 tidak dapat mengembalikan nilai selain premis 
 * sehingga harus dipanggil dengan sebuah premise. 
 */
getExcelData_1('5', 'Sheet1', 'B6', 'C6', 'D6', 'B8', 'C8', 'D8', 'E8')
    .then((val)=>{
        //console.log(val[0]);
        console.log(val[1]);
    })
    .catch((e)=>{console.error(e.message)});

async function addSheet(filepath, sheetName) {
    await wb.xlsx.readFile(filepath);
    console.log('worksheet length = ' + wb.worksheets.length);
}
addSheet('./excel_to_upload.xlsx', 'Nama Sheet Baru');



module.exports = getExcelData_1;