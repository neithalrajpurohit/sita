import { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Silver from "../../assets/images/silver1.png";
import Gold from "../../assets/images/gold1.png";
import Platinum from "../../assets/images/platinum1.png";
import { HiCheck } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import { RootState } from "../../configureStore";
import { useHistory } from "react-router-dom";
import { RoutePath } from "../../helpers/RoutePath";
import { AdminActionCreator } from "../../store/Admin/AdminSlice";
import FaQ from "../../component/sitaAdmin/FaQ";
import { toast } from "react-toastify";

const TenantPackages = () => {
  const userData = useSelector((state: RootState) => state.UserAuthentication);
  const packagesData = useSelector(
    (state: RootState) => state.Admin.fetchPackageData
  );
  const faqData = useSelector((state: RootState) => state.Admin.fetchFaqData);
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const schema = params.get("id");

  useEffect(() => {
    document.title = "Tenant Packages";
  }, []);
  useEffect(() => {
    if (userData.userDetails.user.role !== "SitaAdmin") {
      history.replace(RoutePath.DASHBOARD);
    }
  }, [history, userData.userDetails.user.role]);
  useEffect(() => {
    dispatch(AdminActionCreator.fetchPackage()).then(() => {
      dispatch(AdminActionCreator.fetchFaq());
    });
  }, [dispatch]);

  const hadleSubmit = (e: any) => {
    const payload = {
      schema_name: schema,
      package: e.packageName,
    };
    dispatch(AdminActionCreator.addTenantData(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast("Package Upgraded Sucessfully!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        history.push(`/ManageUsers`);
      }
    });
  };

  return (
    <div>
      <div className="package-header">PLAN & PRICING</div>
      <Row className="d-flex justify-content-center">
        {packagesData.map((e: any, index: number) => (
          <></>
        ))}
      </Row>
      <Row>
        <FaQ data={faqData} />
      </Row>
    </div>
  );
};

export default TenantPackages;
