"use client";

import { Button } from "primereact/button";

const MainPage = () => {
  return (
      <>
        <div className="h-full w-full">
          <Button label="Primary" />
          <Button label="Secondary" severity="secondary" />
        </div>
      </>
  );
};

export default MainPage;
