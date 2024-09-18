export interface Sections {
  imageData: any;
  info: string;
  imageDataName:string;
}

export interface Links {
  linkText:string;
  linkUrl:string;
}
export interface FormDataState {
  userName:string;
  securityPulseTitle: string;
  mainTitle: string;
  sections: Sections[];
  recommendations:string[];
  links:Links[];
  selectedIncidents:string[];
  selectedAssets:string[];
  selectedEntities:string[];
  criticality:string;
  isPublished:boolean;
}
