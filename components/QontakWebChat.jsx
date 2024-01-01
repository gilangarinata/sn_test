"use client";
import React, { useEffect } from 'react';

const QontakWebchat = () => {
    useEffect(() => {
        const qchatInit = document.createElement('script');
        qchatInit.src = "https://webchat.qontak.com/qchatInitialize.js";

        const qchatWidget = document.createElement('script');
        qchatWidget.src = "https://webchat.qontak.com/js/app.js";

        document.head.appendChild(qchatInit);
        document.head.appendChild(qchatWidget);

        qchatInit.onload = function() {
            qchatInitialize({
                id: "887a52a6-4a09-4ad7-923d-412edd04cbf8",
                code: "ENcZ01vhjOhxPOfctrP4dw"
            });
        };

        // Clean up: Remove the scripts when the component is unmounted
        return () => {
            document.head.removeChild(qchatInit);
            document.head.removeChild(qchatWidget);
        };
    }, []);

    return <div id="qontakWebchatContainer"></div>; // You can add a container div if required
};

export default QontakWebchat;
