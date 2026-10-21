export const FormWrapper = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="w-[50%] mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
      {subtitle && <p className="text-center mb-6">{subtitle}</p>}
      {children}
    </div>
  );
};
