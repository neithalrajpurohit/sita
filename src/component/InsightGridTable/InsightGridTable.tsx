import { useEffect, useState } from "react";
import {
  HiChevronRight,
  HiChevronLeft,
  HiDocumentArrowDown,
  HiEye,
  HiShare,
  HiChatBubbleOvalLeft,
  HiAtSymbol,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { DateToStringGrid } from "../../utils/Common";

import moment from "moment";
import { downloadDataAsCsv } from "../../utils/CsvDownloadFn";
import { toast } from "react-toastify";
import { InsightDetailsActionCreator } from "../../store/Insights/InsightDetailSlice";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../index";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { InsightGridActionCreators } from "../../store/Insights/InsightGridSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import Loader from "../Loader";
import CustomModal from "../Modal";
import { DateRangePicker } from "react-date-range";
import {
  DateRangeButtonContainer,
  StyledGridIcon,
  StyledPagination,
  StyledSearchContainer,
  StyledSearchInput,
  StyledTable,
  StyledTopContainer,
} from "./InsightStyles";
// import ReactTooltip from "react-tooltip";
import { InsightGridTableProps } from "./InsightTypes";
import { useTranslation } from "react-i18next";
// @ts-ignore
import * as locales from "react-date-range/dist/locale";
import useTranslateCalender from "../../hooks/useTranslateCalender";
import { isAfter } from "date-fns";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";
import ReactTooltip from "react-tooltip";

const InsightGridTable = (props: InsightGridTableProps) => {
  const { t } = useTranslation();
  const { data } = props;
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const InsightGrid = useSelector((state: RootState) => state.InsightGrid);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isCommentShowModal, setIsCommentShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [commentModalInputs, setCommentModalInputs] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const selectedLang = useSelector(
    (state: RootState) => state.UserAuthentication.language
  );
  const [modalCountClickOnDate, setModalCountClickOnDate] = useState(0);
  const [resolutionModalInputs, setResolutionModalInputs] = useState({
    userName: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const [resolutionSubmit, setResolutionSubmit] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
    // Customize the logic based on your table data structure
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Get the subset of data to display on the current page
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle pagination button clicks
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle search query change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  function truncate(str: string) {
    return str.length > 40 ? str.substring(0, 40) + "..." : str;
  }
  function truncateAlt(str: string) {
    return str.length > 15 ? str.substring(0, 15) + "..." : str;
  }

  const DownloadCsv = (
    data: {
      Alert: string;
      AlertType: string;
      AlertDetails: string;
      StartDate: string;
      LastUpdated: string;
      STATUS: string;
      LEVEL: string;
      OWNER: string;
      ID: number;
    }[]
  ) => {
    downloadDataAsCsv(data, "InsightGridData.csv");
  };

  const handleShare = async (row: {
    Alert: string;
    AlertType: string;
    AlertDetails: string;
    StartDate: number;
    LastUpdated: number;
    STATUS: string;
    LEVEL: string;
    OWNER: string;
    ID: number;
  }) => {
    const startDate = moment(new Date(row.StartDate), "DD-MM-YYYY").format(
      "YYYY MMM DD"
    );
    const updatedDate = moment(new Date(row.LastUpdated), "DD-MM-YYYY").format(
      "YYYY MMM DD"
    );

    const shareData = {
      title: `Alert Details Of ${row.Alert}`,
      text: `Owner : ${row.OWNER},
      AlertId : ${row.Alert},
      AlertType : ${row.AlertType},
      AlertDetails : ${row.AlertDetails},
      Status : ${row.STATUS}, 
      Level : ${row.LEVEL},    
      DateRaised : ${startDate},
      DateUpdated : ${updatedDate}`,
    };

    if (!navigator.canShare) {
      return toast.warning(
        "This feature is available only in secure contexts (HTTPS)",
        { position: "top-center", autoClose: 10000 }
      );
    }
    navigator.share(shareData).then(() => {
      toast.success(`${t("sharedsuccessfully")}`, {
        position: "top-center",
        autoClose: 4000,
      });
    });
  };

  function onEyeButtonClick(incidentId: string, Id: number | string) {
    dispatch(
      InsightDetailsActionCreator.getInsightDetailsData({
        incidentId,
        Id,
      })
    ).then(() => history.push(`/InsightDetail`));
  }

  const CsvData = data.map((f) => {
    return {
      ...f,
      StartDate: moment.utc(f.StartDate).format("DD-MM-YYYY"),
      LastUpdated: moment.utc(f.LastUpdated).format("DD-MM-YYYY"),
    };
  });

  useEffect(() => {
    if (InsightGrid.isRequestUserCommentLoaded && resolutionSubmit) {
      if (InsightGrid.requestUserCommentStatus) {
        setSelectedRows([]);
        setCommentModalInputs("");
        // sendRequestForGridData();
        toast.success(InsightGrid.requestUserCommentResponse, {
          position: "top-center",
          autoClose: 4000,
        });
        setIsCommentShowModal(false);
      } else {
        toast.error(InsightGrid.requestUserCommentResponse, {
          position: "top-center",
          autoClose: 4000,
        });
        setIsCommentShowModal(false);
      }
    } else return;
    if (InsightGrid.isRequestUserCommentError && resolutionSubmit) {
      toast.error("Server Error", {
        position: "top-center",
        autoClose: 4000,
      });
      setIsCommentShowModal(false);
    } else return;
  }, [
    InsightGrid.isRequestUserCommentError,
    InsightGrid.isRequestUserCommentLoaded,
    InsightGrid.requestUserCommentResponse,
    InsightGrid.requestUserCommentStatus,
    resolutionSubmit,
  ]);

  useEffect(() => {
    if (InsightGrid.isRequestResolutionLoaded && resolutionSubmit) {
      if (InsightGrid.requestResoluationStatus) {
        setSelectedRows([]);
        setResolutionModalInputs({
          userName: "",
          startDate: new Date(),
          endDate: new Date(),
        });
        // sendRequestForGridData();
        toast.success(InsightGrid.requestResoluationResponse, {
          position: "top-center",
          autoClose: 4000,
        });
        setIsShowModal(false);
      } else {
        setIsShowModal(false);
        toast.error(InsightGrid.requestResoluationResponse, {
          position: "top-center",
          autoClose: 4000,
        });
      }
    } else return;
    if (InsightGrid.isRequestResolutionError && resolutionSubmit) {
      setIsShowModal(false);
      toast.error("Server Error", {
        position: "top-center",
        autoClose: 4000,
      });
    } else return;
  }, [
    InsightGrid.isRequestResolutionError,
    InsightGrid.isRequestResolutionLoaded,
    InsightGrid.requestResoluationResponse,
    InsightGrid.requestResoluationStatus,
    resolutionSubmit,
  ]);

  useEffect(() => {
    if (
      new Date(new Date(resolutionModalInputs.startDate)).toDateString() !==
      new Date(new Date(resolutionModalInputs.endDate)).toDateString()
    ) {
      setShowDatePicker(false);
      setModalCountClickOnDate(0);
    } else if (modalCountClickOnDate % 2 === 0) {
      setShowDatePicker(false);
      setModalCountClickOnDate(0);
    }
  }, [modalCountClickOnDate, resolutionModalInputs]);

  const onCommentHide = () => {
    setIsCommentShowModal(false);
    if (selectedRows.length === 1) {
      setSelectedRows([]);
      // sendRequestForGridData();
    }

    setCommentModalInputs("");
  };

  const handleCommentSubmit = async () => {
    dispatch(
      InsightGridActionCreators.requestUserCommentRequest({
        Comment: commentModalInputs,
        selectedIncidents: selectedIncident,
      })
    ).then(() => {
      onCommentHide();
      setResolutionSubmit(true);
    });
  };
  useTranslateCalender(showDatePicker);

  const modalCommentBody = (
    <>
      <p>
        <span className="fw-bold">
          {t("selectedincident")}: {selectedIncident}
        </span>
      </p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Group
          className="mb-3 d-flex flex-row align-items-center"
          controlId="comment"
        >
          <Form.Label className="m-0 fw-bold flex-2">
            {t("comment")}:
          </Form.Label>
          <Form.Control
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommentModalInputs(e.target.value)
            }
            value={commentModalInputs}
            name="comment"
            placeholder={"@" + t("comment")}
            className="risk-input-style flex-7"
            maxLength={100}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!commentModalInputs.trim()) return;
                handleCommentSubmit();
              }
            }}
          />
        </Form.Group>
        {commentModalInputs?.length === 100 && (
          <div className=" text-center alert alert-danger textarea-footer">
            {t("inputlimit")}
          </div>
        )}
      </Form>
    </>
  );

  const modalCommentFooter = (
    <>
      {InsightGrid.isRequestUserCommentLoading ? (
        <div className="">
          <Loader loaderType="BeatLoader" />
        </div>
      ) : (
        <>
          <Button
            variant="outline-primary"
            className="btn-custom-info px-4"
            onClick={handleCommentSubmit}
            disabled={!commentModalInputs.trim()}
          >
            {t("submit")}
          </Button>
        </>
      )}
      <Button variant="outline-danger" onClick={onCommentHide} className="ml-3">
        {t("cancel")}
      </Button>
    </>
  );

  const handleResolutionDateChange = (ranges: any) => {
    const { selection } = ranges;

    const currentDate = new Date();

    if (isAfter(selection.endDate, currentDate)) {
      // If the selected start date is in the future, replace it with today's date
      selection.endDate = currentDate;
    }
    setModalCountClickOnDate(modalCountClickOnDate + 1);
    setResolutionModalInputs({
      ...resolutionModalInputs,
      startDate: new Date(selection.startDate),
      endDate: new Date(selection.endDate),
    });
  };

  const handleSubmit = async () => {
    dispatch(
      InsightGridActionCreators.requestResolutionRequest({
        userName: resolutionModalInputs.userName,
        startDate: moment(resolutionModalInputs.startDate, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        ),
        endDate: moment(resolutionModalInputs.endDate, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        ),
        selectedIncidents: selectedRows,
      })
    ).then(() => {
      setResolutionSubmit(true);
      onHide();
    });
  };

  const handleBlurPage = () => {
    setModalCountClickOnDate(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolutionModalInputs({
      ...resolutionModalInputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlurAssign = (e: any) => {
    //if the element is not child element then it will call this function
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowDatePicker(false);
      handleBlurPage();
    }
  };

  const onHide = () => {
    setIsShowModal(false);
    if (selectedRows.length === 1) {
      setSelectedRows([]);
      // sendRequestForGridData();
    }

    setResolutionModalInputs({
      userName: "",
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  const modalBody = (
    <>
      <Form>
        <Form.Group
          className="mb-3 d-flex flex-row align-items-center"
          controlId="userName"
        >
          <Form.Label className="m-0 fw-bold flex-4">
            {t("assignto")}:
          </Form.Label>
          <Form.Control
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
            value={resolutionModalInputs.userName}
            name="userName"
            placeholder={"@" + t("email").toLowerCase()}
            className="risk-input-style flex-9"
            maxLength={100}
          />
        </Form.Group>
        {resolutionModalInputs.userName?.length === 100 && (
          <div className=" text-center alert alert-danger textarea-footer">
            {t("inputlimit")}
          </div>
        )}
        <Form.Group
          className="mb-3 d-flex flex-row align-items-center"
          controlId="formBasicEmail"
        >
          <Form.Label className="m-0 fw-bold flex-4">
            {t("setdate")}:{" "}
          </Form.Label>
          <DateRangeButtonContainer
            className="flex-9"
            onBlur={(e) => handleBlurAssign(e)}
          >
            <button
              className="btn btn-outline d-flex align-items-center justify-content-between dateSelectorButton"
              onClick={(e) => {
                e.preventDefault();
                setShowDatePicker(!showDatePicker);
              }}
            >
              <HiOutlineCalendarDays />
              &nbsp; {t("daterange")} &nbsp;
              <HiOutlineChevronDown />
            </button>
            <div>
              {t("from")} :{" "}
              {DateToStringGrid(resolutionModalInputs?.startDate, selectedLang)}{" "}
              {t("to")} :{" "}
              {DateToStringGrid(resolutionModalInputs?.endDate, selectedLang)}{" "}
              (UTC)
            </div>

            <div className="shadow date-range-chartHeader-grid">
              {showDatePicker && (
                <DateRangePicker
                  ranges={[
                    {
                      startDate: resolutionModalInputs.startDate,
                      endDate: resolutionModalInputs.endDate,
                      key: "selection",
                    },
                  ]}
                  onChange={handleResolutionDateChange}
                  maxDate={moment().toDate()}
                  locale={locales[selectedLang]}
                />
              )}
            </div>
          </DateRangeButtonContainer>
        </Form.Group>
      </Form>
    </>
  );

  const modalFooter = (
    <>
      {InsightGrid.isRequestResolutionLoading ? (
        <div className="">
          <Loader loaderType="BeatLoader" />
        </div>
      ) : (
        <>
          <Button
            variant="outline-primary"
            className="btn-custom-info px-4"
            onClick={handleSubmit}
            disabled={
              !resolutionModalInputs.userName.trim() ||
              !resolutionModalInputs.endDate ||
              !resolutionModalInputs.startDate
            }
          >
            {t("submit")}
          </Button>
        </>
      )}
      <Button variant="outline-danger" onClick={onHide} className="ml-3">
        {t("cancel")}
      </Button>
    </>
  );

  return (
    <div className="w-100 h-100 p-0 m-0">
      <StyledTopContainer>
        <StyledGridIcon className="mx-2 my-0">
          <button
            disabled={displayedData.length === 0}
            className="m-0 p-0"
            onClick={() => DownloadCsv(CsvData)}
          >
            <HiDocumentArrowDown fontSize="1rem" color="inherent" />
          </button>
        </StyledGridIcon>
        <StyledSearchContainer>
          <StyledSearchInput
            onChange={handleSearch}
            type="text"
            value={searchQuery}
            placeholder={t("searchintable")}
          />
          {searchQuery === "" ? (
            <HiOutlineMagnifyingGlass fontSize="1rem" className="mx-2" />
          ) : (
            <HiOutlineXMark
              fontSize="1rem"
              className="mx-2"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
            />
          )}
        </StyledSearchContainer>
      </StyledTopContainer>
      {displayedData.length > 0 ? (
        <>
          <StyledTable>
            <thead>
              <tr>
                <th>{t("incident").toUpperCase()}</th>
                <th>{t("incidentdetails").toUpperCase()}</th>
                <th>{t("startdate").toUpperCase()}</th>
                <th>{t("lastupdated").toUpperCase()}</th>
                <th>{t("alerttype").toUpperCase()}</th>
                <th>{t("status").toUpperCase()}</th>
                <th>{t("level").toUpperCase()}</th>
                <th>{t("owner").toUpperCase()}</th>
                <th>{t("actions").toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((e) => (
                <tr key={e.ID}>
                  <td
                    className="insight-grid-clickable"
                    onClick={() => onEyeButtonClick(e.Alert, e.ID)}
                  >
                    {e.Alert}
                  </td>
                  <td
                    data-tip={`<div style="width: 100%; max-width:50rem;">
                        ${e.AlertDetails}
                      </div>`}
                    data-for="React-tooltip"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    {truncate(e.AlertDetails)}
                  </td>
                  <td>{moment.utc(e.StartDate).format("DD MMM YY")}</td>
                  <td>{moment.utc(e.LastUpdated).format("DD MMM YY")}</td>
                  <td>
                    {typeof e.AlertType === "string"
                      ? truncateAlt(e.AlertType)
                      : "-"}
                  </td>
                  <td>{e.STATUS}</td>
                  <td>{e.LEVEL}</td>
                  <td>{e.OWNER}</td>
                  <td>
                    <button onClick={() => onEyeButtonClick(e.Alert, e.ID)}>
                      <HiEye fontSize="1rem" color="inherent" />
                    </button>
                    <button>
                      <HiShare
                        onClick={() => handleShare(e)}
                        fontSize="1rem"
                        color="inherent"
                      />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRows([e.Alert]);
                        setIsShowModal(true);
                      }}
                    >
                      <HiAtSymbol fontSize="1rem" color="inherent" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIncident(e.Alert);
                        setIsCommentShowModal(true);
                      }}
                    >
                      <HiChatBubbleOvalLeft fontSize="1rem" color="inherent" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          {/* Render pagination controls */}
          <StyledPagination>
            <span>
              {t("page")} {currentPage} - {totalPages}{" "}
            </span>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiChevronLeft fontSize="1rem" color="inherent" />
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <HiChevronRight fontSize="1rem" color="inherent" />
            </button>
          </StyledPagination>
          {showTooltip && (
            <ReactTooltip
              html={true}
              id="React-tooltip"
              place="top"
              type="light"
              effect="float"
              border
              textColor="var(--entityonboarding-text-color)"
              backgroundColor="var(--admin-card-bg-color)"
              borderColor="var(--entityonboarding-text-color)"
              getContent={(dataTip) => dataTip}
            />
          )}
        </>
      ) : (
        <NoDataAvailable height="90%" width="96%" />
      )}

      <CustomModal
        modalBody={modalBody}
        modalTitle={t("reqresolution")}
        show={isShowModal}
        onHide={onHide}
        modalFooter={modalFooter}
      />
      <CustomModal
        modalBody={modalCommentBody}
        modalTitle={`${t("add")} ${t("comment")}`}
        show={isCommentShowModal}
        onHide={onCommentHide}
        modalFooter={modalCommentFooter}
      />
    </div>
  );
};

export default InsightGridTable;
