// @ts-nocheck

const Remarkable = require("remarkable");
const HeaderIdsPlugin = require("../index");
const content = require("../mockData");

/**
 * {
        levels,
        anchorClassName: "this-is-anchor-in-header",
        anchorText: "#",
        headerId: (slug) =>
          `header-that-has-this-anchor-${slug}`,
      }
 */

function parseAllHeaders(content, options = {}) {
  return new Remarkable.Remarkable()
    .use(HeaderIdsPlugin(options))
    .render(content);
}

describe("options", () => {
  test("renders with default options", () => {
    expect(parseAllHeaders(content)).toMatchSnapshot();
  });
  test("renders custom anchorClassName", () => {
    expect(
      parseAllHeaders(content, {
        anchorClassName: "test-anchor-className",
      })
    ).toMatchSnapshot();
  });
  test("renders custom anchorText", () => {
    expect(
      parseAllHeaders(content, {
        anchorText: "test-anchor-text",
      })
    ).toMatchSnapshot();
  });
  test("renders custom headerId", () => {
    expect(
      parseAllHeaders(content, {
        headerId: (slug) =>
          `look-I-have-custom-header-id-with-slug-${slug}`,
      })
    ).toMatchSnapshot();
  });
  test("renders with all custom options", () => {
    expect(
      parseAllHeaders(content, {
        anchorClassName: "test-anchor-className",
        anchorText: "test-anchor-text",
        headerId: (slug) =>
          `look-I-have-custom-header-id-with-slug-${slug}`,
      })
    ).toMatchSnapshot();
  });
});
