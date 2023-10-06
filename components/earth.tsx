"use client"

import {useScroll, useSpring, motion, useAnimation} from "framer-motion";
import {LegacyRef, RefObject, useEffect, useState} from "react";
import Image from "next/image";


export function Earth() {
    const controls = useAnimation();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const scrollListener = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, []);

    useEffect(() => {
        // Define the animation properties here
        const maxRotation = 360; // Maximum rotation angle in degrees
        const scrollThreshold = 6000; // Adjust the threshold where the animation starts

        // Calculate the normalized scroll progress between 0 and 1
        const normalizedScroll = Math.min(scrollY / scrollThreshold, 1);

        // Apply the rotation animation based on scroll position
        controls.start({
            rotate: normalizedScroll * maxRotation,
        });
    }, [scrollY, controls]);

    return (
        <motion.div
            className="w-[920px] h-screen opacity-10 md:opacity-100 right-0 fixed top-0 mr-[-34%]"
            initial={{ rotate: 0 }}
            animate={controls}
        >
            <Image fill style={{objectFit:"cover"}} src="/images/earth.png" alt="" />
        </motion.div>
    );
}
