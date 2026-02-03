'use client'

import { type ReactNode, type CSSProperties, useState } from 'react'

// =============================================================================
// COMPONENT PREVIEW WRAPPER
// =============================================================================

interface ComponentPreviewProps {
  children: ReactNode
}

export function ComponentPreview({ children }: ComponentPreviewProps) {
  return (
    <div className="not-prose my-6 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex min-h-[140px] flex-wrap items-center justify-center gap-4 p-8">
        {children}
      </div>
    </div>
  )
}

// =============================================================================
// DEMO BUTTON COMPONENT
// =============================================================================

type Variant = 'primary' | 'neutral' | 'error'
type Mode = 'filled' | 'stroke' | 'lighter' | 'ghost'
type Size = 'medium' | 'small' | 'xsmall' | 'xxsmall'

interface DemoButtonProps {
  variant?: Variant
  mode?: Mode
  size?: Size
  iconOnly?: boolean
  disabled?: boolean
  children?: ReactNode
  icon?: 'plus' | 'mail' | 'trash' | 'chevron-right' | 'loader'
  iconPosition?: 'left' | 'right'
}

const colors = {
  primary: {
    base: '#7D52F4',
    darker: '#6B45D9',
    alpha10: 'rgba(125, 82, 244, 0.1)',
    alpha30: 'rgba(125, 82, 244, 0.3)',
  },
  neutral: {
    900: '#111827',
    600: '#4b5563',
    200: '#e5e7eb',
    100: '#f3f4f6',
  },
  error: {
    base: '#ef4444',
    darker: '#dc2626',
    alpha10: 'rgba(239, 68, 68, 0.1)',
  },
}

const baseStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: 1,
  letterSpacing: '-0.01em',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-out',
  outline: 'none',
  fontFamily: 'inherit',
  gap: '8px',
  verticalAlign: 'middle',
}

const sizeStyles: Record<Size, CSSProperties> = {
  medium: { height: '40px', borderRadius: '12px', padding: '0 16px' },
  small: { height: '36px', borderRadius: '10px', padding: '0 14px' },
  xsmall: { height: '32px', borderRadius: '8px', padding: '0 12px' },
  xxsmall: {
    height: '28px',
    borderRadius: '8px',
    padding: '0 10px',
    fontSize: '13px',
  },
}

const iconOnlySizeStyles: Record<Size, CSSProperties> = {
  medium: { height: '40px', width: '40px', borderRadius: '12px', padding: 0 },
  small: { height: '36px', width: '36px', borderRadius: '10px', padding: 0 },
  xsmall: { height: '32px', width: '32px', borderRadius: '8px', padding: 0 },
  xxsmall: { height: '28px', width: '28px', borderRadius: '8px', padding: 0 },
}

const getVariantStyles = (
  variant: Variant,
  mode: Mode,
  isHovered: boolean,
): CSSProperties => {
  const styles: Record<
    Variant,
    Record<Mode, { base: CSSProperties; hover: CSSProperties }>
  > = {
    primary: {
      filled: {
        base: {
          background: `linear-gradient(135deg, ${colors.primary.base}, ${colors.primary.darker})`,
          color: 'white',
          boxShadow: `0 1px 2px rgba(0,0,0,0.1), 0 2px 8px ${colors.primary.alpha30}`,
        },
        hover: {
          background: colors.primary.darker,
          boxShadow: `0 1px 2px rgba(0,0,0,0.1), 0 4px 12px ${colors.primary.alpha30}`,
        },
      },
      stroke: {
        base: {
          background: 'white',
          color: colors.primary.base,
          boxShadow: `inset 0 0 0 1.5px ${colors.primary.base}`,
        },
        hover: {
          background: colors.primary.alpha10,
          boxShadow: 'none',
        },
      },
      lighter: {
        base: {
          background: colors.primary.alpha10,
          color: colors.primary.base,
        },
        hover: {
          background: 'white',
          boxShadow: `inset 0 0 0 1.5px ${colors.primary.base}`,
        },
      },
      ghost: {
        base: {
          background: 'transparent',
          color: colors.primary.base,
        },
        hover: {
          background: colors.primary.alpha10,
        },
      },
    },
    neutral: {
      filled: {
        base: {
          background: colors.neutral[900],
          color: 'white',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        },
        hover: {
          background: '#374151',
        },
      },
      stroke: {
        base: {
          background: 'white',
          color: colors.neutral[600],
          boxShadow: `inset 0 0 0 1px ${colors.neutral[200]}, 0 1px 2px rgba(0,0,0,0.05)`,
        },
        hover: {
          background: colors.neutral[100],
          color: colors.neutral[900],
          boxShadow: 'none',
        },
      },
      lighter: {
        base: {
          background: colors.neutral[100],
          color: colors.neutral[600],
        },
        hover: {
          background: 'white',
          color: colors.neutral[900],
          boxShadow: `inset 0 0 0 1px ${colors.neutral[200]}, 0 1px 2px rgba(0,0,0,0.05)`,
        },
      },
      ghost: {
        base: {
          background: 'transparent',
          color: colors.neutral[600],
        },
        hover: {
          background: colors.neutral[100],
          color: colors.neutral[900],
        },
      },
    },
    error: {
      filled: {
        base: {
          background: `linear-gradient(135deg, ${colors.error.base}, ${colors.error.darker})`,
          color: 'white',
          boxShadow:
            '0 1px 2px rgba(0,0,0,0.1), 0 2px 8px rgba(239, 68, 68, 0.3)',
        },
        hover: {
          background: colors.error.darker,
          boxShadow:
            '0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(239, 68, 68, 0.4)',
        },
      },
      stroke: {
        base: {
          background: 'white',
          color: colors.error.base,
          boxShadow: `inset 0 0 0 1.5px ${colors.error.base}`,
        },
        hover: {
          background: colors.error.alpha10,
          boxShadow: 'none',
        },
      },
      lighter: {
        base: {
          background: colors.error.alpha10,
          color: colors.error.base,
        },
        hover: {
          background: 'white',
          boxShadow: `inset 0 0 0 1.5px ${colors.error.base}`,
        },
      },
      ghost: {
        base: {
          background: 'transparent',
          color: colors.error.base,
        },
        hover: {
          background: colors.error.alpha10,
        },
      },
    },
  }
  const variantStyles = styles[variant][mode]
  return isHovered
    ? { ...variantStyles.base, ...variantStyles.hover }
    : variantStyles.base
}

