export interface PracticeModel {
  practice_id: number;
  name: string;
  description?: string;
  parent_id?: number;
}

export interface GetPracticeReqModel {
  account_id: number;
}

export interface GetPracticeResModel {
  practices: PracticeModel[];
}

export interface CreatePracticeBodyModel {
  name: string;
  description?: string;
  parent_id?: number;
  account_id: number;
}
