"use client";
import { DataTablePageEvent } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useVocabStore } from "../../../store/vocab-store";
import { InputNoControl } from "../../../components/common/control/input/inputNoControl";
import { ButtonAnimationWrapper } from "../../../components/common/animation/buttonAnimation";
import { AddNewVocabDialog } from "./addNewVocabDialog";
import { useAuthStore } from "../../../store/auth-store";
import { LoadingSkeleton } from "../../../components/common/loading/skeletonLoading";
import CommonDataTable from "../../../components/common/table/table";

const VocabScreen = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const { getVocabs, vocabs_data, isLoading } = useVocabStore();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const { accountData } = useAuthStore();

  const onInit = async () => {
    useVocabStore.setState({ isLoading: true });
    if (accountData) {
      await getVocabs({
        current_page: 1,
        pagesize: 10,
        top: null,
        account_id: accountData?.account_id,
      });
    }
    useVocabStore.setState({ isLoading: false });
  };

  const onChangePage = async (event: DataTablePageEvent): Promise<void> => {
    useVocabStore.setState({ isLoading: true });
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
    useVocabStore.setState({ isLoading: false });
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
      <LoadingSkeleton
        isLoading={isLoading}
        type="table"
        height="37rem"
        additionalClassName="p-4"
      >
        <CommonDataTable
          value={vocabs_data.vocabs}
          totalRecords={vocabs_data.total_records}
          isLoading={isLoading}
          first={first}
          rows={rows}
          onSelectionChange={(e) => {
            console.log(e);
          }}
          onPageChange={onChangePage}
          dataKey="vocab_id"
          emptyMessage="No vocabularies found."
          wrapperClassName="cs-table-wrapper"
          tableClassName="cs-table"
          columns={[
            {
              header: "Actions",
              className: "cs-cell",
              alignHeader: "center",
              headerClassName: "cs-header cs-header-first",
              body: renderActionColumn,
            },
            {
              field: "word",
              header: "Word",
              className: "cs-cell",
              alignHeader: "center",
              headerClassName: "cs-header",
            },
            {
              field: "ipa",
              header: "IPA",
              className: "cs-cell",
              alignHeader: "center",
              headerClassName: "cs-header",
            },
            {
              field: "class_names",
              header: "Class",
              className: "cs-cell",
              alignHeader: "center",
              headerClassName: "cs-header",
            },
            {
              field: "meaning",
              header: "Meaning",
              className: "cs-cell",
              alignHeader: "center",
              headerClassName: "cs-header",
            },
            {
              field: "example",
              header: "Example",
              className: "cs-cell",
              alignHeader: "center",
              headerClassName: "cs-header cs-header-last",
              body: (rowData) => (
                <span className="italic">{rowData.example || "--"}</span>
              ),
            },
          ]}
        />
      </LoadingSkeleton>
      {dialogVisible && (
        <AddNewVocabDialog visible={dialogVisible} onHide={onHideDialog} />
      )}
    </div>
  );
};
export default VocabScreen;
