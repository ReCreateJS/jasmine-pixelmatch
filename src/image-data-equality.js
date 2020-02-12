import pixelmatch from "pixelmatch";

/**
 * Jasmine custom equality tester to see if two ImageData objects are the same.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ImageData
 *
 * @param {ImageData} first
 * @param {ImageData} second
 */
export default function imageDataEquality(first, second) {
  if (first instanceof ImageData && second instanceof ImageData) {
    return (
      first.width === second.width &&
      first.height === second.height &&
      pixelmatch(first.data, second.data, null, first.width, first.height) === 0
    );
  }
}
