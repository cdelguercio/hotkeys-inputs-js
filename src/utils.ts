interface DeltaTimer {
  lastUpdate: number;
  tick: (freq?: number) => boolean;
}

const freqTimer: DeltaTimer = {
  lastUpdate: Date.now(),
  tick (freq = 10) {
    const now = Date.now();
    const dt = now - this.lastUpdate;
    if (dt > 1000 / freq) {
      this.lastUpdate = now;
      return true;
    }
    return false;
  },
};

export { freqTimer };
