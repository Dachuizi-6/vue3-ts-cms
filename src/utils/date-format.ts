import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcTime(time: string, format: string = DEFAULT_FORMAT) {
  return dayjs.utc(time).utcOffset(8).format(format)
}

// export function formatTimeStamp(
//   timestamp: number,
//   format: string = DEFAULT_FORMAT
// ) {
//   return ''
// }
