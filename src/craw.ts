import { JSDOM } from "jsdom";
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
            console.log(error.message)
        }
    
    } else {
        try {
            const urlObj = new URL(linkElement.href);
            urls.push(urlObj.href);
        } catch (error) {
            console.log(error.message)
        }
     
    
    }
  }
  return urls;
};
