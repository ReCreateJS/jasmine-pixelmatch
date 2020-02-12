import { createCanvasFromImageData, getCanvas } from "./canvas-helpers";
import buildError from "./build-error";
import pixelmatch from "pixelmatch";

export default function toVisuallyEqual(util, customEqualityTesters) {
  return {
    compare(actual, expected) {
      var result = {};

      if (!expected) {
        let actualCanvas = createCanvasFromImageData(actual);
        result.message = buildError("No expected image defined", actualCanvas);
        result.pass = false;
        return result;
      }

      let width = expected.width;
      let height = expected.height;

      let diffCanvas = getCanvas(width, height);
      let diffContext = diffCanvas.getContext("2d");
      const diff = diffContext.createImageData(width, height);

      try {
        let differingPixels = pixelmatch(
          expected.data,
          actual.data,
          diff.data,
          width,
          height,
          { threshold: 0.2, diffMask: true, alpha: 1, includeAA: false }
        );
        diffContext.putImageData(diff, 0, 0);
        result.pass = differingPixels === 0;

        if (!result.pass) {
          let actualCanvas = createCanvasFromImageData(actual);
          let expectedCanvas = createCanvasFromImageData(expected);
          let totalPixels = width * height;
          let percentDifference = (
            (differingPixels / totalPixels) *
            100
          ).toFixed(2);
          let message = `Images have ${differingPixels}/${totalPixels} (${percentDifference}%) differing pixels`;

          result.message = buildError(
            message,
            actualCanvas,
            expectedCanvas,
            diffCanvas
          );
        }
      } catch (error) {
        let actualCanvas = createCanvasFromImageData(actual);
        let expectedCanvas = createCanvasFromImageData(expected);
        result.pass = false;
        result.message = buildError(
          error.message,
          actualCanvas,
          expectedCanvas
        );
      }
      return result;
    }
  };
}