const getDisabledStyles = (): CSSProperties => ({
  background: colors.neutral[100],
  color: '#9ca3af',
  cursor: 'not-allowed',
  boxShadow: 'none',
})

// Icons
function PlusIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

function LoaderIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle
        style={{ opacity: 0.25 }}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        style={{ opacity: 0.75 }}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

const iconComponents = {
  plus: PlusIcon,
  mail: MailIcon,
  trash: TrashIcon,
  'chevron-right': ChevronRightIcon,
  loader: LoaderIcon,
}

export function DemoButton({
  variant = 'primary',
  mode = 'filled',
  size = 'medium',
  iconOnly = false,
  disabled = false,
  children,
  icon,
  iconPosition = 'left',
}: DemoButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const combinedStyles: CSSProperties = {
    ...baseStyles,
    ...(iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size]),
    ...(disabled
      ? getDisabledStyles()
      : getVariantStyles(variant, mode, isHovered)),
  }

  const IconComponent = icon ? iconComponents[icon] : null

  return (
    <button
      style={combinedStyles}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {IconComponent && iconPosition === 'left' && <IconComponent />}
      {children}
      {IconComponent && iconPosition === 'right' && <IconComponent />}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  )
}

// =============================================================================
// BUTTON GROUP (for displaying multiple buttons in a row)
// =============================================================================

interface ButtonGroupProps {
  children: ReactNode
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {children}
    </div>
  )
}

// =============================================================================
// DEMO BADGE COMPONENT
// =============================================================================

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

interface DemoBadgeProps {
  variant?: BadgeVariant
  children?: ReactNode
}

const badgeBaseStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '9999px',
  padding: '2px 10px',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '1.5',
  transition: 'colors 0.2s',
}

const getBadgeVariantStyles = (variant: BadgeVariant): CSSProperties => {
  const styles: Record<BadgeVariant, CSSProperties> = {
    default: {
      background: colors.primary.base,
      color: 'white',
      border: '1px solid transparent',
    },
    secondary: {
      background: colors.neutral[100],
      color: colors.neutral[900],
      border: '1px solid transparent',
    },
    destructive: {
      background: colors.error.base,
      color: 'white',
      border: '1px solid transparent',
    },
    outline: {
      background: 'transparent',
      color: colors.neutral[900],
      border: `1px solid ${colors.neutral[200]}`,
    },
  }
  return styles[variant]
}

export function DemoBadge({ variant = 'default', children }: DemoBadgeProps) {
  return (
    <span style={{ ...badgeBaseStyles, ...getBadgeVariantStyles(variant) }}>
      {children}
    </span>
  )
}

// =============================================================================
// DEMO INPUT COMPONENT
// =============================================================================

interface DemoInputProps {
  type?: string
  placeholder?: string
  disabled?: boolean
  value?: string
}

export function DemoInput({
  type = 'text',
  placeholder,
  disabled = false,
  value,
}: DemoInputProps) {
  const inputStyles: CSSProperties = {
    display: 'flex',
    height: '40px',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
    border: `1px solid ${colors.neutral[200]}`,
    background: 'white',
    padding: '0 12px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={value}
      style={inputStyles}
      onFocus={(e) => {
        e.target.style.borderColor = colors.primary.base
        e.target.style.boxShadow = `0 0 0 3px ${colors.primary.alpha10}`
      }}
      onBlur={(e) => {
        e.target.style.borderColor = colors.neutral[200]
        e.target.style.boxShadow = 'none'
      }}
    />
  )
}

