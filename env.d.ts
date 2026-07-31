/// <reference types="vite/client" />

declare module "*.svg?jsx" {
  import React from "react";
  const C: React.FC<React.SVGAttributes<SVGElement>>;

  export default C;
}

declare const __DEV__: boolean;
declare const __VERSION__: string;
declare const __SENTRY_DSN__: string;
type Timer = ReturnType<typeof setTimeout | typeof setInterval>;
