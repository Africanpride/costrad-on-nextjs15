import GoogleCaptchaWrapper from "@/components/ui/GoogleCaptchaWrapper";
import Jumbotron from "@/components/ui/Jumbotron";
import { Toaster } from "react-hot-toast";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block p-2">
      <Toaster />
      <Jumbotron />
      {children}
    </div>
  );
}
