const express = require('express');
// create web server using express.js
const app = express();
const port = 3000;

const report = require('./routes/report');
const form = require('./routes/form');
const coba_route = require('./routes/testRoute');
const midnight = require('./routes/midnightRouter');
const dispatcher = require('./routes/dispatcherRouter');
const koordinasi = require('./routes/koordinasiRouter');
const pnp = require('./routes/pnpRouter');


//middleware
 app.use(express.json()),
 app.use(express.urlencoded({ extended: true}))

app.use('/report', report);
app.use('/form', form);
app.use('/coba', coba_route);

app.use('/midnight', midnight);
app.use('/dispatcher', dispatcher);
app.use('/koordinasi', koordinasi);
app.use('/pnp', pnp);




//template
app.set('view engine', 'ejs');
const bootstrapIcon =  "bootstrap-icons/font/bootstrap-icons.css";

//mongodb
const db = require('./config/db')
const collections = db.collections;

function getHariIni (){
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1 ;
    const year = now.getFullYear();
    const dt = `${day}/${month}/${year}`;
    
    return dt;
}

let hariIni = getHariIni();
//hariIni = '16/10/2025';

app.get('/', async (req, res) => {
    // res.sendFile('./index.html', { root: __dirname});

    res.render('index', {
 
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
        energiB1:'',
        flowGasB2: '',
        energiB2: '',

        gwhProduksi: 0




    });

//    console.log(arrExcel[3]);
//    const doc = await test("Ned Stark");
//    const email = doc.email;
//    const name = doc.name;
//
//    res.send(doc);

    //app.post('/button-clicked', (req, res) => {
    //    console.log('test click button');
    //})
    // function fetch() {
    //     console.log('fetch button clicked');
    // }

    // const data = await getValueA1('./excel_to_upload.xlsx', 'Sheet1').catch(error => console.log('Terjadi Kesalahan : ', error));
    // const teman = [
    //     {
    //         'nama': 'alex',
    //         'umur': 25,
    //     },
    //     {
    //         'nama': 'bucek',
    //         'umur': 28,
    //     },
    // ];
    // try {
    //     res.render('index', {
    //         judul: 'Daily Report UPSG B2',
    //         teman,
    //         prod21: data[0],
    //         prod22: data[1],
    //         prod28: data[2],
    //         email,
    //         name
    //     })
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
});

app.post('/ap2b/values', async (req, res) =>{
    console.log(req.body);
    res.send(req.body);
})

app.get('/00', async (req, res) => {

    res.render('ap2b', {
        
        judul:'Halaman 00',
        prod21:'Halaman 00',
        prod22:'Halaman 00',
        prod28:'Halaman 00',
        gasConsB2:'Halaman 00',
    
    
    });

    //bagian ini memuat input data midnight dan data pemakaian gas di web (tidak perlu menginput data di excel)


    //input data midnight di web
    //input data pemakaian gas di web
    //kirim ke database sebagai data00
    //kirim data ke tabel excel
    //arahkan ke halaman ap2b

});

/*
 * handle request dari browser untuk kebutuhan input raw data pada pukul 00
 * halaman ini merupakan halaman interaksi dengan raw data
 * diharapkan dapat mengurangi ketergantungan terhadap input data melalui excel
 * yang rawan terhadap error ketika proses collect data menggunakan excelJS libray
*/


app.post('/report/000', async (req, res) =>{
    res.send(req.body.prod21);
})

// post data from text field on "/report/00" to database
app.post('/report/00', async (req, res)=>{
    let data00 = {
        "date": hariIni,
        "data00":{
            "prod21":800.6, 
            "prod22":900.7, 
            "prod28":700.5, 
            "totProdB2":1700.5, 
            "gasCons22":117895.2,
            "mmscfd21":800.6, 
            "mmscfd22":900.7, 
            "mmbtu21":700.5, 
            "mmbtu22":117895.2
        }
    };

    const checkDoc = await collections.findOne({ date: hariIni });
    if (checkDoc) {
        res.send('only update available')
    } else {
        const insertDoc = collections.insertOne(data00);
        insertDoc.then(
            () => {
                res.send(data00);
                
                console.log(`data00 ${hariIni} uploaded to database`);
            },
            (er) => { console.log(er) });
    };
});


app.post('/button-click-2', (req, res) => {
    const dataFromClient = req.body.msg; // get data sent from the client
    console.log(dataFromClient);

    res.json({ status: 'success', message: 'Button click received by server' }); // Send a response back to the client
});
app.get('/ap2b', async (req, res) => {
    
    // get data from database
    try {
        res.render('ap2b', {
            judul: 'Laporan AP2B',
            prod21: 211,
            prod22: 212,
            prod28: 218,
            gasConsB2: 4565
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});




app.get('/report/006', async (req, res) => {
    res.render('laporan-06', {judul:' Judul 006', prod21: 21111, prod22: 22222})
})

app.post('/report/006', async (req, res)=>{
   const prod21 = req.body.prod21
   const prod22 = req.body.prod22
   res.send(`Total produksi GT21 adalah : ${prod21} dan GT22 adalah: ${prod22}`);
});

app.post('/report/06', async (req, res)=>{
    //generate report pukul 06
    //update data in report
    let hariIni = getHariIni();
    const checkDoc = await collections.findOne({ date: hariIni });
    
    let data06 = {
        "data06":{
            "prod21":800.6, "prod22":900.7, "prod28":700.5, "totProdB2":1700.5, "gasCons22":117895.2,
            "mmscfd21":800.6, "mmscfd22":900.7, "mmbtu21":700.5, "mmbtu22":117895.2
        }
    };

    //upload data to database



});

app.post('/report', async (req, res)=>{
    const database = client.db(myDbName);
    const collection = database.collection(myCollection);
    const newDoc = {
        nama: 'alexa',
        email: 'alexa@gmail.com'
    }
    
    try {
        collection.insertOne(newDo);
        res.send('Data berhasil dikirimkan');
    } catch (error) {
       res.status(500).json({message: error.message});
       res.sendStatus(500);
       
    }
    
});






app.post('/button-click', (req, res) => {
    const dataFromFrontend = req.body; // Access data sent from the front-end
    console.log(dataFromFrontend);

    res.json({ status: 'success', message: 'Button click received by server' }); // Send a response back to the front-end
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('404. Halaman tidak tersedia');
});

db.client.connect()
    .then(() => {
        console.log('Database sudah konek');
        app.listen(port, () => {
            console.log(`Menjalankan express pada port ${port}....... \n`)
        });
    })
    .catch((e) => { console.error(e.message) });