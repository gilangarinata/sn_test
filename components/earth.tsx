"use client"

import {useScroll, useSpring, motion} from "framer-motion";


export function Earth() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress)

    return(
        <motion.div style={{ scaleX }}  className="w-24 h-24 bg-blue-500 z-50 mr-6">
            Your content goes Here
        </motion.div>
)
}
