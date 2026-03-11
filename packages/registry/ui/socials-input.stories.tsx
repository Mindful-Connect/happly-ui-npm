'use client';

import { useState } from 'react';
import * as FormField from './form-field';
import * as Hint from './hint';
import * as Label from './label';
import SocialsInput from './socials-input';
import type { SocialKey } from './socials-input';

export default { title: 'UI/Socials Input', component: SocialsInput };

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
  render: () => {
    function SocialsInputFormField() {
      const [values, setValues] = useState<Partial<Record<SocialKey, string>>>({});
      return (
        <div className='w-[480px]'>
          <FormField.Root>
            <Label.Root>
              Add your social media
              <Label.Asterisk />
              <Label.Sub>(Optional)</Label.Sub>
              <Label.Info>
                Add your social media links so others can find you.
              </Label.Info>
            </Label.Root>
            <SocialsInput
              name='socials'
              formValue={values}
              setFormValue={setValues}
            />
          </FormField.Root>
        </div>
      );
    }
    return <SocialsInputFormField />;
  },
};

export const ErrorState = {
  render: () => {
    function SocialsInputError() {
      const [values, setValues] = useState<Partial<Record<SocialKey, string>>>({});
      return (
        <div className='w-[480px]'>
          <FormField.Root>
            <Label.Root>
              Add your social media
              <Label.Asterisk />
            </Label.Root>
            <SocialsInput
              name='socials'
              hasError
              formValue={values}
              setFormValue={setValues}
            />
            <Hint.Root hasError>
              Please add at least one social media link.
            </Hint.Root>
          </FormField.Root>
        </div>
      );
    }
    return <SocialsInputError />;
  },
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
