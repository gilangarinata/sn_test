"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {updateGetInTouch} from "@/lib/actions/admin/get-in-touch/get-in-touch.action";
import {Locale} from "@/i18n.config";


export default function GetInTouch({lang, dictionary} : {lang: Locale, dictionary: any}) {
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async () => {
        setIsLoading(true)
        setError("")
        console.log(name, email, mobilePhone, message)
        if(name === '' || email === '' || mobilePhone === '' || message === '') {
            setError("Please fill all the fields")
            return
        }

        await updateGetInTouch({
            id: "",
            name: name,
            email: email,
            phone: mobilePhone,
            message: message
        })

        setIsLoading(false)
        setName("")
        setEmail("")
        setMobilePhone("")
        setMessage("")

        alert("Success send message!")
    }


    return (
        <div className="">
            <div className="w-screen flex flex-col bg-[#FABD24] h-fit lg:h-screen">
                <motion.div className="flex flex-col py-10" whileInView={{scale: 1, transition: { duration: 1 }}} initial={{scale: 0}}>
                    <h1 className="w-full text-[#15537A]/10 text-center text-7xl lg:text-[10rem] font-bold">{dictionary.get_in_touch}</h1>
                    <h1 className="w-full text-[#15537A] text-center text-4xl font-bold mb-8 lg:mt-[-130px]">{dictionary.get_in_touch}</h1>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center gap-4 lg:mt-20">
                    <motion.div whileInView={{scale: 1, transition: { duration: 1 }}} initial={{scale: 0}} className="px-4 lg:w-1/2 lg:px-10 flex flex-col items-center lg:items-start">
                        <p className="text-justify text-[#15537A]">
                            {
                                dictionary.are_you_passionate
                            }
                        </p>
                        <h1 className="text-2xl text-[#15537A] text-justify mt-10 lg:mt-20 font-bold">“Just Like The Sun,<br/>
                            We are Here For You”</h1>
                    </motion.div>
                    <motion.div whileInView={{scale: 1, transition: { duration: 1 }}} initial={{scale: 0}} className="flex flex-col gap-4 w-3/4 lg:mr-20">
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <Input type="text" placeholder={dictionary.enter_your_name} onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <Input type="email" placeholder={dictionary.enter_your_email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <Input type="number" placeholder={dictionary.enter_your_phone} onChange={(e) => {
                                setMobilePhone(e.target.value)
                            }} />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <Input className="h-32" type="text" placeholder={dictionary.enter_your_message} onChange={(e) => {
                                setMessage(e.target.value)
                            }} />
                        </div>
                        <div className="flex gap-4">
                            <Input type="checkbox" className="w-5 h-5"/>
                            <p className="text-[#15537A]">{dictionary.accept_term}</p>
                        </div>
                        <p className={cn("text-red-500", error !== '' ? "block" : "hidden")}>{error}</p>
                        <Button onClick={handleSubmit} className="bg-[#15537A] w-fit mb-20">{dictionary.submit}</Button>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
