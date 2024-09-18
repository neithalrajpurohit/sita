export interface FormData {
  data: any;
  onChange: any;
}
export type CustomObj = {
  functionId: string;
  isuserDef: boolean;
  functionName: string;
  functionColor: string;
  process: {
    processName: string;
    processColor: string;
    isuserDef: boolean;
    processId: string;
    parentId: string;
  }[];
};
