export interface TireResponse {
  content: Tire[];
  pageSize: number;
  pageNumber: number;
  numberOfElements: number;
  empty: boolean;
  lastPage: boolean;
}

export interface TireRequestParams {
  branchOfficesId?: number[];
  pageSize: number;
  pageNumber: number;

  // opcionais
  tireStatuses?: TireStatuses;
  textQuery?: string;
  serialNumberTextQuery?: string;
  makeIds?: number[];
  modelIds?: number[];
  treadMakeId?: number;
  treadModelId?: number;
  currentLifeCycles?: number[];
  dimensionsIds?: number[];
}

export type TireFilterState = Omit<
  TireRequestParams,
  "pageSize" | "pageNumber"
>;

export interface Tire {
  id: number;
  serialNumber: string;
  additionalId: string;
  companyGroupId: number;
  companyGroupName: string;
  branchOfficeId: number;
  branchOfficeName: string;
  currentLifeCycle: number;
  timesRetreaded: number;
  maxRetreadsExpected: number;
  recommendedPressure: number;
  currentPressure: number;
  middleInnerTreadDepth: number;
  outerTreadDepth: number;
  middleOuterTreadDepth: number;
  innerTreadDepth: number;
  dot: string;
  purchaseCost: number;
  newTire: boolean;
  status: string;
  createdAt: string; // ou Date, se for convertido
  tireSize: TireSize;
  make: Make;
  model: TireModel;
  currentRetread: CurrentRetread;
  installed: InstalledInfo;
  disposal: DisposalInfo;
  analysis: AnalysisInfo;
  registrationImages: RegistrationImage[];
}

export interface TireSize {
  id: number;
  height: number;
  width: number;
  rim: number;
}

export interface Make {
  id: number;
  name: string;
}

export interface TireModel {
  id: number;
  name: string;
  groovesQuantity: number;
  treadDepth: number;
  additionalId?: string;
}

export interface CurrentRetread {
  make: Make;
  model: TireModel;
  retreadCost: number;
}

export interface InstalledInfo {
  vehicleId: number;
  licensePlate: string;
  fleetId: string;
  installedPosition: number;
  installedPositionName: string;
}

export interface DisposalInfo {
  disposalReasonId: number;
  disposalReasonDescription: string;
  disposalImagesUrl: string[];
}

export interface AnalysisInfo {
  recapperId: number;
  recapperName: string;
  recapperPickUpId: string;
  reason: string;
}

export interface RegistrationImage {
  id: number;
  url: string;
}

export type TireStatuses = "INVENTORY" | "ANALYSIS" | "INSTALLED" | "DISPOSAL";
