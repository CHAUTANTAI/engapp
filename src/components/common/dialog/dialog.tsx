"use client";

import { Dialog } from "primereact/dialog";

interface CommonDialogProps {
  visible: boolean;
  onHide?: () => void;
  children?: React.ReactNode;
  headerTitle?: string;
}
export const CommonDialog: React.FC<CommonDialogProps> = ({
  visible,
  onHide = () => {},
  children,
  headerTitle = "Header Title",
}) => {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      className="cs-dialog shadow-custom"
      closeIcon={
        <i className="pi pi-times text-red-500 text-2xl font-bold z-10"></i>
      }
      header={
        <div className="relative shadow-lg z-10">
          <div className="flex flex-row items-center justify-center title">
            {headerTitle}
          </div>
        </div>
      }
    >
      {children}
    </Dialog>
  );
};
