interface InputErrorWarningProps {
  errorMessage?: string;
  className?: string;
}

export const InputErrorWarning = ({
  errorMessage = "",
  className = "text-red-500 text-sm px-4",
}: InputErrorWarningProps) => {
  return <div className={className}>{errorMessage}</div>;
};
