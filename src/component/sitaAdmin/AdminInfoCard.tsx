import { Card, Col } from "react-bootstrap";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { AdminInfoCardProps } from "./SitaAdminTypes";
import { AdminInfoCardSubTitle, AdminInfoCardTitle } from "./SitaAdminStyles";

const AdminInfoCard = (props: AdminInfoCardProps) => {
  const { data } = props;
  const { height } = useWindowDimensions();

  return (
    <div className="d-flex">
      <Col xs={12} className="p-0">
        <div className="admin-card-info d-flex flex-row justify-content-evenly">
          {data.map((item: any, i: number) => (
            <Card key={i} className="admin-card-info-card">
              <AdminInfoCardTitle
                fontSize={window.innerWidth < 932 ? "1.4rem" : "1.8rem"}
                lineHeight={
                  window.innerWidth > 1440
                    ? ((height - 250) / 2 / 2 - 50) / 4 + "px"
                    : "18px"
                }
              >
                {item.value}
              </AdminInfoCardTitle>
              <AdminInfoCardSubTitle
                fontSize={window.innerWidth < 932 ? "0.8rem" : "1.1rem"}
              >
                {item.title}
              </AdminInfoCardSubTitle>
            </Card>
          ))}
        </div>
      </Col>
    </div>
  );
};
export default AdminInfoCard;
