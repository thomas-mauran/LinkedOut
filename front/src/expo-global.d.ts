declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * The URL of the LinkedOut API.
     */
    EXPO_PUBLIC_API_URL: string;

    /**
     * The URL of the LinkedOut OIDC discovery endpoint.
     */
    EXPO_PUBLIC_OIDC_DISCOVERY_URL: string;

    /**
     * The client ID of the LinkedOut OIDC client.
     */
    EXPO_PUBLIC_OIDC_CLIENT_ID: string;
  }
}
