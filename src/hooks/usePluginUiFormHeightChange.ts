import { useEffect, useRef } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * This hook is used to notify CloudQuery Cloud App
 * about the height change of the plugin UI form.
 *
 * @public
 */
export function usePluginUiFormHeightChange(pluginUiMessageHandler: PluginUiMessageHandler) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      pluginUiMessageHandler.sendMessage('height_changed', {
        height: containerRef.current?.offsetHeight ?? 0,
      });
    });

    observer.observe(containerRef.current ?? document.body);

    pluginUiMessageHandler.sendMessage('height_changed', {
      height: containerRef.current?.offsetHeight ?? 0,
    });

    return () => {
      observer.disconnect();
    };
  }, [pluginUiMessageHandler]);

  return containerRef;
}
