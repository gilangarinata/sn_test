const sizeOf = require('image-size');
try {
    const dimensions = sizeOf('public/images/maps.webp');
    console.log(dimensions.width, dimensions.height);
} catch (err) {
    console.error(err);
}
