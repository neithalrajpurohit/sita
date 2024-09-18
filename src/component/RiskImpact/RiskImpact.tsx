import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../configureStore";
import { AppDispatch } from "../../index";
import { RguPageActionCreator } from "../../store/Rgu/RguSlice";
import RGUGridTable from "./RGUGridTable";
import RGUDefinitionForm from "./RGUDefinationForm";
import RGUList from "./RGUList";
import { MainContainer } from "./RiskImpactStyles";
import { RGUData } from "./RiskImpactUtils";

interface RiskImpactProps {
  onSave: (data: RGUData[]) => void;
  listType: "function" | "process";
}

function RiskImpact({ onSave, listType }: RiskImpactProps) {
  const dispatch: AppDispatch = useDispatch();
  const listOfFunctionProcess = useSelector(
    (state: RootState) => state.Rgu.functionAndProcess
  );
  const rguDataListArray = useSelector(
    (state: RootState) => state.Rgu.rguListData
  );
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState<RGUData>({
    id: null,
    revenue: "",
    revenue_unit: "",
    rgu_name: "",
    rgu_color: "",
    functions_processes: [],
  });

  const [rguDataList, setRguDataList] = useState<RGUData[]>(rguDataListArray);
  const [selectedRguId, setSelectedRguId] = useState<null | number>(null);
  const [isEditingRgu, setIsEditingRgu] = useState(false);

  const usedColors: Set<string> = new Set(
    rguDataList.map((rgu) => rgu.rgu_color)
  );

  const pushRguObjToList = () => {
    setIsSaving(true);
    dispatch(RguPageActionCreator.addUpdateRgu([data])).then((res) => {
      toast(res.payload.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      });
      onSave(res.payload.data);
      setRguDataList(res.payload.data);
      setData({
        id: null,
        revenue: "",
        revenue_unit: "",
        rgu_name: "",
        rgu_color: "",
        functions_processes: [],
      });
      setSelectedRguId(null);
      setIsEditingRgu(false);
      setIsSaving(false);
    });
  };

  const deleteRguFromList = async () => {
    if (selectedRguId === null) return;
    dispatch(RguPageActionCreator.deleteRgu({ id: selectedRguId })).then(
      (res) => {
        toast(res.payload.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
        });
        onSave(res.payload.data);
        setRguDataList(res.payload.data);
        setSelectedRguId(null);
      }
    );
  };

  return (
    <MainContainer fluid>
      <Row lg={12} className="g-2">
        {/* Form To Add Update RGU With ADD Button */}
        <Col lg={3} className="my-1">
          <Row lg={12}>
            <RGUDefinitionForm
              usedColors={usedColors}
              data={data}
              setData={setData}
              pushRguObjToList={pushRguObjToList}
              isEditingRgu={isEditingRgu}
              isSaving={isSaving}
            />
            {/* RGU List With Edit And Delete Button  */}
            <RGUList
              rguDataList={rguDataList}
              selectedRguId={selectedRguId}
              setSelectedRguId={setSelectedRguId}
              setIsEditingRgu={setIsEditingRgu}
              deleteRguFromList={deleteRguFromList}
              setData={setData}
            />
          </Row>
        </Col>

        {/* Shows Total List Of Function And Processes Mapping With Respected RGU Multiple Options Yet Not Decided */}
        <Col lg={9} className="my-1">
          <RGUGridTable
            listType={listType}
            data={rguDataList}
            listOfFunctionProcess={listOfFunctionProcess}
            onSave={onSave}
            setRguDataList={setRguDataList}
          />
        </Col>
      </Row>
    </MainContainer>
  );
}

export default RiskImpact;
