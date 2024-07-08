import { useEffect, useState } from 'react';

import { FormMessagePayload, PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * This hook is used to initialize the plugin UI form.
 * It subscribes to the `init` message to get initial values
 * and sends a `ready` message to the CloudQuery Cloud App
 * with information whether to hide the submit button from the beginning.
 *
 * @public
 */
export function usePluginUiFormInit(
  pluginUiMessageHandler: PluginUiMessageHandler,
  hideSubmitButton: boolean,
) {
  const [initialized, setInitialized] = useState(false);
  const [initialValues, setInitialValues] = useState<
    FormMessagePayload['init']['initialValues'] | undefined
  >();

  useEffect(() => {
    return pluginUiMessageHandler.subscribeToMessage('init', ({ initialValues }) => {
      if (initialValues?.spec?.connection_string) {
        setInitialValues(initialValues);
      }

      setInitialized(true);

      pluginUiMessageHandler.sendMessage('ready', {
        hideSubmitButton,
      });
    });
  }, []);

  return { initialized, initialValues };
}
