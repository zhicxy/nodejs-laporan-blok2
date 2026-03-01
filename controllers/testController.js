exports.coba = async (req, res) => {
    res.send('Ini halaman test controller');
};

exports.hariIni = (params) => {
    const date = new Date();
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mey', 'Juni', 'Juli', 'Agustus', 'Sepptember', 'October', 'November', 'Desember']
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const dayName = dayNames[date.getDay()]
    const monthName = monthNames[date.getMonth()]
    const dateTodayLengkap = `${dayName} ${date.getDate()} ${monthName} ${date.getFullYear()}`;
    const dateTodayPendek = `${date.getDate()} ${monthName} ${date.getFullYear()}`;
    
    switch (params) {
        case 'lengkap':
            return dateTodayLengkap;
            break;
        case 'pendek':
            return dateTodayPendek;
            break;
        default:
            break;
    }
}