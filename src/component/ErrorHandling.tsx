import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../index";
import { userAuthenticationActionCreator } from "../store/UserAuthentication/UserAuthSlice";
interface TErrorHandlingProps {
  message: string;
  resetErrorBoundary: any;
}

const ErrorHandling = (props: TErrorHandlingProps) => {
  const dispatch: AppDispatch = useDispatch();

  const reset = () => {
    dispatch(userAuthenticationActionCreator.handleLogout());
    sessionStorage.removeItem("persist:root");
    sessionStorage.removeItem("userTokens");
  };

  return (
    <Row className="justify-content-center text-center mt-4">
      <Col className="col-12 col-md-6 col-lg-5 col-xl-5">
        <Row className="errorCard">
          <Col className="errorCardTitle">Error</Col>
        </Row>
        <Row>
          <Col>
            <p>An unexpected error has occured.</p>

            <p className="text-muted small">
              {/* <p>Code: c1</p> */}
              <p>{props.message}</p>
            </p>
            {/* <button >Try again</button> */}
            <a href="/" onClick={reset}>
              GO TO HOME
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ErrorHandling;
