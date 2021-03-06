import toVisuallyEqual from "./visually-equal-matcher";
import imageDataEquality from "./image-data-equality";

export { imgToImageData, loadImage, fetchImageData } from "./image-helpers";

beforeEach(function() {
  jasmine.addMatchers({
    toVisuallyEqual
  });
  jasmine.addCustomEqualityTester(imageDataEquality);
});
