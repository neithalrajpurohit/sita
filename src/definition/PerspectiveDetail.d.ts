export interface PerspectiveDetailResp {
  perspectiveFormData: PerspectiveFormData;
  footerData: FooterData | undefined;
}
export interface PerspectiveFormData {
  perspectiveTitle: string;
  selectedIds?: string[] | null;
  selectedAssets?: string[] | null;
  selectedEntities?: string[] | null;
  imageData1: string;
  imageData2: string;
  imageData3: string;
  imageData4: string;
  imageData1Name: string;
  imageData2Name: string;
  imageData3Name: string;
  imageData4Name: string;
  barGraphTitle: string;
  perspectiveInput: string;
  recomendationsInput: string;
}
export interface FooterData  {
  lastUpdateInformation: LastUpdateInformationOrOriginallyCreatedBy | undefined;
  originallyCreatedBy: LastUpdateInformationOrOriginallyCreatedBy | undefined;
}
export interface LastUpdateInformationOrOriginallyCreatedBy {
  user: string;
  date: string;
  time: string;
}
