export default class Utilities {
  static isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }
}
