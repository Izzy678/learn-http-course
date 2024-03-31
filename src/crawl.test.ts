import { expect, test } from "@jest/globals";
import { getUrlsFromHtml, normalizeUrl } from "./craw";

test("normalizeUrl strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl STRIP HTTPS", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getUrlFromHtml absoulute", () => {
  const input = `
    <html> 
    <body>
    <a href="https://blog.boot.dev/">
     Boot.dev.blog
    </a>
    </body>
    </html>
    `;
  const baseUrl = "https://blog.boot.dev";
  const expected = ["https://blog.boot.dev/"];
  const actual = getUrlsFromHtml(input, baseUrl);
  expect(actual).toEqual(expected);
});

test("getUrlFromHtml relative", () => {
  const input = `
      <html> 
      <body>
      <a href="/path">
       Boot.dev.blog
      </a>
      </body>
      </html>
      `;
  const baseUrl = "https://blog.boot.dev";
  const expected = ["https://blog.boot.dev/path"];
  const actual = getUrlsFromHtml(input, baseUrl);
  expect(actual).toEqual(expected);
});

test("getUrlFromHtml relative absoulute", () => {
  const input = `
      <html> 
      <body>
      <a href="/path">
       Path1
      </a>
      <a href="https://blog.boot.dev/path1">
     Boot.dev.blog
    </a>
      </body>
      </html>
      `;
  const baseUrl = "https://blog.boot.dev";
  const expected = ["https://blog.boot.dev/path", "https://blog.boot.dev/path1"];
  const actual = getUrlsFromHtml(input, baseUrl);
  expect(actual).toEqual(expected);
});

test("getUrlFromHtml invalid", () => {
    const input = `
        <html> 
        <body>
        <a href="invalid">
         invalidUrl
        </a>
        </body>
        </html>
        `;
    const baseUrl = "https://blog.boot.dev";
    const expected = [];
    const actual = getUrlsFromHtml(input, baseUrl);
    expect(actual).toEqual(expected);
  });
  