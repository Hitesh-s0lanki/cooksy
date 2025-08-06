import WorkflowExample from "./_components/workflow-example";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen grid grid-cols-1 gap-y-5 md:grid-cols-2 lg:grid-cols-2 gap-5 p-10 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradient-bg-with-grid.png')] bg-cover ">
      <div className="flex justify-center items-center">{children}</div>
      <WorkflowExample />
    </div>
  );
};

export default AuthLayout;
