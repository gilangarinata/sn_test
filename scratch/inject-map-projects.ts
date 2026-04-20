import mongoose from "mongoose";
import MapProject from "../lib/models/map-project.model.ts";
import { connectToDb } from "../lib/mongoose.ts";

process.env.MONGODB_URL = "mongodb://sesna:sesna@193.203.163.79:27017/sesna-db?authSource=admin";


const projects = [
    { name: "C&I Rental Asset", location: "Cilegon, Banten", capacity: "1.3 MWp", image: "/images/mapsexperince/cilegon.webp", x: 23.5, y: 73.5 },
    { name: "C&I Rental Asset", location: "Cikande, Banten", capacity: "0.301 MWp", image: "/images/mapsexperince/cikande.webp", x: 24.5, y: 75.5 },
    { name: "Commercial Building", location: "Riau", capacity: "0.04 MWp", image: "/images/mapsexperince/riau.webp", x: 18.5, y: 45.5 },
    { name: "Commercial Building", location: "Jaksel", capacity: "0.014 MWp", image: "/images/mapsexperince/jaksel.webp", x: 26.5, y: 78.5 },
    { name: "Commercial Building (7 Locations)", location: "Surabaya, Jawa Timur", capacity: "0.259 MWp", image: "/images/mapsexperince/surabaya.webp", x: 41.5, y: 79.5 },
    { name: "Industrial Building", location: "Cikarang", capacity: "0.125 MWp", image: "/images/mapsexperince/cikarang.webp", x: 27.5, y: 77.5 },
    { name: "Industrial Building", location: "Campaka, Jawa Barat", capacity: "3.152 MWp", image: "/images/mapsexperince/campaka.webp", x: 28.5, y: 79.5 },
    { name: "Industrial Building", location: "Karawang, Jawa Barat", capacity: "3.020 MWp", image: "/images/mapsexperince/karawang.webp", x: 29.5, y: 78.5 },
    { name: "Industrial Building", location: "Karawang, Jawa Barat", capacity: "3.261 MWp", image: "/images/mapsexperince/karawang ati.webp", x: 30.5, y: 78.5 },
    { name: "Mining Operating Asset", location: "Penajam, Kalimantan Timur", capacity: "0.4 MWp + 0.28 MWh BESS", image: "/images/mapsexperince/penajam.webp", x: 53.5, y: 55.5 },
    { name: "Mining Operating Asset", location: "Morowali, Sulawesi Tengah", capacity: "0.3 MWp + 0.27 MWh BESS", image: "/images/mapsexperince/morowali.webp", x: 67.5, y: 55.5 },
    { name: "IPP Solar Farm", location: "Maumere, NTT", capacity: "1 MWp", image: "/images/mapsexperince/maumere.webp", x: 67.5, y: 84.5 },
    { name: "IPP Solar Farm", location: "Ende, NTT", capacity: "1 MWp", image: "/images/mapsexperince/ende.webp", x: 65.5, y: 85.5 },
    { name: "IPP Solar Farm", location: "Sumba, NTT", capacity: "1 MWp", image: "/images/mapsexperince/sumba.webp", x: 62.5, y: 87.5 },
];

async function inject() {
    console.log("Connecting to DB...");
    await connectToDb();
    
    console.log("Cleaning up old projects...");
    await MapProject.deleteMany({});
    
    console.log("Injecting new projects...");
    for (const p of projects) {
        const newProject = new MapProject({
            id: new mongoose.Types.ObjectId().toString(),
            ...p
        });
        await newProject.save();
        console.log(`Saved: ${p.name} - ${p.location}`);
    }
    
    console.log("Injection complete!");
    process.exit(0);
}

inject().catch(err => {
    console.error(err);
    process.exit(1);
});
