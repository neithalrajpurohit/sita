export interface FeedDataType {
    FeedHeader: string;
    Feeds?: (FeedsEntity)[] | null;
  }
  export interface FeedsEntity {
    title: string;
    description: string;
    iconclass: string;
    linkurls: string[];
  }
  