class DistanceExceeds100MilesError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'Distance Exceeds 100 Miles';
  }
}
