type SkeletonType = "table" | "text" | "card" | "avatar";

interface LoadingSkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: SkeletonType;
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
  additionalClassName?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  isLoading,
  children,
  type = "text",
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  count = 1,
  additionalClassName = "",
}) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div
      className={`skeleton-container skeleton-${type} ${additionalClassName}`}
    >
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="skeleton"
          style={{ width, height, borderRadius }}
        />
      ))}
    </div>
  );
};
