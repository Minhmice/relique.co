/**
 * Service implementations (adapters) for web app
 * These implement contracts from @relique/shared/domain using localStorage/fixtures
 */

export { verifyServiceLocal as verifyService } from "./verify.local";
export { marketplaceServiceLocal as marketplaceService } from "./marketplace.local";
export { consignServiceLocal as consignService } from "./consign.local";
export { contentServiceLocal as contentService } from "./content.local";

