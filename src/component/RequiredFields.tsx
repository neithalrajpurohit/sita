import { RequiredFeildStart } from "./GlobalComponentStyles";

export interface RequiredFieldsProps {
  right?: string;
}

const RequiredFields = (props: RequiredFieldsProps) => {
  return <RequiredFeildStart right={props.right}>*</RequiredFeildStart>;
};

export default RequiredFields;
