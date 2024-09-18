// Risk Onboarding type

export type FetchPageResponse = {
  page: number;
  entity_id: number;
  screen_type: string;
  screen_id: number;
  screen_name: string;
  page_data: Array<{
    question_id: number;
    question_no: number;
    question: string;
    answers: Array<{
      answer_value: number;
      answer_text: string;
      on_hover: string;
    }>;
    selected_answer: number;
  }>;
};

export interface RiskStatusResponse {
  onboarding_completed: boolean;
  screen_details: {
    page: number;
    screen_id: number;
    screen_name: string;
    all_screens: { screen_id: number; screen_name: string; page: number }[];
  };
  status: number;
}

export type SecurityManagementFetchPageResponse = {
  page: number;
  entity_id: number;
  screen_type: string;
  screen_id: number;
  screen_name: string;
  page_data: {
    security_governance: {
      predefined_ciso_lor: string[];
      selected_ciso_lor: string[];
      ciso_lor_others: string[];
      selected_ciso_lor_others: string[];
      predefined_members: string[];
      selected_members: string[];
      members_others: string[];
      selected_members_others: string[];
      deleted_ciso_others: string[];
      deleted_members_others: string[];
      steering_committee: string;
      internal_audit_frequency: string;
      meeting_frequency: string;
    };
    security_organization: {
      direct_reports: number;
      indirect_reports: number;
      predefined_flor: string[];
      predefined_flor_values: string[];
      selected_flor: {
        name: string;
        label: string;
        value: string;
      }[];
      flor_others: string[];
      selected_flor_others: {
        name: string;
        label: string;
        value: string;
      }[];
      deleted_flor_others: string[];
      security_budget: number;
    };
    security_compliance: {
      deleted_regulation_others: {
        label: string;
        name: string;
        freq: number;
      }[];
      predefined_regulation: string[];
      regulation_others: {
        label: string;
        name: string;
        freq: number;
      }[];
      selected_regulation: {
        label: string;
        name: string;
        freq: number;
      }[];
    };
  };
};

export type UpdatePageRequestBody =
  | FetchPageResponse
  | SecurityManagementFetchPageResponse;

// Define initial state
export type InitialState = {
  pageData: {
    [page: string]: FetchPageResponse | SecurityManagementFetchPageResponse;
  };
  /**
   * page number of the last page that was saved successfully to the server
   */
  filled: RiskStatusResponse | undefined;
  pageStatus: {
    [page: string]:
      | {
          /**
           * status of the page
           */
          status: "idle" | "loading" | "saving" | "saved" | "loaded" | "failed";
          /**
           * error message if any in case of failure
           */
          error: string | undefined;
        }
      | undefined;
  };
  layoutInfo: any[];
  response: {
    response: string;
    status: string | number;
  };
};

// Risk Question types
export interface DeletePayLoad {
  screen_id: number;
  screen_name: string;
  screen_type: string;
  question_id: number;
  question_no: number;
  lang_code: string;
}

export interface AddUpdatePayload {
  screen_id: number;
  screen_name: string;
  screen_type: string;
  lang_code: string;
  question: {
    answers: {
      answer_text: string;
      answer_value: number;
      on_hover: string;
    }[];
    question: string;
    question_id: number | null;
    question_no: number;
    selected_answer: number;
  };
}

export interface SecondaryState {
  langCode: string;
  totalPage: {
    screen_id: number;
    screen_name: string;
    page: number;
  }[];
  questions: {
    page: number;
    page_data: {
      answers: {
        answer_text: string;
        answer_value: number;
        on_hover: string;
      }[];
      question: string;
      question_id: number;
      question_no: number;
      selected_answer: number;
    }[];
    screen_id: number;
    screen_name: string;
    screen_type: string;
    lang_code: string;
  };
}
