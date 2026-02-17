import { Callout } from '@/components/Callout';
import { QuickLink, QuickLinks } from '@/components/QuickLinks';
import {
  ComponentPreview,
  DemoButton,
  ButtonGroup,
  DemoBadge,
  DemoInput,
  DemoLabel,
  DemoCard,
  DemoCardHeader,
  DemoCardTitle,
  DemoCardDescription,
  DemoCardContent,
  DemoCardFooter,
  FormGroup,
} from '@/components/ComponentPreview';

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>

        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  preview: {
    render: ComponentPreview,
  },
  'demo-button': {
    selfClosing: true,
    render: DemoButton,
    attributes: {
      variant: { type: String },
      mode: { type: String },
      size: { type: String },
      iconOnly: { type: Boolean },
      disabled: { type: Boolean },
      icon: { type: String },
      iconPosition: { type: String },
    },
  },
  'button-group': {
    render: ButtonGroup,
  },
  'demo-badge': {
    render: DemoBadge,
    attributes: {
      variant: { type: String },
    },
  },
  'demo-input': {
    selfClosing: true,
    render: DemoInput,
    attributes: {
      type: { type: String },
      placeholder: { type: String },
      disabled: { type: Boolean },
      value: { type: String },
    },
  },
  'demo-label': {
    render: DemoLabel,
    attributes: {
      disabled: { type: Boolean },
    },
  },
  'demo-card': {
    render: DemoCard,
  },
  'demo-card-header': {
    render: DemoCardHeader,
  },
  'demo-card-title': {
    render: DemoCardTitle,
  },
  'demo-card-description': {
    render: DemoCardDescription,
  },
  'demo-card-content': {
    render: DemoCardContent,
  },
  'demo-card-footer': {
    render: DemoCardFooter,
  },
  'form-group': {
    render: FormGroup,
  },
};

export default tags;
