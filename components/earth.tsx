"use client"

import  { ScrollRotate } from 'react-scroll-rotate';

export function Earth() {
    return(
        <div className="w-24 h-24 bg-blue-500 z-50 mr-6">
            Your content goes <ScrollRotate loops={3}>Here</ScrollRotate>
        </div>
)
}
