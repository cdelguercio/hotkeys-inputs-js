import {
  ActionHandler,
  InputHandlerDefinedAction,
  InputHandlerType,
  RegisteredActions,
  RegisterInputActionOptions,
  GameControl,
  GamepadPrototype,
  InputActions
} from './dist/types';

declare const gamecontrol: GameControl;
//# sourceMappingURL=gamecontrol.d.ts.map

declare const gamepad: {
  init: (gpad: Gamepad) => GamepadPrototype;
};
//# sourceMappingURL=gamepad.d.ts.map

declare const inputActions: InputActions;
//# sourceMappingURL=inputActions.d.ts.map
export default inputActions;
export { gamepad, gamecontrol };
export {
  InputActions,
  InputHandlerType,
  InputHandlerDefinedAction,
  RegisteredActions,
  RegisterInputActionOptions,
  ActionHandler,
};

export enum DefaultGamepad {
  LeftJoystickAxeX = -1,
  LeftJoystickAxeY = -2,
  RightJoystickAxeX = -3,
  RightJoystickAxeY = -4,
  KeyA = 1,
  KeyB = 0,
  KeyX = 3,
  KeyY = 2,
  KeyUp = 12,
  KeyDown = 13,
  KeyLeft = 14,
  KeyRight = 15,
  KeyR1 = 5,
  KeyR2 = 7,
  KeyL1 = 4,
  KeyL2 = 6,
  KeyStart = 16,
  KeyOpts = 17,
  KeyPlus = 9,
  KeyMinus = 8,
}