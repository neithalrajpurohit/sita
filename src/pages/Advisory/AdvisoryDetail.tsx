import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { useDispatch } from "react-redux";
import { AdvisoryActionCreator } from "../../store/Advisory/AdvisorySlice";
import { AppDispatch } from "../..";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import Loading from "../../component/Loading";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import { LoadingContainer } from "../GlobalStyles";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const AdvisoryDetail = () => {
  const params: any = useParams();
  const advisoryData = useSelector((state: RootState) => state.Advisory);
  const dispatch: AppDispatch = useDispatch();
  const [numPages, setNumPages] = React.useState(null);

  useEffect(() => {
    dispatch(AdvisoryActionCreator.GeAdvisoryPdf({ id: params.id }));
  }, [dispatch, params.id]);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  if (advisoryData.isLoading) {
    return (
      <LoadingContainer height="90vh">
        <Loading title="" width="" />
      </LoadingContainer>
    );
  }
  return (
    <div>
      <div className="dynamic-security-pulse-nav navbar-securitypulse">
        <NavLink className="font-italic dynamic-security-pulse-nav-link" to="/">
          <img
            className="acme macme dynamic-security-pulse-nav-img"
            src={logo}
            alt=""
            loading="eager"
          />
        </NavLink>
      </div>
      <div className="d-flex justify-content-center align-items-center  margin-top-50">
        <div className="advisory-div-container">
          <div className="d-flex justify-content-center align-items-center margin-15">
            <Document
              file={`data:application/pdf;base64,${advisoryData?.pdfData}`}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(e) => console.log(e)}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryDetail;
