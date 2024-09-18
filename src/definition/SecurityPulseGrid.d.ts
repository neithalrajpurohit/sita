export interface SecurityPulseGrid {
    gridAddOn: GridAddOn;
    gridHeader: GridHeaderEntity[];
    gridData: GridDataEntity[];
  }
  export interface GridAddOn {
    showFirstColumnAsCheckbox: boolean;
    showLastColumnAsAction?: boolean;
  }
  export interface GridHeaderEntity {
    key: string;
    headerText: string;
    isSorting: boolean;
    type: string;
    hideOnUI?:boolean;
    dataDisplayLength?:number
  }
  export interface GridDataEntity {
    incidentId: string;
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    column5: string;
    column6: string;
    column7: string;
  }
  