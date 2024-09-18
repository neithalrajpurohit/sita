export type InitialStateRgu = {
  functionAndProcess: FuntionAndProcessOfRgu[];
  rguListData: RguListObj[];
  isLoading: boolean;
};

export type RguListObj = {
  id: null | number;
  revenue: string;
  revenue_unit: string;
  rgu_name: string;
  rgu_color: string;
  functions_processes: FuntionAndProcessOfRgu[];
};

export type FuntionAndProcessOfRgu = {
  id: number;
  function_id: string;
  function_name: string;
  process: {
    id: number;
    process_name: string;
    parent_id: string;
    process_id: string;
  }[];
};
