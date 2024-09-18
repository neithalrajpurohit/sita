export interface userInputDataType {
  imageData1: any;
  imageData2: any;
  imageData3: any;
  imageData4: any;
  perspectiveTitle: string;
  barGraphTitle: string;
  perspectiveInput: string;
  recomendationsInput: string;
  imageData1Name: string;
  imageData2Name: string;
  imageData3Name: string;
  imageData4Name: string;
  selectedLevelFilter?: string;
  selectedActionTakenFilter: string;
  selectedPerspectiveFilter: string;
  startDateTime?: any;
  endDateTime?: any;
  selectedIds: string[];
  selectedAssets: string[];
  selectedEntities: string[];
  selectedActedUponFilter: string;
  isPublished?: boolean;
  perspectiveId?: any;
  userName?: string;
}

export interface Filters {
  value: string;
  label: string;
}
