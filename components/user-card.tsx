import { UserAvatar } from "@daveyplate/better-auth-ui"
 
export default function CostradUserCard() {
    const user = {
        name: "Seto",
        email: "seto@better-auth.dev",
        image: "https://better-auth-ui.com/avatars/seto.png"
    }
 
    return (
        <UserAvatar
        
            user={user}
            className="size-12 border-2 border-destructive"
            classNames={{
                fallback: "bg-black text-white",
            }}
        />
    )
}