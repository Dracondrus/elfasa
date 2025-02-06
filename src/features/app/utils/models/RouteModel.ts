// import { ReactNode } from "react";

export interface RouteModel {
  element: React.FC;
  path?: string;
  isExact: boolean;
  index?: boolean;
  permissionName?: string;
}
