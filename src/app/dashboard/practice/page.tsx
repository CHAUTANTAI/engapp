"use client";
import { OrderList } from "primereact/orderlist";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/auth-store";
import { PracticeService } from "../../../services/practice-service";
import { PracticeModel } from "../../../model/practice-model";
import { LoadingSkeleton } from "../../../components/common/loading/skeletonLoading";
import { ButtonAnimationWrapper } from "../../../components/common/animation/buttonAnimation";
import { AddNewPracticeDialog } from "./addNewPracticeDialog";

const PracticeScreen = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const { accountData } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [practices, setPractices] = useState<PracticeModel[]>([]);

  const handleInit = async () => {
    try {
      setIsLoading(true);
      if (accountData) {
        const { status, data } = await PracticeService.getPractice({
          account_id: accountData?.account_id,
        });
        if (status === 200 && data) {
          setPractices(data.practices);
        } else {
          setPractices([]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onHideDialog = () => {
    setDialogVisible(false);
    handleInit();
  };

  useEffect(() => {
    handleInit();
  }, [accountData]);
  return (
    <div>
      <ButtonAnimationWrapper
        additionalClassName="font-bold text-[1.2rem] pb-4 text-[var(--color-link)]"
        activeChildrenColor="var(--color-link-active)"
        activeDuration={0}
      >
        <div onClick={() => setDialogVisible(true)}>
          <span className="pi pi-angle-right"></span>
          <span className="pi pi-angle-right"></span>
          <span className="pl-1 underline">ADD PRACTICE</span>
        </div>
      </ButtonAnimationWrapper>
      <LoadingSkeleton isLoading={isLoading} height="10rem">
        <OrderList
          dataKey="practice_id"
          value={practices}
          onChange={() => {}}
          itemTemplate={(item: PracticeModel) => {
            console.log(item);

            return <h1>{item.name}</h1>;
          }}
          header="Practices"
        ></OrderList>
      </LoadingSkeleton>
      {dialogVisible && (
        <AddNewPracticeDialog visible={dialogVisible} onHide={onHideDialog} />
      )}
    </div>
  );
};
export default PracticeScreen;
