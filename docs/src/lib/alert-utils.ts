// =============================================================================
// Types
// =============================================================================

import { ReactNode } from 'react';

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
  | 'infoDarkFilled';

export class AlertModel {
  title: string = 'Confirmation';
  message: ReactNode;
  type: AlertStatus | undefined;
  id?: string;
  key: string;
  state: 'pendingShown' | 'pendingHide' | 'shown' | 'hidden' = 'pendingShown';
  timeout?: number; // If not set, alert will not be removed automatically

  // Design system integration properties
  style?: AlertStyle;
  size?: AlertSize;
  actions?: Array<{ label: string; onClick: () => void }>;

  constructor(partial?: Partial<AlertModel>) {
    Object.assign(this, partial);
    this.key = Math.random().toString(36).substring(7);
    this.id = partial?.id ?? Math.random().toString(36).substring(7);
    if (this.type === 'error' && partial?.title === undefined) {
      this.title = 'Error';
    }
  }
}
