// @ts-nocheck

const Remarkable = require("remarkable");
const HeaderIdsPlugin = require("../index");
const content = require("../mockData");

function parseAllHeaders(
  content,
  levels = [1, 2, 3, 4, 5, 6]
) {
  return new Remarkable.Remarkable()
    .use(
      HeaderIdsPlugin({
        levels,
        anchorClassName: "this-is-anchor-in-header",
        anchorText: "#",
        headerId: (slug) =>
          `header-that-has-this-anchor-${slug}`,
      })
    )
    .render(content);
}

describe("headers", () => {
  test("Renders anchor tags for all headers successfully", () => {
    expect(parseAllHeaders(content)).toMatchSnapshot();
  });

  test("Renders only H1 anchors", () => {
    expect(parseAllHeaders(content, [1])).toMatchSnapshot();
  });

  test("Renders only H2 anchors", () => {
    expect(parseAllHeaders(content, [2])).toMatchSnapshot();
  });

  test("Renders only H3 anchors", () => {
    expect(parseAllHeaders(content, [3])).toMatchSnapshot();
  });

  test("Renders only H4 anchors", () => {
    expect(parseAllHeaders(content, [4])).toMatchSnapshot();
  });

  test("Renders only H5 anchors", () => {
    expect(parseAllHeaders(content, [5])).toMatchSnapshot();
  });

  test("Renders only H6 anchors", () => {
    expect(parseAllHeaders(content, [6])).toMatchSnapshot();
  });

  test("Renders combination of levels", () => {
    expect(
      parseAllHeaders(content, [1, 4, 6])
    ).toMatchSnapshot();
  });
});
