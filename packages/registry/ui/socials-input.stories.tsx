'use client';

import { useState } from 'react';
import * as FormField from './form-field';
import SocialsInput from './socials-input';
import type { SocialKey } from './socials-input';

export default { title: 'Form/Composed Inputs/Socials Input', component: SocialsInput };

export const Default = {
  render: () => {
    function SocialsInputDemo() {
      const [values, setValues] = useState<Partial<Record<SocialKey, string>>>({});
      return (
        <div className='w-[480px]'>
          <SocialsInput
            name='socials'
            formValue={values}
            setFormValue={setValues}
          />
        </div>
      );
    }
    return <SocialsInputDemo />;
  },
};

export const WithExistingValues = {
  render: () => {
    function SocialsInputPreFilled() {
      const [values, setValues] = useState<Partial<Record<SocialKey, string>>>({
        instagram: 'https://instagram.com/happly_app',
        linkedin: 'https://linkedin.com/in/ahmaad-ansari',
        facebook: 'https://facebook.com/ahmaad.ansari',
      });
      return (
        <div className='w-[480px]'>
          <SocialsInput
            name='socials'
            formValue={values}
            setFormValue={setValues}
          />
        </div>
      );
    }
    return <SocialsInputPreFilled />;
  },
};

export const AllSocials = {
  render: () => {
    function SocialsInputAll() {
      const [values, setValues] = useState<Partial<Record<SocialKey, string>>>({});
      return (
        <div className='w-[480px]'>
          <SocialsInput
            name='socials'
            availableSocials={null}
            formValue={values}
            setFormValue={setValues}
          />
        </div>
      );
    }
    return <SocialsInputAll />;
  },
};

export const CustomSocials = {
  render: () => {
    function SocialsInputCustom() {
      const [values, setValues] = useState<Partial<Record<SocialKey, string>>>({});
      const socials: SocialKey[] = ['instagram', 'x-twitter', 'tiktok'];
      return (
        <div className='w-[480px]'>
          <SocialsInput
            name='socials'
            availableSocials={socials}
            formValue={values}
            setFormValue={setValues}
          />
        </div>
      );
    }
    return <SocialsInputCustom />;
  },
};

export const ReadOnly = {
  render: () => {
    return (
      <div className='w-[480px]'>
        <SocialsInput
          name='socials'
          readOnly
          formValue={{
            instagram: 'https://instagram.com/happly_app',
            linkedin: 'https://linkedin.com/in/ahmaad-ansari',
          }}
          setFormValue={() => {}}
        />
      </div>
    );
  },
};

export const WithFormField = {
  render: () => (
    <div className='w-[400px]'>
      <FormField.Root
        label='Social Media'
        labelSub='Optional'
        labelSubParens
        labelInfo='Add your social media profiles.'
        hint='Add at least one social media profile.'
      >
        <SocialsInput name='socials' />
      </FormField.Root>
    </div>
  ),
};

export const ErrorState = {
  render: () => (
    <div className='w-[400px]'>
      <FormField.Root
        label='Social Media'
        required
        error='Please add at least one social media profile.'
      >
        <SocialsInput name='socials-error' />
      </FormField.Root>
    </div>
  ),
};

export const CustomLabels = {
  render: () => {
    function SocialsInputLabels() {
      const [values, setValues] = useState<Partial<Record<SocialKey, string>>>({});
      return (
        <div className='w-[480px]'>
          <SocialsInput
            name='socials'
            formValue={values}
            setFormValue={setValues}
            labels={{
              placeholder: 'Ajouter un réseau social...',
              errorUrl: 'Veuillez saisir une URL valide',
            }}
          />
        </div>
      );
    }
    return <SocialsInputLabels />;
  },
};
