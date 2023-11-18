"use client"
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import Link from "next/link";

export default function MyMap(props: any) {
    if (typeof window !== 'undefined') {
        const {position, zoom} = props

        return <MapContainer className="h-[500px]" center={position} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    <Link href={"https://maps.app.goo.gl/4CHUFtvLcPepLK4e6"}>
                        World Trade Center, WTC 1, 5th Floor
                    </Link>
                </Popup>
            </Marker>
        </MapContainer>
    } else {
        return <></>
    }
}