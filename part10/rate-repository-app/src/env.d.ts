declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      EXPO_PUBLIC_APOLLO_URI: string
    }
  }
}

export {}
