import { PermissionOptions, PermissionFlag } from "./types.ts";
import { validateOptions } from "./validate.ts";

/**
 * Returns a string with the permission flags specified by the passed options
 * @param options 
 */
export function generatePermisionsString(options: PermissionOptions): string {
  return generatePermisions(options).join(" ");
}

/**
 * Returns a string with the permission flags specified by the passed options
 * @param options 
 */
export function generatePermisions(
  options: PermissionOptions,
): Array<string> {
  const optionsValidation = validateOptions(options);

  if (!optionsValidation.valid) {
    throw new Error(
      "Invalid options object! " + optionsValidation.message,
    );
  }
  const result: Array<string> = [];

  if (options.all) {
    result.push(PermissionFlag.AllowAll);
  } else {
    if (options.env) {
      result.push(PermissionFlag.AllowEnv);
    }

    if (options.hrtime) {
      result.push(PermissionFlag.AllowHrTime);
    }

    if (options.run) {
      result.push(PermissionFlag.AllowRun);
    }
    
    if (options.watch) {
      result.push(PermissionFlag.AllowWatch);
    }

    if (options.read) {
      let readFlag = generateArrayPermissionFlag(
        PermissionFlag.AllowRead,
        options.read,
        generateUrlsString,
      );
      result.push(readFlag);
    }

    if (options.write) {
      let writeFlag = generateArrayPermissionFlag(
        PermissionFlag.AllowWrite,
        options.write,
        generateUrlsString,
      );
      result.push(writeFlag);
    }

    if (options.net) {
      let netFlag = generateArrayPermissionFlag(
        PermissionFlag.AllowNet,
        options.net,
        generateUrlsString,
      );
      result.push(netFlag);
    }
  }
  return result;
}

/**
 * Used to mount the permission string for permissions that can specify an array of files
 * @param flag the permissions flag
 * @param array the value array
 * @param stringifyArrayFn A function that transforms an array of string into a single string
 */
function generateArrayPermissionFlag(
  flag: PermissionFlag,
  array: Array<string> | boolean,
  stringifyArrayFn: (array: Array<string>) => string,
): string {
  if (Array.isArray(array)) {
    return flag + "=" + stringifyArrayFn(array);
  }
  return flag;
}

/**
 * Returns a list of values separated by a " " (space)
 * @param array 
 */
function generatePathsString(array: Array<string>): string {
  return array.join(" ");
}

/**
 * Returns a list of values separated by a "," (comma)
 * @param array 
 */
function generateUrlsString(array: Array<string>): string {
  return array.join(",");
}
