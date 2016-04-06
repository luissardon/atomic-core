class Utils {
  static getUID() {
    return Math.random().toString(36).substr(2, 9);
  }
}