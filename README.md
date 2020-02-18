# Jasmine Pixelmatch

HTML5 canvas visual difference checking in the [Jasmine](https://jasmine.github.io/) test framework with [pixelmatch](https://github.com/mapbox/pixelmatch).

## Features

- See differences
- Base64 image dump of images in headless environments

## Example

To obtain a reference image to compare against, just set up your test with no reference image, like so:

```js
describe("visual canvas test", function() {
  it("looks right", function(done) {
    let canvas = drawACanvas(200, 200);
    let context = canvas.getContext("2d");
    let canvasData = context.getImageData(0, 0, canvas.width, canvas.height);
    expect(canvasData).toVisuallyEqual(); // no argument
  });
});
```

Then save the image shown, and make it available to the test runner.

Update your test to load and pass in the image:

```js
describe("visual canvas test", function() {
  it("looks right", async function(done) {
    let canvas = drawACanvas(200, 200);
    let context = canvas.getContext("2d");
    let canvasData = context.getImageData(0, 0, canvas.width, canvas.height);
    let referenceData = imgToImageData(await loadImage("saved_image.png"));
    expect(canvasData).toVisuallyEqual(referenceData);
  });
});
```
