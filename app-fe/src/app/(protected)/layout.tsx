import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full flex flex-col min-h-screen">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
