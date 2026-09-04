declare module 'react-payment-inputs' {
  export function usePaymentInputs(): {
    getCardNumberProps: (
      props?: Record<string, unknown>
    ) => Record<string, unknown>;
    getExpiryDateProps: (
      props?: Record<string, unknown>
    ) => Record<string, unknown>;
    getCVCProps: (props?: Record<string, unknown>) => Record<string, unknown>;
    meta: {
      cardType?: {
        displayName: string;
        type: string;
      };
      erroredInputs: Record<string, string | undefined>;
      error?: string;
      isTouched: boolean;
      focused?: string;
    };
    wrapperProps: Record<string, unknown>;
  };
}
