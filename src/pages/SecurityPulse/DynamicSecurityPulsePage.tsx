import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../index";
import { SecurityPulseDetailsActionCreator } from "../../store/SecurityPulse/SecurityPulseDetailsSlice";
import Loading from "../../component/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import SecurityPulseDetailComp from "../../component/SecurityPulseDetailComp";
import { StyledContainer, BoxCard, EyeContainer } from "./DynamicStyles";

const DynamicSecurityPulseDetailsPage = () => {
  const { id }: any = useParams();
  const dispatch: AppDispatch = useDispatch();

  const SecurityState = useSelector(
    (state: RootState) => state.SecurityPulseDetails
  );
  const data = useSelector(
    (state: RootState) => state.SecurityPulseDetails.SecurityPulseDetailsData
  );

  useEffect(() => {
    dispatch(
      SecurityPulseDetailsActionCreator.getSecurityPulseDetailsData(id)
    ).then(() =>
      dispatch(SecurityPulseDetailsActionCreator.updateIsPreview(false))
    );
  }, [dispatch, id]);

  const { headerData, securityPulseFormData, footerData } = data;

  return (
    <>
      {SecurityState.isLoading ? (
        <Loading title={""} width={"1050px"} />
      ) : (
        <>
          {SecurityState.SecurityPulseDetailsData.securityPulseFormData ? (
            <SecurityPulseDetailComp
              securityPulseFormData={securityPulseFormData}
              handleEdit={() => {}}
              handleDownload={() => {}}
              footerData={footerData}
              isPreview={SecurityState.isPreview}
              backTOForm={() => {}}
              publishSecurityPulse={() => {}}
              UserData={SecurityState.SecurityPulseDetailsData}
              headerData={headerData}
            />
          ) : (
            <StyledContainer>
              <BoxCard>
                <EyeContainer>
                  <h1>404</h1>
                  <h2>Page Not Found</h2>
                </EyeContainer>
              </BoxCard>
            </StyledContainer>
          )}
        </>
      )}
    </>
  );
};

export default DynamicSecurityPulseDetailsPage;
