const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Images to convert (large PNGs/JPEGs used on landing pages)
// Excluding: zero_capex_br_en/id.png (used in PDF generation), banner_pdf.png (PDF export)
const toConvert = [
    // Large hero/banner images
    { file: 'banner-our-business.png', quality: 80 },    // 1.7MB
    { file: 'banner_1.jpg', quality: 80 },                // 1.1MB (already has .webp but JPG still referenced)
    { file: 'banner_2.jpg', quality: 80 },                // 500KB
    { file: 'banner_3.jpg', quality: 80 },                // 839KB
    { file: 'banner_4.jpg', quality: 80 },                // 620KB
    { file: 'zero_capex.png', quality: 80 },              // 930KB
    { file: 'earth.png', quality: 80 },                    // 876KB
    { file: 'foto.png', quality: 80 },                     // 3.6MB
    { file: 'bg_login.jpg', quality: 75 },                 // 2.8MB

    // Medium images (200KB-600KB)
    { file: 'celengan.png', quality: 80 },                 // 555KB
    { file: 'faq_background.png', quality: 80 },           // 554KB
    { file: 'manager2.png', quality: 80 },                 // 723KB
    { file: 'mining1.webp', skip: true },                  // Already WebP
    { file: 'our-experience-1.png', quality: 80 },         // 395KB
    { file: 'our-experience-2.png', quality: 80 },         // 314KB
    { file: 'our-experience-3.png', quality: 80 },         // 314KB
    { file: 'subsidiaries_3.png', quality: 80 },           // 313KB
    { file: 'subsidiaries_5.png', quality: 80 },           // 527KB
    { file: 'efficiency.png', quality: 80 },               // 300KB
    { file: 'ic_plan_2.png', quality: 80 },                // 296KB
    { file: 'ic_zero_capex_2.png', quality: 80 },          // 311KB
    { file: 'piala.png', quality: 80 },                    // 264KB
    { file: 'meriah.png', quality: 80 },                   // 286KB
    { file: 'sustainable.png', quality: 80 },              // 241KB
    { file: 'zero-capex-banner-1.png', quality: 80 },      // 244KB
    { file: 'zero-capex-banner-2.png', quality: 80 },      // 371KB
    { file: 'ic_plan_1.png', quality: 80 },                // 228KB
    { file: 'solar-works-1.png', quality: 80 },            // 221KB
    { file: 'solar-works-2.png', quality: 80 },            // 529KB
    { file: 'ic_zero_capex_1.png', quality: 80 },          // 177KB

    // Smaller but still worth converting
    { file: 'subsidiaries_1.png', quality: 80 },
    { file: 'subsidiaries_2.png', quality: 80 },
    { file: 'subsidiaries_4.png', quality: 80 },
    { file: 'subsidiaries_6.png', quality: 80 },
    { file: 'chart.png', quality: 80 },
    { file: 'who_banner.jpeg', quality: 80 },
    { file: 'grafik1.png', quality: 80 },
    { file: 'grafik2.png', quality: 80 },
    { file: 'grafik3.png', quality: 80 },
    { file: 'mission.png', quality: 80 },
    { file: 'passionate.png', quality: 80 },
    { file: 'vision.png', quality: 80 },
    { file: 'scope-work-1.png', quality: 80 },
    { file: 'scope-work-2.png', quality: 80 },
    { file: 'scope-work-3.png', quality: 80 },
    { file: 'scope-work-4.png', quality: 80 },
    { file: 'scope-work-5.png', quality: 80 },
    { file: 'scope-work-6.png', quality: 80 },
    { file: 'why-solar-1.png', quality: 80 },
    { file: 'why-solar-1-2.png', quality: 80 },
    { file: 'why-solar-2.png', quality: 80 },
    { file: 'why-solar-2-2.png', quality: 80 },
    { file: 'why-solar-3.png', quality: 80 },
    { file: 'why-solar-3-2.png', quality: 80 },
    { file: 'why-solar-4.png', quality: 80 },
    { file: 'why-solar-4-2.png', quality: 80 },
    { file: 'why-solar-5.png', quality: 80 },
    { file: 'why-solar-5-2.png', quality: 80 },
    { file: 'why-solar-6.png', quality: 80 },
];

async function convert() {
    let totalBefore = 0;
    let totalAfter = 0;
    let converted = 0;
    let skipped = 0;

    for (const item of toConvert) {
        if (item.skip) {
            skipped++;
            continue;
        }

        const inputPath = path.join(imagesDir, item.file);
        const ext = path.extname(item.file);
        const baseName = path.basename(item.file, ext);
        const outputPath = path.join(imagesDir, `${baseName}.webp`);

        if (!fs.existsSync(inputPath)) {
            console.log(`⏭️  SKIP (not found): ${item.file}`);
            skipped++;
            continue;
        }

        // Skip if WebP already exists and is smaller
        if (fs.existsSync(outputPath)) {
            const origSize = fs.statSync(inputPath).size;
            const webpSize = fs.statSync(outputPath).size;
            if (webpSize < origSize) {
                console.log(`⏭️  SKIP (WebP exists): ${item.file} (${(origSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB)`);
                totalBefore += origSize;
                totalAfter += webpSize;
                skipped++;
                continue;
            }
        }

        try {
            const origSize = fs.statSync(inputPath).size;
            await sharp(inputPath)
                .webp({ quality: item.quality })
                .toFile(outputPath);
            const webpSize = fs.statSync(outputPath).size;

            totalBefore += origSize;
            totalAfter += webpSize;
            converted++;

            const savings = ((1 - webpSize / origSize) * 100).toFixed(1);
            console.log(`✅ ${item.file} → ${baseName}.webp | ${(origSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB (${savings}% smaller)`);
        } catch (err) {
            console.error(`❌ ERROR: ${item.file}: ${err.message}`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   Converted: ${converted} files`);
    console.log(`   Skipped:   ${skipped} files`);
    console.log(`   Before:    ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   After:     ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Savings:   ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${((1 - totalAfter/totalBefore) * 100).toFixed(1)}%)`);
}

convert().catch(console.error);
