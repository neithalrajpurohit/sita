import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // defaults to localStorage for web
import AdminReducer from "./store/Admin/AdminSlice";
import DashBoardReducer from "./store/Dashboard/DashboardSlice";
import ThemeReducer from "./store/Theme/ThemeSlice";
import AdminAssetReducer from "./store/Admin/AdminAssetSlice";
import EntityAssetReducer from "./store/Entity/EntityAssetSlice";
import EntityCreationReducer from "./store/Entity/EntityCreationSlice";
import EntityFunctionAndProcessReducer from "./store/Entity/EntityFunctionAndProcessSlice";
import EntityOnBoardingStatusReducer from "./store/Entity/EntityOnboardingStatusSlice";
import PerspectiveDetailsReducer from "./store/Perspective/PerspectiveDetailSlice";
import PerspectiveGridReducer from "./store/Perspective/PerspectiveGridSlice";
import SecurityPulseDetailsReducer from "./store/SecurityPulse/SecurityPulseDetailsSlice";
import SecurityPulseGridReducer from "./store/SecurityPulse/SecurityPulseGridSlice";
import RiskOnboardingReducer from "./store/Risk/RiskOnboardingSlice";
import RiskAdminQuestionsReducer from "./store/Risk/RiskAdminQuestionsSlice";
import AddEditPerspectiveReducer from "./store/AddEdits/AddEditPerspectiveSlice";
import AddEditSecurityPulseReducer from "./store/AddEdits/AddEditSecurityPulseSlice";
import UserAuthenticationReducer from "./store/UserAuthentication/UserAuthSlice";
import InsightDetailsReducer from "./store/Insights/InsightDetailSlice";
import InsightGridReducer from "./store/Insights/InsightGridSlice";
import InsightReducer from "./store/Insights/InsightSlice";
import OeiReducer from "./store/Oei/UpdatedOeiSlice";
import AdvisoryReducer from "./store/Advisory/AdvisorySlice";
import { configureStore } from "@reduxjs/toolkit";
import CostOfSecurityReducer from "./store/CostOfSecurityControls/CostOfSecuritySlice";
import RguPageReducer from "./store/Rgu/RguSlice";
import RosiDashboardReducer from "./store/Rosi/RosiDashboardSlice";
import RUDSliceReducer from "./store/RiskUserDashboard/RUDSlice";
import AssetSummaryValidationReducer from "./store/Entity/EntityAssetSummaryValidationSlice";
import AADReducer from "./store/AutomaticAssetDiscovery/AADSlice";
import ThreatIntelReducer from "./store/ThreatIntel/ThreatIntelSlice";

const reducers = {
  Admin: AdminReducer,
  Dashboard: DashBoardReducer,
  AdminAsset: AdminAssetReducer,
  Theme: ThemeReducer,
  EntityAsset: EntityAssetReducer,
  EntityCreation: EntityCreationReducer,
  EntityFunctionAndProcess: EntityFunctionAndProcessReducer,
  EntityStatus: EntityOnBoardingStatusReducer,
  PerspectiveDetails: PerspectiveDetailsReducer,
  PerspectiveGrid: PerspectiveGridReducer,
  SecurityPulseDetails: SecurityPulseDetailsReducer,
  SecurityPulseGrid: SecurityPulseGridReducer,
  RiskOnBoarding: RiskOnboardingReducer,
  RiskAdminQuestions: RiskAdminQuestionsReducer,
  AddEditPerspective: AddEditPerspectiveReducer,
  AddEditSecurityPulse: AddEditSecurityPulseReducer,
  UserAuthentication: UserAuthenticationReducer,
  InsightDetails: InsightDetailsReducer,
  InsightGrid: InsightGridReducer,
  Insight: InsightReducer,
  Oei: OeiReducer,
  Advisory: AdvisoryReducer,
  CostOfSecurity: CostOfSecurityReducer,
  Rgu: RguPageReducer,
  RosiDashboard: RosiDashboardReducer,
  RUD: RUDSliceReducer,
  EntityAssetSummaryValidation: AssetSummaryValidationReducer,
  AutomaticAssetDiscovery: AADReducer,
  ThreatIntel: ThreatIntelReducer,
};

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName("base")[0]?.getAttribute("href");
export const history = createBrowserHistory({ basename: baseUrl ?? "" });

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: ["router"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;

export default function configurePersistedStore(initialState: RootState) {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(routerMiddleware(history)),
    devTools: window.location.hostname === "localhost",
  });
  const persistor = persistStore(store);

  return { store, persistor };
}
