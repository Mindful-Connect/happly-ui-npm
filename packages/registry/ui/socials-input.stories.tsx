'use client';

import { useState } from 'react';
import SocialsInput from './socials-input';

export default { title: 'Form/Composed Inputs/Socials Input', component: SocialsInput };

export const Default = {
  render: () => {
    function SocialsInputDemo() {
      const [values, setValues] = useState<Record<string, string>>({
        linkedin: 'https://linkedin.com/in/happly',
      });
      return (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <SocialsInput
            name="socials"
            formValue={values}
            setFormValue={setValues}
            t={(key: string) => {
              const translations: Record<string, string> = {
                '_domain.addSocialMedia': 'Add social media',
                errorSocialUrl: 'Please enter a valid URL',
                errorCalendarUrl: 'Please enter a valid calendar URL',
                errorZoomUrl: 'Please enter a valid Zoom URL',
              };
              return translations[key] || key;
            }}
          />
        </div>
      );
    }
    return <SocialsInputDemo />;
  },
};
