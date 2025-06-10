import Jumbotron from "@/components/ui/Jumbotron";
import { Toaster } from "sonner";

export default function AboutLayout({
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
