import humanizeString from 'humanize-string';
import * as Yup from 'yup';

/**
 * This function resets the default error messages of the yup validation schema.
 *
 * @public
 */
export function resetYupDefaultErrorMessages(yup: typeof Yup) {
  yup.setLocale({
    mixed: {
      notType: '',
      required: '',
    },
    number: {
      integer: '',
      max: '',
      min: '',
    },
    string: {
      email: '',
      max: '',
      min: '',
    },
  });
}

/**
 * This function returns a resolver function that can be used with react-hook-form.
 * It is using yup validation schema to validate the data and returns values when the data is valid.
 * If the data is invalid, it returns the errors with parsed messages based on the yup validation schema.
 *
 * @public
 */
export function getYupValidationResolver<
  FieldValues extends Yup.AnyObject,
  Schema extends Yup.ObjectSchema<FieldValues>,
>(validationSchema: Schema) {
  resetYupDefaultErrorMessages(yup);

  return async (data: any) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      });

      return {
        errors: {},
        values,
      };
    } catch (error: unknown) {
      const err = error as Yup.ValidationError;

      return {
        errors: Object.fromEntries(
          err.inner.map((currentError) => {
            return [
              currentError.path,
              {
                message: getFieldErrorMessage(currentError),
                type: currentError.type ?? 'validation',
              },
            ];
          }),
        ),
        values: {},
      };
    }
  };
}

function capitalizeText(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFieldErrorMessage(error: Yup.ValidationError): string {
  let fieldLabel =
    (error.params?.label as string) ||
    humanizeString(error.path?.split('.').pop() || '') ||
    'value';
  fieldLabel = capitalizeText(fieldLabel);
  const errorMessage = capitalizeText(error.message || '');

  if (error.type === 'required' || error.type === 'optionality') {
    return errorMessage || `${fieldLabel} cannot be empty`;
  }

  if (error.type === 'email') {
    return `${fieldLabel} must be a valid email address`;
  }

  if (error.type === 'typeError' && error.params?.type === 'number') {
    return errorMessage || `${fieldLabel} must be a valid number`;
  }

  if (error.type === 'integer') {
    return errorMessage || `${fieldLabel} must be a valid integer`;
  }

  if (!error.params) {
    return errorMessage;
  }

  if (
    error.type === 'min' &&
    typeof error.params.value === 'number' &&
    typeof error.params.min === 'number'
  ) {
    return errorMessage || `${fieldLabel} must be more than or equal to ${error.params.min}`;
  }

  if (
    error.type === 'max' &&
    typeof error.params.value === 'number' &&
    typeof error.params.max === 'number'
  ) {
    return errorMessage || `${fieldLabel} must be less than or equal to ${error.params.max}`;
  }

  if (
    error.type === 'max' &&
    typeof error.params.value === 'string' &&
    typeof error.params.max === 'number'
  ) {
    return errorMessage || `${fieldLabel} must contain at most ${error.params.max} characters`;
  }

  if (
    error.type === 'min' &&
    typeof error.params.value === 'string' &&
    typeof error.params.min === 'number'
  ) {
    return errorMessage || `${fieldLabel} must contain at least ${error.params.min} characters`;
  }

  return errorMessage;
}

export type YupInferType<T extends Yup.ISchema<any, any>> = Yup.InferType<T>;

// eslint-disable-next-line unicorn/prefer-export-from
export const yup = Yup;
