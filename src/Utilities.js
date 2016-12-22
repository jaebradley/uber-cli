'use es6';

export default class Utilities {
  static isFloat(n) {
    return n === +n && n !== (n|0);
  }

  static generateFormattedTime(seconds) {
    let days = Math.floor(seconds / 86400);
    seconds %= 86400;

    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    let formattedTime = '';
    if (days !== 0) {
      formattedTime += days + ' d';
    }

    if (hours !== 0) {
      formattedTime += hours + ' h';
    }

    if (minutes !== 0) {
      formattedTime += minutes + ' m';
    }

    if (seconds !== 0) {
      formattedTime += seconds + ' s';
    }

    return formattedTime;
  }
}
