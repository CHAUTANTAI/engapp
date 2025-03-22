export interface PagingModel {
  pagesize: number;
  current_page: number;
  top: number | null;
}

export interface GetListModel {
  total_records: number;
}
