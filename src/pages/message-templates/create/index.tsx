import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMessageTemplate } from 'apiSdk/message-templates';
import { Error } from 'components/error';
import { messageTemplateValidationSchema } from 'validationSchema/message-templates';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { MessageTemplateInterface } from 'interfaces/message-template';

function MessageTemplateCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MessageTemplateInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMessageTemplate(values);
      resetForm();
      router.push('/message-templates');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MessageTemplateInterface>({
    initialValues: {
      template_name: '',
      template_content: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: messageTemplateValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Message Template
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="template_name" mb="4" isInvalid={!!formik.errors?.template_name}>
            <FormLabel>Template Name</FormLabel>
            <Input
              type="text"
              name="template_name"
              value={formik.values?.template_name}
              onChange={formik.handleChange}
            />
            {formik.errors.template_name && <FormErrorMessage>{formik.errors?.template_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="template_content" mb="4" isInvalid={!!formik.errors?.template_content}>
            <FormLabel>Template Content</FormLabel>
            <Input
              type="text"
              name="template_content"
              value={formik.values?.template_content}
              onChange={formik.handleChange}
            />
            {formik.errors.template_content && <FormErrorMessage>{formik.errors?.template_content}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'message_template',
    operation: AccessOperationEnum.CREATE,
  }),
)(MessageTemplateCreatePage);
