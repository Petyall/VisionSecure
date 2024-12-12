/**
 * Interface describing time data.
 * @param {number} second - Total number of seconds of the event.
 * @param {number} lastUpdate - Time of the last update in milliseconds.
 * @param {boolean} stop - Whether the timer is "alive".
 * @param {string} time - Current time of the event.
 * @param {number} add - Added time.
 */
export interface PropsTimer {
  second: number;
  lastUpdate: number;
  stop: boolean;
  time: '---' | string;
  add: number;
}

/**
 * Parses the timer string and returns an object with time data.
 * @param {string} timer The timer string in the format "seconds last_update stop event_time added_time".
 * @returns {PropsTimer} Object containing time data.
 */
export const parseTime = (timer: string): PropsTimer => {
  // Split the timer string into individual components
  const items = timer.split(' ');

  // Return an object with time data
  return {
    // Total number of seconds of the event
    second: Number(items[0]),
    // Time of the last update in milliseconds
    lastUpdate: Number(items[1]),
    // Whether the timer is "alive"
    stop: items[2] == '0',
    // Current time of the event
    time: items[3],
    // Added time
    add: Number(items[4]),
  };
};
