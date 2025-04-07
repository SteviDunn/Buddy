import axios from "axios";
import * as cheerio from "cheerio";

type Event = {
    title: string;
    link: string;
    image: string | null;
  };
  
export async function scrapeLumaEvents() {
  const url = "https://lu.ma/sf/";
  const events: Event[] = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(".card-wrapper").each((i, el) => {
      const anchor = $(el).find("a.event-link");
      const relativeLink = anchor.attr("href");
      const title = anchor.attr("aria-label")?.trim();
      const img = $(el).find("img[src^='https://images.lumacdn.com']").attr("src");

      if (relativeLink && title) {
        const fullLink = "https://lu.ma" + relativeLink;
        events.push({
          title,
          link: fullLink,
          image: img || null,
        });
      }
    });

    return events; // ✅ We return the data now
  } catch (error) {
    console.error("❌ Error scraping Luma SF page:", error);
    return [];
  }
}
