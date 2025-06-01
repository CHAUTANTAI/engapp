export interface PagingModel {
  pagesize: number;
  current_page: number;
  top: number | null;
}

export interface ListPagingModel {
  offset: number;
  limit: number;
}

export interface GetListModel {
  total_records: number;
}
