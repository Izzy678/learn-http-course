export const PrintReport = (pages: Object) => {
  console.log("=============================");
  console.log("WEB CRAWLER REPORT");
  const sortedPages = sortPages(pages);
  for (const pages of sortedPages) {
    const urls = pages[0];
    const hits = pages[1];
    console.log(`found ${hits} link(s) to thispage:${urls}`);
  }
  console.log("================================");
  console.log("END REPORT");
};

export const sortPages = (pages: Object) => {
  const pagesToArr = Object.entries(pages);
  pagesToArr.sort((a, b) => {
    const aHits = a[1];
    const bHits = b[1]; // Corrected typo here
    return bHits - aHits; // Corrected typo here
  });
  return pagesToArr;
};
