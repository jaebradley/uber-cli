import TimeUnit from '../data/TimeUnit';

export default class DurationFormatter {
  constructor(durationConverter) {
    this.durationConverter = durationConverter;
  }

  format(duration) {
    const convertedDuration = this.durationConverter.convert(duration, TimeUnit.SECOND);
    let seconds = convertedDuration.length;

    if (seconds < 0) {
      throw new RangeError('Cannot generate formatted time for negative seconds');
    }

    if (seconds === 0) {
      return '0 sec.';
    }

    const days = Math.floor(seconds / 86400);
    seconds %= 86400;

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    let formattedTime = '';
    if (days !== 0) {
      formattedTime += ` ${days} days`;
    }

    if (hours !== 0) {
      formattedTime += ` ${hours} hrs.`;
    }

    if (minutes !== 0) {
      formattedTime += ` ${minutes} min.`;
    }

    if (seconds !== 0) {
      formattedTime += ` ${seconds} sec.`;
    }

    // GAWD THIS IS SO FUCKING HACKY I HATE EVERYTHING
    return formattedTime.trim();
  }
}
