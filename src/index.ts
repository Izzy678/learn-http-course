import { crawlPage } from "./craw";

async function main() {
    if(process.argv.length<3){
      console.log("no website provide");
      process.exit(1)
    }
    if(process.argv.length>3){
      console.log("too many command line arg")
      process.exit(1)
    };
    const baseUrl = process.argv[2];
    console.log("starting web crawl");
   const pages = await crawlPage(baseUrl,baseUrl,{});
   for(const page of Object.entries(pages)){
    console.log(page)
   }
}
main();