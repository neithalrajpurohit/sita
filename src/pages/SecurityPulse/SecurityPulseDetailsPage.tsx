import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../index";
import { RootState } from "../../configureStore";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "../../component/Loading";
import SecurityPulseDetailComp from "../../component/SecurityPulseDetailComp";
import { addSecurityPulseActionCreator } from "../../store/AddEdits/AddEditSecurityPulseSlice";
import { SecurityPulseGridActionCreator } from "../../store/SecurityPulse/SecurityPulseGridSlice";

type TSecurityPulseDetailProps = ReturnType<typeof mapStateToProps>;

const SecurityPulseDetailPage = (props: TSecurityPulseDetailProps) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const [isShowMsg, setIsShowMsg] = useState(false);

  useEffect(() => {
    document.title = "SecurityPulse";
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const handleEdit = () => {
    history.push("/AddEditSecurityPulse");

    dispatch(
      addSecurityPulseActionCreator.getSecurityPulse(
        props.SecurityPulseDetailData.selectedIncidentId
      )
    )
      .then(() =>
        dispatch(addSecurityPulseActionCreator.updateSecurityPulseMode("edit"))
      )
      .then(() => dispatch(addSecurityPulseActionCreator.resetEditStates()))
      .then(() =>
        dispatch(addSecurityPulseActionCreator.setCancelMode("editDetail"))
      );
  };

  const backTOForm = () => {
    history.push("/AddEditSecurityPulse");
  };

  useEffect(() => {
    if (isShowMsg) {
      if (
        props.AddEditSecurityPulseData.addSecurityPulseResp.status?.toLowerCase() ===
        "success"
      ) {
        toast.success(
          props.AddEditSecurityPulseData.addSecurityPulseResp.message,
          {
            position: "top-center",
            autoClose: 300,
          }
        );
        setTimeout(() => {
          history.push("/SecurityPulseGrid");
        }, 100);
        dispatch(
          SecurityPulseGridActionCreator.getGridDataSecurityPulse({
            fromDate: moment(
              new Date(props.SecurityPulseGridData.startDate),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            toDate: moment(
              new Date(props.SecurityPulseGridData.endDate),
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD"),
            // dropdownFilters: props.PerspectiveGridData.dropdownfilters,
          })
        );
        setIsShowMsg(false);
      } else if (
        props.AddEditSecurityPulseData.addSecurityPulseResp.status?.toLowerCase() ===
        "error"
      ) {
        // setIsError(true);
        toast.error(
          props.AddEditSecurityPulseData.addSecurityPulseResp.message,
          {
            position: "top-center",
            autoClose: 4000,
          }
        );
        setIsShowMsg(false);
      }
    }
  }, [props.AddEditSecurityPulseData.addSecurityPulseResp]);

  const publishSecurityPulse = () => {
    const tempFormData = { ...props.AddEditSecurityPulseData.FormData };
    tempFormData.isPublished = true;
    tempFormData.userName =
      props.UserData.userDetails?.user?.first_name +
      props.UserData.userDetails?.user?.last_name;
    dispatch(
      addSecurityPulseActionCreator.addSecurityPulse({
        formData: tempFormData,
        mode: props.AddEditSecurityPulseData.mode,
      })
    );
    setIsShowMsg(true);
  };

  const { headerData, securityPulseFormData, footerData } =
    props.SecurityPulseDetailData.SecurityPulseDetailsData;

  if (props.SecurityPulseDetailData.isError) {
    return (
      <div className="error">
        Error while fetching the data. Please contact administrator.
      </div>
    );
  }
  // if (!props.SecurityPulseDetailData.isLoaded) {
  if (props.SecurityPulseDetailData.isLoading) {
    return <Loading title={""} width={"1050px"} />;
  }
  // }
  if (props.SecurityPulseDetailData.isLoaded) {
    if (props.SecurityPulseDetailData.SecurityPulseDetailsData) {
      var SecurityPulseDetailData = JSON.parse(
        JSON.stringify(props.SecurityPulseDetailData.SecurityPulseDetailsData)
      );
    }

    return (
      <>
        {props.SecurityPulseDetailData.isLoading ||
        props.AddEditSecurityPulseData.isAddSecurityPulseLoading ? (
          <Loading title={""} width={"1050px"} />
        ) : (
          <SecurityPulseDetailComp
            securityPulseFormData={securityPulseFormData}
            handleEdit={handleEdit}
            handleDownload={handleDownload}
            footerData={footerData}
            isPreview={props.SecurityPulseDetailData.isPreview}
            backTOForm={backTOForm}
            publishSecurityPulse={publishSecurityPulse}
            UserData={props.UserData}
            headerData={headerData}
          />
        )}
      </>
    );
  }

  return <div></div>;
};

function mapStateToProps(state: RootState) {
  return {
    SecurityPulseDetailData: state.SecurityPulseDetails,
    AddEditSecurityPulseData: state.AddEditSecurityPulse,
    UserData: state.UserAuthentication,
    SecurityPulseGridData: state.SecurityPulseGrid,
  };
}

export default connect(mapStateToProps)(SecurityPulseDetailPage);
