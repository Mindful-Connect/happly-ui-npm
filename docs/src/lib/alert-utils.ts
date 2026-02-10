// =============================================================================
// Types
// =============================================================================

export type AlertStatus = 'error' | 'warning' | 'success' | 'info' | 'feature';
export type AlertStyle = 'filled' | 'light' | 'lighter' | 'outline';
export type AlertSize = 'xs' | 'sm' | 'md';

export type AlertVariant =
  | 'errorFilled'
  | 'errorLight'
  | 'errorLighter'
  | 'errorOutline'
  | 'warningFilled'
  | 'warningLight'
  | 'warningLighter'
  | 'warningOutline'
  | 'successFilled'
  | 'successLight'
  | 'successLighter'
  | 'successOutline'
  | 'infoFilled'
  | 'infoLight'
  | 'infoLighter'
  | 'infoOutline'
  | 'featureFilled'
  | 'featureLight'
  | 'featureLighter'
  | 'featureOutline'
  | 'infoPrimaryFilled'
  | 'infoDarkFilled';
  