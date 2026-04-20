"use client";

import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";
import React from "react";

interface MediaEmptyStateProps {
    title: string;
    description: string;
}

export default function MediaEmptyState({ title, description }: MediaEmptyStateProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 w-full text-center px-4"
        >
            <div className="bg-slate-50 p-8 rounded-full mb-6 shadow-sm border border-slate-100">
                <FileSearch className="w-16 h-16 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
