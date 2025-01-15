import Navbar from "../_components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="">
      <Navbar />
      {children}
    </main>
  );
}
