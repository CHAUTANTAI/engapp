import { create } from "zustand";
import { ClassModel, GetClassResModel } from "../model/class-model";
import { ClassService } from "../services/class-service";

interface ClassStore {
  classes_data: ClassModel[];
  getClasses: () => Promise<GetClassResModel>;
  isLoading: boolean;
}

export const useClassStore = create<ClassStore>((set) => ({
  isLoading: false,
  classes_data: [],
  getClasses: async (): Promise<GetClassResModel> => {
    try {
      const { data, status } = await ClassService.getClasses();
      if (status === 200 && data) {
        set({ classes_data: data.classes, isLoading: false });
        return data;
      }
    } catch (e) {
      console.error("Error fetching classes:", e);
      return { classes: [] }; 
    }
    return { classes: [] }; 
  },
}));
