import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
