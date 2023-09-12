import {useUser} from "@clerk/nextjs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const BotAvatar = () => {
    return (
        <div>
            <Avatar className="h-8 w-8">
                <AvatarImage src="/mindwave_logo.svg" className="p-1"/>
            </Avatar>
        </div>
    )
}

export default BotAvatar;