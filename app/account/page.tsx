import { auth } from "@/lib/auth";
import UserCard from "./user-card";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DashboardPage() {
	const [session, activeSessions, deviceSessions, organization] =
		await Promise.all([
			auth.api.getSession({
				headers: await headers(),
			}),
			auth.api.listSessions({
				headers: await headers(),
			}),
			auth.api.listDeviceSessions({
				headers: await headers(),
			}),
			auth.api.getFullOrganization({
				headers: await headers(),
			}),
		
		]).catch((e) => {
			console.log(e);
			throw redirect("/auth/sign-in");
		});
	return (
		<div className="md:w-2/3 mx-auto p-4 m-4">
			<div className="flex gap-4 flex-col">
			
				<UserCard
					session={JSON.parse(JSON.stringify(session))}
					activeSessions={JSON.parse(JSON.stringify(activeSessions))}				
				/>
				
			</div>
		</div>
	);
}