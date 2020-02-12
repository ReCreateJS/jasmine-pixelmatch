export function getCanvas(width, height) {
  var canvas = document.createElement("canvas");
  if (width) canvas.width = width;
  if (height) canvas.height = height;
  return canvas;
}

export function createCanvasFromImageData(imageData) {
  let canvas = getCanvas(imageData.width, imageData.height);
  let context = canvas.getContext("2d");
  context.putImageData(imageData, 0, 0);
  return canvas;
}
