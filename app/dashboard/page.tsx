import { auth } from "@/lib/auth";
import UserCard from "./user-card";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { PreferencesSection } from "@/components/dashboard/preference-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingSection from "@/components/dashboard/billing-section";
import { ProfileSection } from "@/components/dashboard/profile-section";

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
    <div className=" mx-auto p-4 m-4">
      <Tabs defaultValue="profile" className="">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileSection session={session!} />
        </TabsContent>
        <TabsContent value="account">
          <UserCard
            session={JSON.parse(JSON.stringify(session))}
            activeSessions={JSON.parse(JSON.stringify(activeSessions))}
          />
        </TabsContent>
        <TabsContent value="preferences">
          <PreferencesSection />
        </TabsContent>
        <TabsContent value="billing">
          <BillingSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
