export interface ArrProps {
  Arr: string[];
  currentActive: string;
  onClick: (value: string) => void;
}
export interface AdminInfoCardProps {
  data: any;
}
export interface FaQProps {
  data: any;
}
export interface preDefineType {
  id: number | null;
  functionColor: string;
  functionId: string;
  functionName: string;
  isuserDef: boolean;
  process: {
    id: number | null;
    isuserDef: boolean;
    parentId: string;
    processColor: string;
    processId: string;
    processName: string;
  }[];
}

export interface preProcessType {
  id: number | null;
  isuserDef: boolean;
  parentId: string;
  processColor: string;
  processId: string;
  processName: string;
}
export interface CatProps {
  categoryId: null | number;
  categoryName: string;
  subcat: {
    subcatId: null | number;
    subcatName: string;
  }[];
}

export interface SubCatProps {
  subcatId: number | null;
  subcatName: string;
}

export interface TypeProps {
  typeId: number | null;
  typeName: string;
  subtype: {
    subtypeId: number | null;
    subtypeName: string;
  }[];
}

export interface TagspProps {
  tagsId: number | null;
  tagsName: string;
}

export interface SubTypeProps {
  subtypeId: null | number;
  subtypeName: string;
}
export interface CurrentObjToPushProps {
  id: null | number;
  category: {
    categoryId: number | null;
    categoryName: string;
    subcategory: {
      subcategoryId: number | null;
      subcategoryName: string;
    };
  };
  type: {
    typeId: number | null;
    typeName: string;
    subtype: {
      subtypeId: number | null;
      subtypeName: string;
    };
  };
  tmfFactor: {
    key: string;
    operationalOn: string;
    keyName: string;
    value: number;
  }[];
}
