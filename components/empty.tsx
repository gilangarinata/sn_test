import Image from "next/image";

interface EmptyProps {
    label : String
}

const Empty = ({label} : EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-52 w-52">
                <Image alt="Empty" fill src="/empty.png"/>
            </div>
            <p className="text-muted-foreground text-sm text-center mt-4">{label}</p>
        </div>
    )
}

export default Empty;