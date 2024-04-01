import { JSDOM } from "jsdom";
import axios from "axios";

export const crawlPage = async (BASEuRL: string, currentUrl: string, pages) => {
  try {
    console.log("actively crawling the page", currentUrl);
    const baseUrlObj = new URL(BASEuRL);
    const currentUrlObj = new URL(currentUrl);

    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
      return pages;
    }

    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    if (pages[normalizedCurrentUrl] > 0) {
      pages[normalizedCurrentUrl]++;
      return pages;
    }
    pages[normalizedCurrentUrl] = 1;

    const res = await axios.get(currentUrl);
    const contentType = res.headers["content-type"];

    if (res.status > 399) {
      console.log(`error in fetching with status code:
      ${res.status} on page ${currentUrl}`);
      return pages;
    }
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response,content type:${contentType} on page ${currentUrl}`
      );
      return pages;
    }
    const htmlBody = res.data;
    const urls = getUrlsFromHtml(htmlBody, BASEuRL);
    console.log(urls);
    for (const nextUrl of urls) {
      pages = await crawlPage(BASEuRL, nextUrl, pages);
    }
  } catch (error) {
    console.log(`error fetching ${error.message} on page: ${currentUrl}`);
  }
  return pages;
};

export const normalizeUrl = (urlParams: string) => {
  const url = new URL(urlParams);
  const hostPath = `${url.hostname}${url.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

export const getUrlsFromHtml = (htmlBody, baseUrl: string) => {
  const dom = new JSDOM(htmlBody);
  const urls = [];
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  return urls;
};
