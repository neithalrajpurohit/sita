export interface IncidentDetails {
  heading: string;
  incidentStatus: IncidentStatus;
  cards?: CardsEntity[] | null;
  incidentDetails: IncidentDetails1;
  resolutionStatus: ResolutionStatus;
  otherDetails: OtherDetails;
  updates: Updates;
}
export interface IncidentStatus {
  text: string;
  color: string;
}
export interface CardsEntity {
  cardTitle: string;
  textColor: string;
  cardSubTitle: string;
  cardIcon: string;
}
export interface IncidentDetails1 {
  title: string;
  description: string;
}
export interface ResolutionStatus {
  title: string;
  resolutionDetails: ResolutionDetailsOrResolutionOwner;
  resolutionOwner: ResolutionDetailsOrResolutionOwner;
}
export interface ResolutionDetailsOrResolutionOwner {
  title: string;
  description: string;
  isEditable: string;
}
export interface OtherDetails {
  title: string;
  details?: DetailsEntity[] | null;
}
export interface DetailsEntity {
  subTitle: string;
  value: string;
  valueColor: string;
}
export interface Updates {
  title: string;
  data?: DataEntity[] | null;
}
export interface DataEntity {
  updateDateTime: string;
  description: string;
}
