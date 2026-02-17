export * from './regular/index';

import CropIcon from "./regular/CropIcon";
import CropFilledIcon from "./regular/CropFilledIcon";

import SettingsIcon from "./regular/SettingsIcon";
import SettingsFilledIcon from "./regular/SettingsFilledIcon";

import HomeFeatureIcon from "./regular/HomeFeatureIcon";
import HomeFeatureFilledIcon from "./regular/HomeFeatureFilledIcon";

import CropPlannerFeatureIcon from "./regular/CropPlannerFeatureIcon";
import CropPlannerFeatureFilledIcon from "./regular/CropPlannerFeatureFilledIcon";


export function attemptFilledIconForIcon(icon: React.ComponentType<any>) {
  if (icon === CropIcon) return CropFilledIcon;
  if (icon === SettingsIcon) return SettingsFilledIcon;
  if (icon === HomeFeatureIcon) return HomeFeatureFilledIcon;
  if (icon === CropPlannerFeatureIcon) return CropPlannerFeatureFilledIcon;
  return null;
}
