import { act } from 'react';

import {
  MessageHandler,
  FormMessagePayload,
  FormMessageType,
  PluginUiMessagePayload,
  PluginUiMessageType,
  formMessageTypes,
  pluginUiMessageTypes,
  getPluginUiMessageHandler,
} from '@cloudquery/plugin-config-ui-connector';
import { renderHook } from '@testing-library/react';

import { usePluginUiFormInit } from '../usePluginUiFormInit';

describe('usePluginUiFormInit', () => {
  test('no initial values', async () => {
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() =>
      usePluginUiFormInit(pluginUiMessageHandler, false),
    );
    expect(result.current).toEqual({ initialized: false, initialValues: undefined });

    await act(async () => {
      const formMessageHandler = new MessageHandler<
        FormMessageType,
        FormMessagePayload,
        PluginUiMessageType,
        PluginUiMessagePayload
      >(formMessageTypes, pluginUiMessageTypes, window.parent);
      formMessageHandler.sendMessage('init', { initialValues: undefined });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();
    expect(result.current).toEqual({ initialized: true, initialValues: undefined });
  });

  test('initial values', async () => {
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() =>
      usePluginUiFormInit(pluginUiMessageHandler, false),
    );
    expect(result.current).toEqual({ initialized: false, initialValues: undefined });

    await act(async () => {
      const formMessageHandler = new MessageHandler<
        FormMessageType,
        FormMessagePayload,
        PluginUiMessageType,
        PluginUiMessagePayload
      >(formMessageTypes, pluginUiMessageTypes, window.parent);
      formMessageHandler.sendMessage('init', {
        initialValues: {
          tables: ['*'],
          migrateMode: undefined,
          envs: [],
          spec: {
            connection_string: 'test',
          },
          writeMode: 'append',
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();
    expect(result.current).toEqual({
      initialized: true,
      initialValues: {
        tables: ['*'],
        migrateMode: undefined,
        envs: [],
        spec: {
          connection_string: 'test',
        },
        writeMode: 'append',
      },
    });
  });
});