// =============================================================================
// DEMO LABEL COMPONENT
// =============================================================================

interface DemoLabelProps {
  children?: ReactNode
  disabled?: boolean
}

export function DemoLabel({ children, disabled = false }: DemoLabelProps) {
  const labelStyles: CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    color: colors.neutral[900],
    opacity: disabled ? 0.7 : 1,
    cursor: disabled ? 'not-allowed' : 'default',
  }

  return <label style={labelStyles}>{children}</label>
}

// =============================================================================
// DEMO CARD COMPONENT
// =============================================================================

interface DemoCardProps {
  children?: ReactNode
}

export function DemoCard({ children }: DemoCardProps) {
  const cardStyles: CSSProperties = {
    borderRadius: '12px',
    border: `1px solid ${colors.neutral[200]}`,
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '350px',
  }

  return <div style={cardStyles}>{children}</div>
}

interface DemoCardHeaderProps {
  children?: ReactNode
}

export function DemoCardHeader({ children }: DemoCardHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '24px 24px 0',
      }}
    >
      {children}
    </div>
  )
}

interface DemoCardTitleProps {
  children?: ReactNode
}

export function DemoCardTitle({ children }: DemoCardTitleProps) {
  return (
    <div
      style={{
        fontSize: '18px',
        fontWeight: 600,
        color: colors.neutral[900],
        lineHeight: 1.3,
      }}
    >
      {children}
    </div>
  )
}

interface DemoCardDescriptionProps {
  children?: ReactNode
}

export function DemoCardDescription({ children }: DemoCardDescriptionProps) {
  return (
    <div
      style={{ fontSize: '14px', color: colors.neutral[600], lineHeight: 1.5 }}
    >
      {children}
    </div>
  )
}

interface DemoCardContentProps {
  children?: ReactNode
}

export function DemoCardContent({ children }: DemoCardContentProps) {
  return <div style={{ padding: '24px' }}>{children}</div>
}

interface DemoCardFooterProps {
  children?: ReactNode
}

export function DemoCardFooter({ children }: DemoCardFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 24px 24px',
      }}
    >
      {children}
    </div>
  )
}

// =============================================================================
// FORM GROUP (for label + input combinations)
// =============================================================================

interface FormGroupProps {
  children?: ReactNode
}

export function FormGroup({ children }: FormGroupProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        maxWidth: '300px',
      }}
    >
      {children}
    </div>
  )
}

// =============================================================================
// DEMO DIVIDER COMPONENT
// =============================================================================

type DividerVariant =
  | 'line'
  | 'line-spacing'
  | 'line-text'
  | 'text'
  | 'solid-text'
  | 'content'

interface DemoDividerProps {
  variant?: DividerVariant
  children?: ReactNode
}

const dividerLineColor = '#e5e7eb'
const dividerTextColor = '#9ca3af'
const dividerBgWeak = '#f9fafb'

export function DemoDivider({ variant = 'line', children }: DemoDividerProps) {
  const baseStyles: CSSProperties = {
    position: 'relative',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  }

  const lineBeforeAfter: CSSProperties = {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: dividerLineColor,
  }

  switch (variant) {
    case 'line':
      return (
        <div style={{ ...baseStyles, height: 0 }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '100%',
              height: '1px',
              backgroundColor: dividerLineColor,
            }}
          />
        </div>
      )

    case 'line-spacing':
      return (
        <div style={{ ...baseStyles, height: '4px' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '100%',
              height: '1px',
              backgroundColor: dividerLineColor,
            }}
          />
        </div>
      )

    case 'line-text':
      return (
        <div
          style={{
            ...baseStyles,
            gap: '10px',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: dividerTextColor,
          }}
        >
          <div style={lineBeforeAfter} />
          {children || 'OR'}
          <div style={lineBeforeAfter} />
        </div>
      )

    case 'text':
      return (
        <div
          style={{
            ...baseStyles,
            justifyContent: 'center',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: dividerTextColor,
          }}
        >
          {children || 'Section'}
        </div>
      )

    case 'solid-text':
      return (
        <div
          style={{
            ...baseStyles,
            justifyContent: 'center',
            backgroundColor: dividerBgWeak,
            padding: '6px 20px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: dividerTextColor,
          }}
        >
          {children || 'OR'}
        </div>
      )

    case 'content':
      const contentChild =
        children === 'icon-button' ? (
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              padding: 0,
              color: colors.neutral[600],
              background: 'white',
              border: `1px solid ${colors.neutral[200]}`,
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        ) : (
          children || <span style={{ color: dividerTextColor }}>•</span>
        )

      return (
        <div style={{ ...baseStyles, gap: '10px' }}>
          <div style={lineBeforeAfter} />
          {contentChild}
          <div style={lineBeforeAfter} />
        </div>
      )

    default:
      return null
  }
}
