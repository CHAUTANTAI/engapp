"use client";

import { Skeleton } from "primereact/skeleton";

type SkeletonVariant = "card" | "list" | "box";

interface CSkeletonProps {
  variant?: SkeletonVariant;
  count?: number;
  height?: string;
}

const CSkeleton = ({
  variant = "card",
  count = 6,
  height = "20vh",
}: CSkeletonProps) => {
  const fakeItems = Array.from({ length: count });

  const renderCardSkeleton = () =>
    fakeItems.map((_, index) => (
      <div
        key={index}
        className="w-[31%] m-2 p-4 border-1 border-gray-200 rounded-lg"
        style={{ height }}
      >
        <div className="flex justify-between items-center mb-2">
          <Skeleton width="60%" height="1.5rem" className="mb-2" />
          <Skeleton shape="circle" size="1.5rem" />
        </div>
        <Skeleton width="100%" height="1rem" className="mb-1" />
        <Skeleton width="80%" height="1rem" />
      </div>
    ));

  const renderListSkeleton = () =>
    fakeItems.map((_, index) => (
      <div key={index} className="w-full px-4 py-3 border-b border-gray-200">
        <Skeleton width="30%" height="1rem" className="mb-2" />
        <Skeleton width="80%" height="1rem" />
      </div>
    ));

  const renderBoxSkeleton = () =>
    fakeItems.map((_, index) => (
      <div
        key={index}
        className="w-full mb-3 border-1 border-gray-200 rounded-lg"
        style={{ height }}
      >
        <Skeleton width="100%" height="100%" />
      </div>
    ));

  const renderContent = () => {
    switch (variant) {
      case "list":
        return <div className="flex flex-col">{renderListSkeleton()}</div>;
      case "box":
        return <div className="flex flex-col">{renderBoxSkeleton()}</div>;
      case "card":
      default:
        return (
          <div className="flex flex-wrap justify-start">
            {renderCardSkeleton()}
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
};

export default CSkeleton;
