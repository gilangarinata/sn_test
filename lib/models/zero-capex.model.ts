import mongoose from "mongoose";

const newsSchema = new  mongoose.Schema({
    url: String,
    email: String,
    dayaTerpasang: String,
    dayaListrik: String,
    luasProperty: String,
    tagihanPerBulan: String,
    tarifListrik: String,
    estimasiPenggunaanDaya: String,
    lokasiInstallasi: String,
    rekomendasiInstallasi: String,
    areaPotensial: String,
    jumlahModulSurya: String,
    produksiEnergiPerTahun: String,
    periodeInstallasi: String,
    lokasi: String,
    name: String,
    whatsapp: String,
    company: String,
    pdfUrl: String
}, { timestamps: true });

const ZeroCapexModel = mongoose.models?.ZeroCapexModel || mongoose.model('ZeroCapexModel', newsSchema);
export default ZeroCapexModel;