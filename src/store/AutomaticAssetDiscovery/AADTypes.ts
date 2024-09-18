export type InitialStateAAD = {
  isLoading: boolean;
  selectedService: {
    label: string;
    value: string;
  };
  gridHeader: {
    key: string;
    headerText: string;
    isSorting: boolean;
    type: string;
    hideOnUI: boolean;
  }[];
  gridData: {
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    column5: string;
  }[];
  loadingRecord: boolean;
  eventDetails: {
    label: string;
    value: string;
    box_one: {
      label: string;
      value: string;
    }[];
    box_two: {
      label: string;
      value: string;
    }[];
    box_three: {
      label: string;
      value: string;
    }[];
  };
};
