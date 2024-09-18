export const ApiVersion = "/v1";
export const EndPoints = {
  //Perspective
  PERSPECTIVE_GRID_DATA: "/perspective_grid_data/",
  PERSPECTIVE_MASTER_DROPDOWN: "/perspective_master_dropdown/",
  PERSPECTIVE_RECORD_DELETE: "/perspective_record_delete/",
  PERSPECTIVE_DETAILS_DATA: "/perspective_details_data/",
  ADD_PERSPECTIVE_RECORD: "/add_perspective_record/",
  EDIT_PERSPECTIVE_RECORD_SUBMIT: "/edit_perspective_record_submit/",
  EDIT_PERSPECTIVE_RECORD_FETCH: "/edit_perspective_record_fetch/",

  // Tags
  FETCH_INCIDENT_TAGS: "/fetch_incident_tags/",
  FETCH_ASSET_TAGS: "/fetch_asset_tags/",
  FETCH_ENITY_TAGS: "/fetch_enity_tags/",

  // Security Pulse
  SECURITY_PULSE_GRID_DATA: "/security_pulse_grid_data/",
  SECURITY_PULSE_RECORD_DELETE: "/security_pulse_record_delete/",
  SECURITY_PULSE_DETAILS_DATA: "/security_pulse_details_data/",
  ADD_SECURITY_PULSE_RECORD: "/add_security_pulse_record/",
  EDIT_SECURITY_PULSE_RECORD_SUBMIT: "/edit_security_pulse_record_submit/",
  EDIT_SECURITY_PULSE_RECORD_FETCH: "/edit_security_pulse_record_fetch/",

  //Insight
  INSIGHT_TICKETS: "/insight_tickets/",
  INSIGHT_INCIDENT_COMMENT: "/insight_incident_comment",
  INSIGHT_GRID_MASTER_DROPDOWNS: "/insight-grid-master-dropdowns",
  ASSET_DETAILS: "/asset_details/",
  ADD_UPDATE: "/add_update/",
  CHART_DATA: "/chart-data",
  HUB_TIMELINE: "/hub_timeline/",
  INSIGHT_COMPARISON_DATA: "/insight-comparison-data",

  //Insight & OEI
  ASSIGN_TASK: "/assign_task/",
  INCIDENT_CLOSE: "/incident_close",
  HISTORICAL_NEWS_FEEDS: "/historical_news_feeds/",

  //OEI
  OEI_GRID_DATA: "/oei_grid_data/",
  OEI_SLA_COMMENT: "/oei_sla_comment",
  OEI_TICKET_COMMENT: "/oei_ticket_comment",
  SLA_DROPDOWN_DATA: "/sla_dropdown_data",
  TICKET_DROPDOWN_DATA: "/ticket_dropdown_data",
  TICKET_DETAILS: "/ticket_details/",
  OEI_CHART_DATA: "/oei_chart_data/",
  SLA_TIMELINE: "/sla_timeline/",
  TICKET_TIMELINE: "/ticket_timeline/",

  //New OEI
  OEI_PAGE_DATA: "/oei_page_data/",

  //New OEI Drop Down Filters
  MASTER_FILTERS: "/master_filters/",
  PRINCIPLE_DASHBOARD: "/principle_dashboard/",
  INSIGHT_PAGE_DATA: "/insight_page_data/",

  //Login
  LOGIN: "/v1/login/",
  REFRESHTOKEN: "/token/refresh/",
  UPDATE_USER: "/update_user/",
  UPDATE_PASSWORD: "/update_password/",
  LOGIN1: "/v1/login1/",
  FORGET_PASSWORD: "/v1/forget_password/",
  RESET_PASSWORD: "/v1/reset_password/",
  SESSION_CHECK: "/v1/session_check/",

  //Dashboard
  PREFERENCE_FETCH: "/preference_fetch/",
  PREFERENCE_INPUT: "/preference_input/",
  DASHBOARD_GRID_DATA: "/dashboard_grid_data/",
  DAILY_METRICS: "/daily_metrics/",
  LOCATIONS: "/locations/",
  FUNNEL_DASHBOARD: "/funnel_dashboard/",
  DASHBOARD_DATA: "/dashboard_data/",
  CYBLEFEEDS: "/get_feeds/",

  //EntityOnBoarding
  ENTITY_CREATION: "/get_entity/",
  ENTITY_CREATION_UPDATE: "/create_update_entity/",
  ENTITY_ASSETS: "/get_entity_assets/",
  ENTITY_PREDEFINED_FUNCTION: "/fetch_predefined_function/",
  ENTITY_FUNCTION_PROCESS: "/get_entity_function_process/",
  ENTITY_FUNCTION_PROCESS_UPDATE: "/create_entity_function_process/",
  ENTITY_ASSETS_UPDATE: "/create_entity_assets/",
  FETCH_ENTITY_STATUS: "/fetch_entity_status/",
  UPDATE_ENTITY_STATUS: "/update_entity_status/",
  UPLOAD_ASSETS: "upload_assets/",
  UPLOADED_DATA_STATUS: "uploaded_data_status/",
  MASTER_FUNCTION: "/get_custom_function/",
  ADD_MASTER_FUNCTION: "/add_custom_function/",
  DELETE_MASTER_FUNCTION: "/delete_custom_function/",
  ADD_MASTER_PROCESS: "/add_custom_process/",
  DELETE_MASTER_PROCESS: "/delete_custom_process/",
  DELETE_ASSET: "/delete_asset/",
  GET_ASSET_TYPE_SUMMARY: "/get_asset_type_summary/",
  UPDATE_ASSET_TYPE_SUMMARY: "/update_asset_type_summary/",
  GET_ASSET_SUMMARY: "/get_asset_summary/",

  //Risk
  FETCH_RISK_JOURNEY: "/risk_screen_details/",
  UPDATE_RISK_JOURNEY: "/update_risk_configuration/",
  RISK_JOURNEY_STATUS: "/risk_onboarding_status/",
  UPDATE_INHERENT_RESIDUAL_RISK: "/update_inherent_residual_risk/",
  FETCH_RISK_DETAILS_DATA: "/risk_screen_details_data/",
  UPDATE_RISK_CONFIGUR_DATA: "/update_risk_configur_data/",

  // Risk Dashboard
  FETCH_RISK_DASHBAORD_ALL_DATA: "/get_all_data/",
  ASSET_RISK: "/asset_risk/",
  FUNCTION_RISK: "/function_risk/",
  PROCESS_RISK: "/process_risk/",
  GEO_RISK: "/geo_risk/",
  AVG_RISK: "/avg_risk_details/",

  //ContactUs
  CONTACT_US: "/contact_us/",

  //Darkmode
  THEME_PREFERENCE: "/theme_preference_update/",
  UPDATE_LANGUAGE: "/update_language/",
  TENANT_LANG: "/tenant_lang/",

  //PowerBi Token
  FETCH_TOKEN: "/fetch_token/",

  //Admin
  FETCH_TENANT_LIST: "/admin/tenant_list/",
  ADD_TENANT: "/admin/add_tenant/",
  USER_FETCH: "/admin/users/",
  USER_CREATE_UPDATE: "/user/create/",
  USER_ENABLE_DISABLE: "/user_enable_disable/",
  MFA_RESET: "/admin/mfa_reset/",
  TENANT_MATRIX: "/admin/tenant_matrix/",
  USER_MATRIX: "/admin/user_matrix/",
  FETCH_ROLES: "/admin/roles/",
  FETCH_PACKAGE: "/admin/packages/",
  FETCH_FAQ: "/faq/",
  TENANT_DATA_STATUS: "/admin/tenant_data_status/",

  //sitaAdmin
  FETCH_PREDEFINED_FUNCTIONS: "/fetch_predefined_data/",
  ADD_PREDEFINED_FUNCTIONS: "/add_predefined_data/",
  RESET_USER_PASSWORD: "/user_change_password/",
  ADMIN_RESET_PASSWORD: "/admin/reset_mail/",
  ADD_SOURCE_DETAILS: "/add_source/",
  DELETE_TENANT: "/delete_tenant/",
  VIEW_EMAIL_DATA: "/view_email_data/",
  CREATE_UPDATE_EMAIL_DATA: "/create_update_email_data/",
  DELETE_EMAIL_DATA: "/delete_email_data/",
  REACTIVATE_EMAIL_DATA: "/reactive_email_data/",

  //AdminAssetManagement
  ADD_PREDEFINED_FUNCTION: "/create_predefined_function/",
  ADD_PREDEFINED_PROCESS: "/create_predefined_process/",
  ADD_PREDEFINED_CATEGORY: "/create_category/",
  ADD_PREDEFINED_SUBCATEGORY: "/create_subcategory/",
  ADD_PREDEFINED_TYPE: "/create_type/",
  ADD_PREDEFINED_SUBTYPE: "/create_subtype/",
  ADD_PREDEFINED_TAGS: "/create_tag/",

  REMOVE_PREDEFINED_FUNCTION: "/delete_predefined_function/",
  REMOVE_PREDEFINED_PROCESS: "/delete_process/",
  REMOVE_PREDEFINED_CATEGORY: "/delete_category/",
  REMOVE_PREDEFINED_SUBCATEGORY: "/delete_subcategory/",
  REMOVE_PREDEFINED_TYPE: "/delete_type/",
  REMOVE_PREDEFINED_SUBTYPE: "/delete_subtype/",
  REMOVE_PREDEFINED_TAGS: "/delete_tag/",

  GET_TMF_DATA: "/get_tmf_data/",
  ADD_UPDATE_TMF_FACTOR: "/add_update_tmf_factor/",
  DELETE_TMF_FACTOR: "/delete_tmf_factor/",

  //Sita Admin Risk Question
  FETCH_RISK_PAGES: "/fetch_risk_pages/",
  FETCH_RISK_QUESTIONS: "/fetch_risk_questions/",
  ADD_UPDATE_RISK_QUESTION: "/add_update_risk_question/",
  DELETE_RISK_QUESTION: "/delete_risk_question/",

  //Sita Admin Use Cases And Rules
  GET_USECASE: "/get_usecase/",
  ADD_USECASE: "/add_usecase/",
  DELETE_USECASE: "/delete_usecase/",
  ADD_RULE: "/add_rule/",
  DELETE_RULE: "/delete_rule/",

  // Advisory details and pdf
  GET_ADVISORY_DETAILS: "/get_advisory/",
  GET_ADVISORY_PDF: "/advisory_pdf/",

  // AUTO SAVING DYNAMIC PAGES
  GET_LAYOUT_RESPONSE: "layout/",
  UPDATE_LAYOUT: "update_layout/",
  RESET_LAYOUT: "reset_layout/",

  // COST OF SECURITY CONTROLS
  GET_SECURITY_COST_CONTROL: "get_security_cost_control/",
  GET_MASTER_TECHNOLOGY: "get_master_technology/",
  UPDATE_COSTOFSECURITY_LAYOUT: "update_security_control_cost/",
  //RGU
  GET_RGU_DATA: "/get_rgu_data/",
  ADD_UPDATE_RGU_DATA: "/add_update_rgu_data/",
  DELETE_RGU_DATA: "/delete_rgu_data/",

  //ENGINES
  RUN_RGU_ENGINE: "/run_rgu_engine/",
  RUN_VMF_ENGINE: "/run_vmf_engine/",

  // ROSI
  GET_DROPDOWN_FILTERS: "/master_filters/",
  GET_ROSI_CHART: "/get_rosi/",
  GET_FUNCTION_CHART: "/get_function_chart/",
  GET_ASSET_CHART: "/get_asset_chart/",
  GET_TOTAL_INVESTMENT_CHART: "/get_total_investment_chart/",
  GET_INVESTMENT_OPTIMIZATION_CHART: "/get_Investment_optimization_chart/",
  GET_LOCATION_CHART: "/get_location_data/",
  GET_ROSI_STATUS: "/rosi_journey_status/",
  // Risk User Dashboard
  GET_FUNCTION_DATA: "/get_function_data/",
  GET_PROCESS_DATA: "/get_process_data/",
  GET_LOCATION_DATA: "/get_location_data/",
  GET_RISK_LOCATION_DATA: "/get_risk_location_data/",
  GET_RISK_AGGREGATION: "/get_risk_aggregation/",
  GET_HEAT_MAP_DATA: "/get_heat_map_data/",
  GET_RISK_AGGR_BAR_CHART_DATA: "/get_risk_aggr_bar_chart_data/",

  // Automatic Asset Discovery
  SECEON_SERVICES: "/seceon_services/",
  SECEON_GRID: "/seceon_services_grid/",
  SECEON_EVENT_DETAILS: "/seceon_event_details/",

  //Threat Intel
  CYBLE_SERVICES_LIST: "/cyble_services_list/",
  CYBLE_MODULE_SUBSCRIPTION: "/cyble_module_subscription/",
  ATTACK_SURFACE_PIECHART: "/attack_surface_piechart/",
  ATTACK_SURFACE_BARCHART: "/attack_surface_barchart/",
  DARK_WEB_PIECHART: "/dark_web_piechart/",
  DARK_WEB_BARCHART: "/dark_web_barchart/",
  CYBER_CRIME_PIECHART: "/cyber_crime_piechart/",
  CYBER_CRIME_BARCHART: "/cyber_crime_barchart/",
  BRAND_INTELLIGENCE_PIECHART: "/brand_intelligence_piechart/",
  BRAND_INTELLIGENCE_BARCHART: "/brand_intelligence_barchart/",
  CYBLE_SERVICE_GRID: "/cyble_service_grid/",
};
