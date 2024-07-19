import { LiteEvent } from './LiteEvents';
import { GamepadPrototype } from './types';
import { freqTimer } from './utils';

const makeEmptyEvents = <T>() => ({
  changed: new LiteEvent<T>(),
  pressed: new LiteEvent<T>(),
  released: new LiteEvent<T>(),
  repeat: new LiteEvent<T>(),
});

const gamepad = {
  init (gpad: Gamepad) {
    const gamepadPrototype: GamepadPrototype = {
      id: gpad.index,
      buttons: gpad.buttons.length,
      axes: Math.floor(gpad.axes.length),
      axeValues: [],
      axeStep: 0.15,
      triggerTrim: 0.05, // TODO: this has only been tested for use with repeat
      hapticActuator: null,
      vibrationMode: -1,
      vibration: false,
      mapping: gpad.mapping,
      buttonActions: {},
      axesActions: {},
      pressed: {},
      vibrate (value = 0.75, duration = 500) {
        if (this.hapticActuator) {
          switch (this.vibrationMode) {
            case 0:
              return this.hapticActuator.pulse(value, duration);
            case 1:
              return this.hapticActuator.playEffect('dual-rumble', {
                duration,
                strongMagnitude: value,
                weakMagnitude: value,
              });
          }
        }
      },
      checkStatus () {
        let gp = {} as Gamepad;
        const repeat = freqTimer.tick();
        const gps = navigator.getGamepads
          ? navigator.getGamepads()
          : (navigator as any).webkitGetGamepads
          ? (navigator as any).webkitGetGamepads()
          : [];

        if (gps.length) {
          gp = gps[this.id] as Gamepad;
          if (gp.buttons) {
            for (let x = 0; x < this.buttons; x++) {
              if (repeat) {
                // If the value is greater than zero, trigger repeat
                if (gp.buttons[x].value !== undefined && gp.buttons[x].value > 0) {
                  const trimmedValue = gp.buttons[x].value < this.triggerTrim ? 0.0 : gp.buttons[x].value;
                  this.buttonActions[x].repeat.trigger(trimmedValue);
                }
              }
              if (gp.buttons[x].pressed) {
                if (!this.pressed[`button${x}`]) {
                  this.pressed[`button${x}`] = true;
                  this.buttonActions[x].pressed.trigger(1);
                  this.buttonActions[x].changed.trigger(1);
                }
              } else if (this.pressed[`button${x}`]) {
                if (!gp.buttons[x].pressed) {
                  this.buttonActions[x].changed.trigger(0);
                }
                delete this.pressed[`button${x}`];
                this.buttonActions[x].released.trigger(0);
                this.buttonActions[x].repeat.trigger(0);
              }
            }
          }
          if (gp.axes) {
            for (let x = 0; x < this.axes; x++) {
              const jIndex = Math.floor(x / 2);
              const modifier = x % 2 === 0 ? 'horizontal' : 'vertical';
              let newAxisValue = gp.axes[x] ?? 0;
              // Zero the axis within the dead zone
	            if (Math.abs(gp.axes[x]) <= this.axeStep) {
                newAxisValue = 0;
              }
              // If the old value is out of the dead zone, trigger repeat if the timer ticked
              // or if the new value is in the dead zone
              // Else if the old value is in the dead zone, trigger repeat if the timer ticked
              // and the new value is out of the dead zone
              // These constraints will avoid spamming repeat in the dead zone and flicks from the
              // center of the joystick outwards
              if (Math.abs(this.axeValues[x]) > this.axeStep) {
                if (newAxisValue === 0 || repeat) this.axesActions[jIndex][modifier].repeat.trigger(newAxisValue);
              } else if (repeat && (Math.abs(newAxisValue) > this.axeStep)) {
                this.axesActions[jIndex][modifier].repeat.trigger(newAxisValue);
	            }
              if (newAxisValue === 0 && this.axeValues[x] !== 0) {
                // If released
                this.axesActions[jIndex][modifier].changed.trigger(newAxisValue);
                this.axesActions[jIndex][modifier].released.trigger(newAxisValue);
                this.axeValues[x] = newAxisValue;
              } else if (Math.abs(this.axeValues[x] - newAxisValue) < this.axeStep) {
                // In that case we do nothing, the value has not changed or, under the threshold.
                // We do not want to spam the consumer with callback
              } else if (this.axeValues[x] === 0) {
                // If activated
                this.axesActions[jIndex][modifier].changed.trigger(newAxisValue);
                this.axesActions[jIndex][modifier].pressed.trigger(newAxisValue);
                this.axeValues[x] = newAxisValue;
              } else {
                // Value changed
                this.axesActions[jIndex][modifier].changed.trigger(newAxisValue);
                this.axeValues[x] = newAxisValue;
              }
              if (newAxisValue === 0) this.axeValues[x] = 0;
            }
          }
        }
      },
      on (eventName: number | string, callback: (value?: number) => void, eventType = 'changed') {
        if (eventName < 0) {
          // If subscribing to a joystick event
          const jIndex = Math.floor((Math.abs(eventName as number) - 1) / 2);
          const orientation = (Math.abs(eventName as number) - 1) % 2 === 0 ? 'horizontal' : 'vertical';
          this.axesActions[jIndex][orientation][eventType].on(callback);
        } else {
          // If a button
          this.buttonActions[eventName as number][eventType].on(callback);
        }
        return this;
      },
      off (eventName: number | string) {
        if (eventName < 0) {
          // If unsubscribing to a joystick event
          const jIndex = Math.floor((Math.abs(eventName as number) - 1) / 2);
          const orientation = (Math.abs(eventName as number) - 1) % 2 === 0 ? 'horizontal' : 'vertical';
          this.axesActions[jIndex][orientation].changed.offAll();
          this.axesActions[jIndex][orientation].pressed.offAll();
          this.axesActions[jIndex][orientation].released.offAll();
          this.axesActions[jIndex][orientation].repeat.offAll();
        } else {
          // If a button
          this.buttonActions[eventName as number].changed.offAll();
          this.buttonActions[eventName as number].pressed.offAll();
          this.buttonActions[eventName as number].released.offAll();
          this.buttonActions[eventName as number].repeat.offAll();
        }
        return this;
      },
    };

    for (let x = 0; x < gamepadPrototype.buttons; x++) {
      gamepadPrototype.buttonActions[x] = (makeEmptyEvents as any)();
    }
    for (let x = 0; x < gamepadPrototype.axes; x++) {
      gamepadPrototype.axesActions[x] = {
        vertical: makeEmptyEvents(),
        horizontal: makeEmptyEvents(),
      };
    }

    if (gpad.hapticActuators) {
      if (typeof (gpad.hapticActuators as any).pulse === 'function') {
        gamepadPrototype.hapticActuator = gpad.hapticActuators;
        gamepadPrototype.vibrationMode = 0;
        gamepadPrototype.vibration = true;
      } else if (gpad.hapticActuators[0] && typeof (gpad.hapticActuators as any)[0].pulse === 'function') {
        gamepadPrototype.hapticActuator = gpad.hapticActuators[0];
        gamepadPrototype.vibrationMode = 0;
        gamepadPrototype.vibration = true;
      }
    } else if ((gpad as any).vibrationActuator) {
      if (typeof (gpad as any).vibrationActuator.playEffect === 'function') {
        gamepadPrototype.hapticActuator = (gpad as any).vibrationActuator;
        gamepadPrototype.vibrationMode = 1;
        gamepadPrototype.vibration = true;
      }
    }
    gamepadPrototype.axeValues = [...gpad.axes] as number[];
    return gamepadPrototype;
  },
};

export default gamepad;
