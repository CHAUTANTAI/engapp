"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";
import Header from "../../components/header";
import AddVocabDialog from "./addNewVocabDialog";
import { getSheetData } from "../../lib/googleSheets";

interface Vocab {
  vocab_id: number;
  word: string;
  meaning: string;
  class_id: number | null;
  example: string | null;
  synonym_vocab_id: number | null;
  antonym_vocab_id: number | null;
  stress_position: number | null;
  ipa: string | null;
  created_at: string;
  updated_at: string | null;
}

const VocabPage = () => {
  const { control, handleSubmit, reset } = useForm();
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [classOptions, setClassOptions] = useState<any[]>([]); // Sample classes
  const [isDialogVisible, setDialogVisible] = useState<boolean>(false);

  const fetchVocabs = async (page: number, searchParams: any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        vocab: searchParams.vocab || "",
        class_id: searchParams.class_id?.toString() || "",
        meaning: searchParams.meaning || "",
        page: page.toString(),
      });
  
      const response = await fetch(`/api/vocab?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setVocabs(data);
        setTotalRecords(data.length); // Cập nhật tổng số bản ghi
      } else {
        console.error("Failed to fetch data");
        console.log(response);
        
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Search button handler
  const onSearch = (data: any) => {
    setPage(0); // Reset page to 1 on new search
    fetchVocabs(0, data);
  };

  // Handle dialog form submission
  const onAddVocab = async (data: any) => {
    try {
      const response = await fetch("/api/vocab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchVocabs(0, {}); // Refresh vocab list after adding new entry
        setDialogVisible(false); // Close dialog
        reset(); // Reset form
      } else {
        console.error("Failed to add vocab");
      }
    } catch (error) {
      console.error("Error adding vocab:", error);
    }
  };

  // Paginate handler
  const handlePageChange = (e: { first: number; rows: number }) => {
    const newPage = e.first / e.rows;
    setPage(newPage);
    fetchVocabs(newPage, {});
  };

  // Fetch classes (example data, replace with actual API if available)
  useEffect(() => {
    setClassOptions([
      { label: "Class 1", value: 1 },
      { label: "Class 2", value: 2 },
      { label: "Class 3", value: 3 },
    ]);
  }, []);

  useEffect(() => {
    fetchVocabs(0, {});
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Vocab</h1>
        <Button
          label="Add New Vocab"
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
          icon="pi pi-plus"
          onClick={() => setDialogVisible(true)}
        />

        <div className="p-4 border border-gray-700 rounded-md mb-4">
          <form
            onSubmit={handleSubmit(onSearch)}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <span className="p-float-label">
                <Controller
                  name="vocab"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      id="vocab"
                      {...field}
                      className="w-full bg-gray-800 text-white border-gray-600"
                    />
                  )}
                />
                <label htmlFor="vocab">Vocab</label>
              </span>
            </div>
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
                      className="w-full bg-gray-800 text-white border-gray-600"
                    />
                  )}
                />
                <label htmlFor="class">Class</label>
              </span>
            </div>
            <div>
              <span className="p-float-label">
                <Controller
                  name="meaning"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      id="meaning"
                      {...field}
                      className="w-full bg-gray-800 text-white border-gray-600"
                    />
                  )}
                />
                <label htmlFor="meaning">Meaning</label>
              </span>
            </div>

            <Button
              type="submit"
              label="Search"
              className="col-span-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white"
            />
          </form>
        </div>

        <DataTable
          value={vocabs}
          paginator
          rows={10}
          totalRecords={totalRecords}
          loading={loading}
          onPage={handlePageChange}
        >
          <Column field="word" header="Word" />
          <Column field="meaning" header="Meaning" />
          <Column field="example" header="Example" />
          <Column field="ipa" header="IPA" />
          <Column field="created_at" header="Created At" />
        </DataTable>
        {/* Use AddVocabDialog */}
        {/* <AddVocabDialog
          visible={isDialogVisible}
          onHide={() => setDialogVisible(false)}
          onAddVocab={onAddVocab}
          classOptions={classOptions}
          control={control}
          reset={reset}
        /> */}
      </main>
    </div>
  );
};

export default VocabPage;
