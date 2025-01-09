"use client";

import { useMasterDataStore } from "../store/master-data";

const MainPage = () => {
  const { session } = useMasterDataStore();

  return (
    <>
      <div className="h-full flex flex-row items-center">
        <h1
          onClick={() => {
            useMasterDataStore.setState({ session: !session });
          }}
          className="text-[6rem] font-bold text-purple-600"
        >
          HOME PAGE
        </h1>
      </div>
    </>
  );
};

export default MainPage;
