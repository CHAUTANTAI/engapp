import { Spinner } from "./spinner";

interface LoadingDialogProps {
  children?: React.ReactNode;
  type?: "spinner" | "line";
  isCheckingLoading?: boolean;
}
export const LoadingDialog: React.FC<LoadingDialogProps> = ({ type = 'spinner' }) => {
  return <div className="loading-dialog">{type === "spinner" ? <Spinner /> : <div></div>}</div>;
};
