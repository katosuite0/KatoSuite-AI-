export interface FarcasterActions {
  ready: () => Promise<void>;
}

export interface FarcasterSDK {
  actions: FarcasterActions;
}

export const sdk: FarcasterSDK = {
  actions: {
    ready: async () => {
      // Simulate async setup without throwing in non-Farcaster environments.
      await new Promise((resolve) => setTimeout(resolve, 10));
    },
  },
};
