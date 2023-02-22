/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_API_AUDIENCE: string;
  readonly VITE_ENABLE_API_MOCKING: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
