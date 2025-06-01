"use client";
import { DataView, DataViewPageEvent } from "primereact/dataview";
import { useCallback, useEffect, useState, useRef } from "react";
import { useRouteControl } from "@/hook/routeControl";
import { ROUTER } from "@/const/routers";
import { Button } from "primereact/button";
import { getDetailRoute } from "@/util/funs";
import useDeckStore from "@/store/deck-store";
import { DeckModel } from "@/model/deck-model";
import CSkeleton from "@/components/common/component/skeleton";
import { useAuthCookies } from "@/hook/cookies";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const DeckPage = () => {
  const toastRef = useRef<Toast>(null);

  const { getAccountIdCookie } = useAuthCookies();

  const account_id = getAccountIdCookie();

  const { decks, fetchDecks, total_count, deleteDeck } = useDeckStore();

  const { redirectScreen } = useRouteControl();

  const [loading, setLoading] = useState(true);

  const [paginator, setPaginator] = useState({
    first: 0,
    rows: 6,
  });

  const handleGetDecks = useCallback(async () => {
    setLoading(true);
    if (account_id)
      await fetchDecks({
        account_id: Number(account_id),
        limit: paginator.rows,
        offset: paginator.first,
      });
    setLoading(false);
  }, [fetchDecks, paginator, account_id]);

  const listTemplate = (deck: DeckModel) => {
    return (
      <div
        className="z-0 w-[31%] h-[24vh] m-2 flex flex-col px-4 py-2 border-1 border-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
        onClick={() => handleDeckClick(deck.id)}
      >
        <div className="text-lg font-semibold">{deck.title}</div>
        <p className="text-gray-600 flex-grow overflow-hidden text-ellipsis line-clamp-2">
          {deck.description}
        </p>
        <div className="flex flex-row justify-end gap-x-1 -mr-3">
          <Button
            icon="pi pi-pen-to-square"
            className="h-[12px] w-[26px]"
            onClick={(e) => {
              e.stopPropagation();
              handleDeckEditClick(deck.id);
            }}
          />
          <Button
            icon="pi pi-trash text-red"
            className="h-[12px] w-[26px]"
            severity="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDeckDeleteClick(deck.id);
            }}
          />
        </div>
      </div>
    );
  };

  const handleDeckEditClick = (id: string | number) => {
    redirectScreen(getDetailRoute(id, ROUTER.DECK));
  };

  const handleDeckClick = (id: string | number) => {
    redirectScreen(getDetailRoute(id, ROUTER.DECK_DETAIL));
  };

  const handleNewDeckClick = () => {
    redirectScreen(ROUTER.DECK_NEW);
  };

  const handlePageChange = (e: DataViewPageEvent) => {
    setPaginator({
      first: e.first,
      rows: e.rows,
    });
  };

  const handleDeckDeleteClick = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this deck?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          const res = await deleteDeck({ id });
          if (res) {
            toastRef.current?.show({
              severity: "success",
              summary: "Deleted",
              detail: "Deck deleted successfully",
              life: 3000,
            });
            handleGetDecks();
          }
        } catch (err) {
          console.log(err);
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete deck",
            life: 3000,
          });
        }
      },
    });
  };

  useEffect(() => {
    handleGetDecks();
  }, [handleGetDecks]);
  return (
    <>
      <Button
        className="w-[31%] h-[20vh] m-2 mb-0 flex flex-col items-center justify-center gap-y-2"
        severity="success"
        icon="pi pi-plus text-[1.5rem]"
        outlined
        onClick={handleNewDeckClick}
      >
        <div className="text-[1.1rem] font-semibold text-[var(--green-600)]">
          New Deck
        </div>
      </Button>
      {loading ? (
        <CSkeleton variant="list" count={4} />
      ) : (
        <DataView
          value={decks}
          itemTemplate={listTemplate}
          paginator
          lazy
          totalRecords={total_count}
          rows={paginator.rows}
          first={paginator.first}
          onPage={handlePageChange}
        />
      )}
      <Toast ref={toastRef} />
      <ConfirmDialog />
    </>
  );
};

export default DeckPage;
