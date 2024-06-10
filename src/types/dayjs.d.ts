// types/dayjs.d.ts

import { PluginFunc } from 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    format(template?: string): string;
    diff(date: Dayjs, unit?: string, float?: boolean): number;
    duration(diff: number, unit?: string): Duration;
    add(value: number, unit: string): Dayjs;
  }

  export function dayjs(date?: string | number | Date | Dayjs): Dayjs;
  export function extend(plugin: PluginFunc, option?: any): Dayjs;

  export class Duration {
    days(): number;
    hours(): number;
    minutes(): number;
    seconds(): number;
    asMilliseconds(): number;
    asSeconds(): number;
    asMinutes(): number;
    asHours(): number;
    asDays(): number;
    asWeeks(): number;
    asMonths(): number;
    asYears(): number;
  }

  export default dayjs;
}
