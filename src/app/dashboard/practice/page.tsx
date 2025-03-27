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

            return (
              <ButtonAnimationWrapper additionalClassName="w-full" scale={1.02}>
                <div className="w-full py-1 px-6">
                  <div className="my-1 p-2 text-white bg-[var(--color-primary)] rounded-full font-bold px-6 text-[1.1rem] w-full text-start flex flex-row items-center justify-between">
                    {item.name}
                    <div className=" flex flex-row gap-x-2 items-center justify-center">
                      <i className="pi pi-star text-yellow-400 text-2xl"></i>
                    </div>
                  </div>
                </div>
              </ButtonAnimationWrapper>
            );
          }}
          header={(
            <div className="text-[var(--color-primary)] text-[1.5rem] font-bold">Practices:</div>
          )}
          pt={{
            controls: { root: { className: "hidden" } },
            moveUpButton: { root: { className: "hidden" } },
            moveDownButton: { root: { className: "hidden" } },
            moveTopButton: { root: { className: "hidden" } },
            moveBottomButton: { root: { className: "hidden" } },
          }}
        ></OrderList>
      </LoadingSkeleton>
      {dialogVisible && (
        <AddNewPracticeDialog visible={dialogVisible} onHide={onHideDialog} />
      )}
    </div>
  );
};
export default PracticeScreen;
