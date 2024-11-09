import Jumbotron from "@/components/ui/Jumbotron";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="block">
      <div className="block">
        <Jumbotron />
        {children}
      </div>
    </section>
  );
}
