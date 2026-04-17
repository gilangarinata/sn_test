// ImageComponent.jsx
import React from 'react';
import Image from 'next/image';

const ImageComponent = () => {
    return (
        <div>
            <Image src="/images/zero_capex_br_en.png" alt="Zero Capex Banner" width={800} height={400} />
        </div>
    );
};

export default ImageComponent;