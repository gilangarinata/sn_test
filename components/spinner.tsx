import {Loader2} from "lucide-react";
import {motion} from "framer-motion";
import React from "react";


export default function Spinner() {
    return <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}
                       whileHover={{ scale: 1.2 }}
                       whileTap={{ scale: 0.8 }}><Loader2 /></motion.div>
}