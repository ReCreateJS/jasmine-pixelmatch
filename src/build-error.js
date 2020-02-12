/** globals jasmineRequire */

export default function buildError(
  message,
  actualCanvas,
  expectedCanvas = null,
  diffCanvas = null
) {
  if (!isHTMLReport()) {
    let output = message;
    if (actualCanvas) {
      output += "\nActual: \n" + actualCanvas.toDataURL();
    }
    if (expectedCanvas) {
      output += "\nExpected: \n" + expectedCanvas.toDataURL();
    }
    if (diffCanvas) {
      output += "\nDiff: \n" + diffCanvas.toDataURL();
    }
    return output;
  }
  let html = buildEl("div", message);

  styleCanvas(actualCanvas);
  let actualDiv = buildEl("div", "Actual:<br/> ");
  actualDiv.appendChild(actualCanvas);
  html.appendChild(actualDiv);
  if (expectedCanvas) {
    styleCanvas(expectedCanvas);
    let expectedDiv = buildEl("div", "Expected:<br/> ");
    expectedDiv.appendChild(expectedCanvas);
    html.appendChild(expectedDiv);
  }
  if (diffCanvas) {
    styleCanvas(diffCanvas);
    let diffDiv = buildEl("div", "Diff:<br/> ");
    diffDiv.appendChild(diffCanvas);
    html.appendChild(diffDiv);
  }
  return html;
}

function isHTMLReport() {
  return !!jasmineRequire.html;
}

function buildEl(element, content) {
  element = document.createElement(element);
  if (element && content) {
    element.innerHTML = content;
  }
  return element;
}

function styleCanvas(canvas) {
  canvas.style.border = "1px solid #ddd";
  canvas.style.background = "white";
}
