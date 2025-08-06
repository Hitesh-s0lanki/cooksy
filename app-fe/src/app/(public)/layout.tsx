import Footer from "./_components/footer";
import AppNavbar from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return (
    <div className=" relative">
      <AppNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
