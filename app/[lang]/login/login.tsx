"use client"
import { useState } from "react";
import cookie from 'js-cookie';
import {useRouter} from "next/navigation";

// 1. 	Nama	: Andika Restu Putra
// Pass	: MasterWarrior100113
// Email	: andikaputra@s-energi.com
//
// 2.  	Nama	: Maharani Vania
// Pass	: DmWarrior100113
// Email	: Maharaniva@s-energi.com
//
// 3. 	Nama	: Rizqa Lathifah
// Pass	: DmWarrior100113
// Email	: Rizqa@s-energy.id
//
// 4. 	Nama	: Aditya Bilal Digdayana
// Pass	: DmWarrior100113
// Email	: -
//
//     5. 	Nama	: Meidyna Silva
// Pass	: HrWarrior100113
// Email	: meidynasilva@s-energy.id
//
// 6. 	Nama	: Retno Trimurti
// Pass	: EpcWarrior100113
// email	: reretrimurti@s-energi.com
//
// 7. 	Nama	: Krisna
// Pass	: EpcWarrior100113
// Email	: krisna@s-energi.com

type User = {
    Nama: string;
    Pass: string;
    Email: string;
};

const users: User[] = [
    {
        Nama: "Andika Restu Putra",
        Pass: "MasterWarrior100113",
        Email: "andikaputra@s-energi.com",
    },
    {
        Nama: "Maharani Vania",
        Pass: "DmWarrior100113",
        Email: "Maharaniva@s-energi.com",
    },
    {
        Nama: "Rizqa Lathifah",
        Pass: "DmWarrior100113",
        Email: "Rizqa@s-energy.id",
    },
    {
        Nama: "Aditya Bilal Digdayana",
        Pass: "DmWarrior100113",
        Email: "radenaditya25@gmail.com",
    },
    {
        Nama: "Meidyna Silva",
        Pass: "HrWarrior100113",
        Email: "meidynasilva@s-energy.id",
    },
    {
        Nama: "Retno Trimurti",
        Pass: "EpcWarrior100113",
        Email: "reretrimurti@s-energi.com",
    },
    {
        Nama: "Krisna",
        Pass: "EpcWarrior100113",
        Email: "krisna@s-energi.com",
    },
    {
        Nama: "Gilang",
        Pass: "kuning77",
        Email: "gilangarinata@gmail.com",
    },
];

const loginUser = (username: string, password: string): User | null => {
    const user = users.find((u) => u.Email === username && u.Pass === password);
    return user || null;
};
const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        // Implement your login logic here

        const loggedInUser = loginUser(username, password);

        if (loggedInUser) {
            console.log("Login successful. User details:", loggedInUser);
            cookie.set("username",username);
            cookie.set("password",password);

            router.push("/admin-panel")
        } else {
            console.log("Invalid username or password");
            setError("Invalid username or password")
        }

    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError("")
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError("")
                            }}
                        />
                    </div>
                    <p className="text-red-500">{error}</p>
                    <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
