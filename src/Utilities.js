'use es6';

export default class Utilities {
  static isFloat(n) {
    return n === +n && n !== (n|0);
  }
}
