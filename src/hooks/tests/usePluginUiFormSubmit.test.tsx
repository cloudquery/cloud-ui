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

import { usePluginUiFormSubmit } from '../usePluginUiFormSubmit';

const formMessageHandler = new MessageHandler<
  FormMessageType,
  FormMessagePayload,
  PluginUiMessageType,
  PluginUiMessagePayload
>(formMessageTypes, pluginUiMessageTypes, window.parent);

describe('usePluginUiFormSubmit', () => {
  let originalPostMessage: typeof window.postMessage;

  afterEach(() => {
    window.parent.postMessage = originalPostMessage;
    jest.restoreAllMocks();
  });

  test('validation succeeded', async () => {
    const onValidate = jest.fn(() =>
      Promise.resolve({ values: { email: 'john@doe.com', name: 'John Doe' } }),
    );
    renderHook(() => usePluginUiFormSubmit(onValidate as any, getPluginUiMessageHandler()));

    await act(async () => {
      formMessageHandler.sendMessage('validate', undefined);

      originalPostMessage = window.parent.postMessage;
      window.parent.postMessage = jest.fn();
      jest.spyOn(window, 'addEventListener');
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      {
        type: 'validation_passed',
        payload: { values: { email: 'john@doe.com', name: 'John Doe' } },
        id: 'plugin-ui-connector-iframe',
      },
      '*',
    );
  });

  test('validation failed', async () => {
    const onValidate = jest.fn(() => Promise.resolve({ errors: { key: 'value' } }));
    renderHook(() => usePluginUiFormSubmit(onValidate as any, getPluginUiMessageHandler()));

    await act(async () => {
      formMessageHandler.sendMessage('validate', undefined);

      originalPostMessage = window.parent.postMessage;
      window.parent.postMessage = jest.fn();
      jest.spyOn(window, 'addEventListener');
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      {
        type: 'validation_failed',
        payload: { errors: { key: 'value' } },
        id: expect.any(String),
      },
      '*',
    );
  });
});
