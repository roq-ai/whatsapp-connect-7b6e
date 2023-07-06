import * as yup from 'yup';

export const messageTemplateValidationSchema = yup.object().shape({
  template_name: yup.string().required(),
  template_content: yup.string().required(),
  organization_id: yup.string().nullable(),
});
