export interface SecurityPulseDetail {
    headerData: HeaderData | undefined;
    securityPulseFormData: SecurityPulseFormData;
    footerData: FooterData | undefined;
  }
  export interface HeaderData {
    user: string;
    designation: string;
    createdDate: string;
  }
  export interface SecurityPulseFormData {
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
  securityPulseId?:any;
  }
  export interface SectionsEntity {
    imageData: string;
    imageDataName:string;
    info: string;
  }
  export interface LinksEntity {
    linkText: string;
    linkUrl: string;
  }
  export interface FooterData {
    email?: string;
    contacts?: (ContactsEntity)[] | null;
  }
  export interface ContactsEntity {
    countryName: string;
    contactNo: string;
  }
  
  