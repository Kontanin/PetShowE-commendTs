declare module 'dayjs' {
  interface Dayjs {
    format(template?: string): string;
    // Add other methods and properties as needed
  }

  function dayjs(date?: string | number | Date | Dayjs): Dayjs;

  export default dayjs;
}

import { PluginFunc } from 'dayjs';

declare module 'dayjs' {
  export function extend(plugin: PluginFunc, option?: any): Dayjs;
}
