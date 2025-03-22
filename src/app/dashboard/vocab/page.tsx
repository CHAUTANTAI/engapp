"use client";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { useVocabStore } from "../../../store/vocab-store";
import { InputNoControl } from "../../../components/common/control/input/inputNoControl";
import { ButtonAnimationWrapper } from "../../../components/common/animation/buttonAnimation";
import { AddNewVocabDialog } from "./addNewVocabDialog";
import { useAuthStore } from "../../../store/auth-store";

const VocabScreen = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const { getVocabs, vocabs_data, isLoading } = useVocabStore();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const { accountData } = useAuthStore();

  const onInit = async () => {
    console.log(accountData);
    
    if (accountData) {
      await getVocabs({
        current_page: 1,
        pagesize: 10,
        top: null,
        account_id: accountData?.account_id,
      });
    }
  };

  const onChangePage = async (event: DataTablePageEvent): Promise<void> => {
    console.log("Paging event:", event);
    setFirst(event.first);
    setRows(event.rows);
    if (event !== undefined && event.page !== undefined && accountData) {
      await getVocabs({
        current_page: event.page + 1,
        pagesize: event.rows,
        top: null,
        account_id: accountData?.account_id,
      });
    }
  };

  const renderActionColumn = () => {
    return (
      <div className="flex flex-row items-center justify-center rounded-full">
        <ButtonAnimationWrapper
          childrenColor="red"
          hoverDuration={0.2}
          activeDuration={0.05}
          activeBgColorCSS="var(--color-red-active)"
          hoverBgColorCSS="var(--color-orange-focus)"
          hoverChildrenColor="white"
          activeChildrenColor="white"
          radius={9999}
        >
          <div className="pi pi-trash p-2 rounded-full"></div>
        </ButtonAnimationWrapper>
      </div>
    );
  };

  const onHideDialog = () => {
    setDialogVisible(false);
    onInit();
  };

  useEffect(() => {
    onInit();
  }, [accountData]);

  return (
    <div className="p-4">
      <ButtonAnimationWrapper
        additionalClassName="font-bold text-[1.2rem] pb-4 text-[var(--color-link)]"
        activeChildrenColor="var(--color-link-active)"
        activeDuration={0}
      >
        <div onClick={() => setDialogVisible(true)}>
          <span className="pi pi-angle-right"></span>
          <span className="pi pi-angle-right"></span>
          <span className="pl-1 underline">ADD NEW VOCAB</span>
        </div>
      </ButtonAnimationWrapper>
      {/* Search bar */}
      <InputNoControl type="search" />
      {/* DataTable */}
      <div className="cs-table-wrapper">
        <DataTable
          value={vocabs_data.vocabs}
          paginator
          first={first}
          rows={rows}
          rowsPerPageOptions={[10, 20, 50]}
          totalRecords={vocabs_data.total_records}
          loading={isLoading}
          onSelectionChange={(e) => {
            console.log(e);
          }}
          lazy
          dataKey="vocab_id"
          emptyMessage="No vocabularies found."
          className="text-black p-4"
          exportFilename="vocab_list"
          tableClassName="cs-table"
          paginatorClassName="cs-paginator"
          onPage={onChangePage}
          resizableColumns
        >
          <Column
            header="Actions"
            headerClassName="cs-header cs-header-first"
            alignHeader={"center"}
            body={renderActionColumn}
          />
          <Column
            field="word"
            header="Word"
            headerClassName="cs-header"
            sortable
          />
          <Column
            field="ipa"
            header="IPA"
            headerClassName="cs-header"
            alignHeader={"center"}
          />
          <Column
            field="class_abbreviation"
            header="Class"
            headerClassName="cs-header"
            alignHeader={"center"}
            sortable
            filter
          />
          <Column
            field="meaning"
            header="Meaning"
            headerClassName="cs-header"
            alignHeader={"center"}
            sortable
          />
          <Column
            field="example"
            header="Example"
            headerClassName="cs-header cs-header-last"
            alignHeader={"center"}
            body={(rowData) => (
              <span className="italic">{rowData.example || "--"}</span>
            )}
          />
        </DataTable>
      </div>
      {dialogVisible && (
        <AddNewVocabDialog visible={dialogVisible} onHide={onHideDialog} />
      )}
    </div>
  );
};
export default VocabScreen;
