import { IProxyInputEventHandler } from './types';
import hotkeys, { HotkeysEvent } from 'hotkeys-js';

const keyboardProxy: IProxyInputEventHandler = {
  on (eventName, callback, event = 'changed') {
    if (event === 'repeat') {
      hotkeys(eventName as string, (e, _) => {
        e.preventDefault();
        callback(1);
      });
    } else {
      const hotKeysOptions = {
        keyup: event === 'released' || event === 'changed' ? true : null,
        keydown: event === 'pressed' || event === 'changed' ? true : null,
      };
      hotkeys(eventName as string, hotKeysOptions, (e: KeyboardEvent, d: HotkeysEvent) => {
        if (!e.repeat) {
          if (e.type === 'keyup' && (event === 'changed')) {
            callback(0);
          } else {
            callback(hotkeys.isPressed(eventName as string) === true ? 1 : 0);
          }
        }
      });
    }
  },
  off (eventName, handler) {
    hotkeys.unbind(eventName as string);
  },
};

export default keyboardProxy;