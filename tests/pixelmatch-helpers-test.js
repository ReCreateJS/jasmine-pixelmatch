const { fetchImageData } = jasminePixelmatch;

describe("Success cases", function() {
  it("visually diffs image data", async () => {
    let refData = await fetchImageData("images/first.png");
    let changedData = await fetchImageData("images/second.png");
    expect(refData).not.toVisuallyEqual(changedData);
  });

  it("checks image data inequality", async () => {
    let refData = await fetchImageData("images/first.png");
    let changedData = await fetchImageData("images/second.png");
    expect(refData).not.toEqual(changedData);
  });

  it("understands images visually the same", async () => {
    let imgData = await fetchImageData("images/first.png");
    expect(imgData).toVisuallyEqual(imgData);
  });

  it("understands image data equality", async () => {
    let imgData = await fetchImageData("images/first.png");
    expect(imgData).toEqual(imgData);
  });
});
