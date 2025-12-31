import { marketplaceService } from "./marketplaceService";
import { contentService } from "./contentService";
import { consignService } from "./consignService";

export const adminService = {
  marketplace: marketplaceService,
  content: contentService,
  consign: consignService,

  getStats: () => {
    const listings = marketplaceService.list();
    const posts = contentService.posts.list();
    const events = contentService.events.list();
    const submissions = consignService.list("submitted");

    return {
      totalListings: listings.total,
      totalPosts: posts.length,
      totalEvents: events.length,
      totalSubmissions: submissions.length,
      recentListings: listings.data.slice(0, 5),
      recentPosts: posts.slice(0, 5),
      upcomingEvents: events.filter(
        (e) => new Date(e.date) >= new Date()
      ).slice(0, 5),
    };
  },
};

