const { imgToImageData, loadImage } = jasminePixelmatch;

describe("Success cases", function() {
  it("visually diffs image data", async () => {
    let refData = imgToImageData(await loadImage("images/first.png"));
    let changedData = imgToImageData(await loadImage("images/second.png"));
    expect(refData).not.toVisuallyEqual(changedData);
  });

  it("checks image data inequality", async () => {
    let refData = imgToImageData(await loadImage("images/first.png"));
    let changedData = imgToImageData(await loadImage("images/second.png"));
    expect(refData).not.toEqual(changedData);
  });

  it("understands images visually the same", async () => {
    let imgData = imgToImageData(await loadImage("images/first.png"));
    expect(imgData).toVisuallyEqual(imgData);
  });

  it("understands image data equality", async () => {
    let imgData = imgToImageData(await loadImage("images/first.png"));
    expect(imgData).toEqual(imgData);
  });
});
