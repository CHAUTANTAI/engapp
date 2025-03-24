import FormWrapper from "../../../components/form/form";
import { useForm } from "react-hook-form";
import { VocabSchema, VocabSchemaType } from "../../../schema/vocab-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputControl } from "../../../components/common/control/input/inputControl";
import { Button } from "../../../components/common/button/button";
import { useEffect } from "react";
import { useClassStore } from "../../../store/class-store";
import { CheckboxGroupControl } from "../../../components/common/control/checkboxGroupControl";
import { VocabService } from "../../../services/vocab-service";
import { useAuthStore } from "../../../store/auth-store";
import { CreateVocabReqModel } from "../../../model/vocab-model";
import { LoadingSkeleton } from "../../../components/common/loading/skeletonLoading";
import { CommonDialog } from "../../../components/common/dialog/dialog";

interface AddNewVocabDialogProps {
  visible: boolean;
  onHide: () => void;
}

export const AddNewVocabDialog: React.FC<AddNewVocabDialogProps> = ({
  visible,
  onHide,
}) => {
  const { getClasses, classes_data, isLoading } = useClassStore();
  const { accountData } = useAuthStore();
  const methods = useForm({
    resolver: zodResolver(VocabSchema),
    mode: "onChange",
    defaultValues: {
      word: "",
      meaning: "",
      ipa: "",
      stress: 0,
      example: "",
      class_id: [],
    },
  });

  const wordValue = methods.watch("word");
  const stressValue = methods.watch("stress");

  const setSelectedStressIndex = (index: number) => {
    console.log(stressValue);
    methods.setValue("stress", index);
  };

  useEffect(() => {
    methods.setValue("stress", 0);
  }, [wordValue]);

  const onSubmit = async (data: VocabSchemaType) => {
    try {
      if (accountData) {
        const payload: CreateVocabReqModel = {
          word: data.word,
          meaning: data.meaning,
          ipa: data.ipa,
          stress: data.stress,
          example: data.example,
          class_ids: data.class_id,
          account_id: accountData.account_id,
        };

        console.log("Submitting data:", payload);
        const response = await VocabService.createVocab(payload);
        console.log("Response:", response);

        if (response.status === 201) {
          alert("Vocab created successfully!");
          onHide();
          methods.reset();
        } else {
        }
      }
    } catch (error) {
      console.error("Error submitting vocab:", error);
      alert(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const handleInit = async () => {
    useClassStore.setState({ isLoading: true });
    await getClasses();
    useClassStore.setState({ isLoading: false });
  };

  useEffect(() => {
    if (visible) {
      handleInit();
    } else {
      methods.reset();
    }
  }, [visible]);

  console.log(methods.getValues("class_id"));

  return (
    <CommonDialog visible={visible} onHide={onHide} headerTitle="ADD NEW VOCAB">
      <div className="cs-dialog-content">
        <FormWrapper
          methods={methods}
          onSubmit={onSubmit}
          className="flex flex-col gap-y-2"
        >
          <div className="input-label">Word</div>
          <InputControl name="word" type="text" />
          <div className="input-label">Class</div>
          <LoadingSkeleton
            isLoading={isLoading}
            type="table"
            height="3rem"
            additionalClassName="p-2"
          >
            <CheckboxGroupControl
              name="class_id"
              options={classes_data.map((cls) => ({
                value: cls.class_id,
                label: `${cls.name} (${cls.abbreviation})`,
              }))}
            />
          </LoadingSkeleton>
          <div className="input-label">Meaning</div>
          <InputControl name="meaning" type="text" />

          <div className="input-label">IPA</div>
          <InputControl name="ipa" type="text" />

          <div className="input-label">Stress</div>
          <div className="flex gap-1 input-styles flex-row items-center">
            {wordValue.split("").map((char, index) => (
              <div
                key={index}
                className={`stress-box ${
                  methods.getValues("stress") === index ? "highlighted" : ""
                }`}
                onClick={() => {
                  setSelectedStressIndex(index);
                }}
              >
                {char}
              </div>
            ))}
          </div>

          <div className="input-label">Example</div>
          <InputControl name="example" type="text" />
          <Button type="submit" value="Submit" additionalClassName="my-4" />
        </FormWrapper>
      </div>
    </CommonDialog>
  );
};
