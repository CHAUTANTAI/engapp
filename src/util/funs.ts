import { ROUTER } from "../const/routers";

export const getFlashcardDetailRoute = (id: string | number) =>
  `${ROUTER.FLASHCARD_DETAIL + id}`;
