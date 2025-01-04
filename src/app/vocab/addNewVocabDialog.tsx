"use client";
import { FC } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";

interface AddVocabDialogProps {
  visible: boolean;
  onHide: () => void;
  onAddVocab: (data: any) => void; // Function to handle the add vocab action
  classOptions: any[];
  reset: () => void;
}

const AddVocabDialog: FC<AddVocabDialogProps> = ({
  visible,
  onHide,
  onAddVocab,
  classOptions,
  reset,
}) => {
  // Create new useForm for the add vocab form
  const { control, handleSubmit, reset: resetForm } = useForm();


  //handle call api add new vocab
  const addNewVocabService = async (data: any) => {
    try {
        // Gọi API POST để thêm vocab mới vào DB
        const response = await fetch('/api/vocab', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          // Nếu thêm vocab thành công
          alert('Vocab added successfully');
          resetForm(); // Reset the form after submission
          onHide(); // Close the dialog after submission
        } else {
          // Nếu có lỗi khi thêm vocab
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error during adding vocab:', error);
        alert('An unexpected error occurred while adding the vocab');
      }
  }
  
  // Submit handler for the form
  const onSubmit = (data: any) => {
    // Call the passed down onAddVocab function from parent component
    onAddVocab(data);
    addNewVocabService(data);
    resetForm(); // Reset the form after submission
    onHide(); // Close the dialog after submission
  };

  return (
    <Dialog
      header="Add New Vocab"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
      className="rounded-lg shadow-xl p-6 bg-gray-800 text-white"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Vocab Field */}
        <div>
          <span className="p-float-label">
            <Controller
              name="vocab"
              control={control}
              render={({ field }) => (
                <InputText
                  id="vocab"
                  {...field}
                  className="w-full bg-gray-700 text-white border-gray-600"
                />
              )}
            />
            <label htmlFor="vocab">Vocab</label>
          </span>
        </div>

        {/* Class Field */}
        <div>
          <span className="p-float-label">
            <Controller
              name="class_id"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id="class"
                  value={field.value}
                  options={classOptions}
                  onChange={(e) => field.onChange(e.value)}
                  optionLabel="label"
                  optionValue="value"
                  className="w-full bg-gray-700 text-white border-gray-600"
                />
              )}
            />
            <label htmlFor="class">Class</label>
          </span>
        </div>

        {/* Meaning Field */}
        <div>
          <span className="p-float-label">
            <Controller
              name="meaning"
              control={control}
              render={({ field }) => (
                <InputText
                  id="meaning"
                  {...field}
                  className="w-full bg-gray-700 text-white border-gray-600"
                />
              )}
            />
            <label htmlFor="meaning">Meaning</label>
          </span>
        </div>

        {/* Example Field */}
        <div>
          <span className="p-float-label">
            <Controller
              name="example"
              control={control}
              render={({ field }) => (
                <InputText
                  id="example"
                  {...field}
                  className="w-full bg-gray-700 text-white border-gray-600"
                />
              )}
            />
            <label htmlFor="example">Example</label>
          </span>
        </div>

        {/* IPA Field */}
        <div>
          <span className="p-float-label">
            <Controller
              name="ipa"
              control={control}
              render={({ field }) => (
                <InputText
                  id="ipa"
                  {...field}
                  className="w-full bg-gray-700 text-white border-gray-600"
                />
              )}
            />
            <label htmlFor="ipa">IPA</label>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text p-button-rounded bg-red-600 text-white"
            onClick={() => {
              resetForm();
              onHide();
            }}
          />
          <Button
            label="Add"
            icon="pi pi-check"
            className="p-button-rounded p-button-success"
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddVocabDialog;
