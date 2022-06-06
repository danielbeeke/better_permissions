export interface PermissionOptions {
  all?: boolean;
  env?: boolean;
  hrtime?: boolean;
  net?: boolean | Array<string>;
  read?: boolean | Array<string>;
  run?: boolean;
  watch?: boolean;
  write?: boolean | Array<string>;
}

export enum PermissionFlag {
  AllowAll = "--allow-all",
  AllowEnv = "--allow-env",
  AllowHrTime = "--allow-hrtime",
  AllowNet = "--allow-net",
  AllowRead = "--allow-read",
  AllowRun = "--allow-run",
  AllowWatch = "--watch",
  AllowWrite = "--allow-write",
}
