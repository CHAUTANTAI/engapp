export interface ClassModel {
  class_id: number;
  name: string;
  abbreviation: string;
  create_at: string;
  update_at: string;
}
export interface GetClassResModel {
  classes: ClassModel[];
}
