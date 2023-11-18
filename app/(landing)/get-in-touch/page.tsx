import React, {useMemo} from "react";
import GetInTouch from "@/components/landing/get-in-touch/get-in-touch";
import MyMap from "@/components/landing/get-in-touch/map";


async function LandingPage() {
    const position = [-6.215140,106.820515]
    if (typeof window !== 'undefined') {
        return (
            <div>
                <GetInTouch />
                <MyMap position={position} zoom={13} />

            </div>

        )
    }else {
        return <></>
    }
}

export default LandingPage;