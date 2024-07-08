import { useEffect } from 'react';

import {
  PluginUiMessageHandler,
  PluginUiMessagePayload,
} from '@cloudquery/plugin-config-ui-connector';

interface Success {
  values: PluginUiMessagePayload['validation_passed']['values'];
  errors?: never;
}

interface Failure {
  values?: never;
  errors: PluginUiMessagePayload['validation_failed']['errors'];
}

/**
 * This hook is used to handle form submit in the plugin UI.
 * It requires a function that should validate the form and return
 * either a success object with values or a failure object with errors.
 *
 * @public
 */
export function usePluginUiFormSubmit(
  onValidate: () => Promise<Success | Failure> | Success | Failure,
  pluginUiMessageHandler: PluginUiMessageHandler,
) {
  useEffect(() => {
    const handleValidate = async () => {
      const { errors, values } = await onValidate();

      if (errors) {
        pluginUiMessageHandler.sendMessage('validation_failed', {
          errors,
        });
      } else {
        pluginUiMessageHandler.sendMessage('validation_passed', {
          values,
        });
      }
    };

    return pluginUiMessageHandler.subscribeToMessage('validate', handleValidate);
  }, [onValidate, pluginUiMessageHandler]);
}
