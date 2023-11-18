import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const UserAvatar = () => {

    return (
        <div>
            <Avatar className="h-8 w-8">
                {/*<AvatarImage src={user?.profileImageUrl} />*/}
                {/*<AvatarFallback >*/}
                {/*    {user?.firstName?.charAt(0)}*/}
                {/*    {user?.lastName?.charAt(0)}*/}
                {/*</AvatarFallback>*/}
            </Avatar>
        </div>
    )
}

export default UserAvatar;