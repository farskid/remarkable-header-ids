const Remarkable = require("remarkable");
const fs = require("fs");
const HeaderIdsPlugin = require("../index");

function getContent() {
  return fs.readFileSync("./test.md").toString();
}

function parseH2Only(content) {
  return new Remarkable.Remarkable()
    .use(
      HeaderIdsPlugin({
        levels: [2],
        anchorClassName: "this-is-anchor-in-header",
        anchorText: "AnchorText",
        headerId: slug =>
          `header-that-has-this-anchor-${slug}`
      })
    )
    .render(content);
}

// Run
fs.writeFileSync(
  "./parsed.html",
  parseH2Only(getContent())
);
