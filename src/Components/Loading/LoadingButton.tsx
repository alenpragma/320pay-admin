type IProps = {
  className?: string;
  children: React.ReactNode;
};

const LoadingButton = ({ className, children }: IProps) => {
  return (
    <button
      className={`px-5 py-3 rounded-lg bg-primary text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default LoadingButton;
