import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuthStore } from "../../../store/auth-store";
import { CreatePracticeBodyModel } from "../../../model/practice-model";
import { PracticeService } from "../../../services/practice-service";
import { PracticeSchema, PracticeType } from "../../../schema/practice-schema";
import { CommonDialog } from "../../../components/common/dialog/dialog";
import FormWrapper from "../../../components/form/form";
import { InputControl } from "../../../components/common/control/input/inputControl";
import { Button } from "primereact/button";

interface AddNewPracticeDialogProps {
  visible: boolean;
  onHide: () => void;
}

export const AddNewPracticeDialog: React.FC<AddNewPracticeDialogProps> = ({
  visible,
  onHide,
}) => {
  const { accountData } = useAuthStore();
  const methods = useForm({
    resolver: zodResolver(PracticeSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: PracticeType) => {
    try {
      if (accountData) {
        const payload: CreatePracticeBodyModel = {
          name: data.name,
          description: data.description,
          parent_id: data.parent_id,
          account_id: accountData.account_id,
        };

        console.log("Submitting data:", payload);
        const response = await PracticeService.createPractice(payload);
        console.log("Response:", response);

        if (response.status === 201) {
          alert("Practice created successfully!");
          onHide();
          methods.reset();
        } else {
        }
      }
    } catch (error) {
      console.error("Error submitting Practice:", error);
      alert(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  useEffect(() => {
    if (visible) {
      console.log(visible);
    } else {
      methods.reset();
    }
  }, [visible]);

  return (
    <CommonDialog
      visible={visible}
      onHide={onHide}
      headerTitle="ADD NEW PRACTICE"
    >
      <div className="cs-dialog-content">
        <FormWrapper
          methods={methods}
          onSubmit={onSubmit}
          className="flex flex-col gap-y-2"
        >
          <div className="input-label">Name</div>
          <InputControl name="name" type="text" />

          <div className="input-label">Description</div>
          <InputControl name="description" type="text" />
          <Button type="submit" label="Submit" className="my-4" />
        </FormWrapper>
      </div>
    </CommonDialog>
  );
};
