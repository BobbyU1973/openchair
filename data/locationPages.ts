import { shops, type Shop } from "@/data/shops";

export type LocationPage = {
  id: string;
  segments: string[];
  href: string;
  areaName: string;
  eyebrow: string;
  heading: string;
  description: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  searchLocation: string;
  zipCodes: string[];
  cityNames: string[];
  shopFilter: "all" | "walkIns";
  relatedPageIds: string[];
};

export const locationPages: LocationPage[] = [
  {
    id: "mooresville-haircuts",
    segments: ["mooresville", "haircuts"],
    href: "/nc/mooresville/haircuts",
    areaName: "Mooresville, NC",
    eyebrow: "Mooresville haircut guide",
    heading: "Haircut availability in Mooresville, NC",
    description:
      "Find Mooresville haircut shops with direct call buttons, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps people in Mooresville compare nearby haircut options quickly, then call, check in, book, or get directions from one place.",
    metaTitle: "Haircut Availability in Mooresville, NC",
    metaDescription:
      "Find haircut shops in Mooresville, NC. Compare walk-in options, direct booking links, phone numbers, and directions with ChairRadar.",
    searchLocation: "Mooresville, NC",
    zipCodes: ["28117", "28115"],
    cityNames: ["Mooresville"],
    shopFilter: "all",
    relatedPageIds: ["mooresville-walk-in-haircuts", "mooresville-28117", "lake-norman-haircuts"]
  },
  {
    id: "mooresville-walk-in-haircuts",
    segments: ["mooresville", "walk-in-haircuts"],
    href: "/nc/mooresville/walk-in-haircuts",
    areaName: "Mooresville, NC",
    eyebrow: "Walk-in haircut guide",
    heading: "Walk-in haircuts in Mooresville, NC",
    description:
      "Compare Mooresville shops that publicly signal walk-ins, online check-in, or same-day haircut access.",
    intro:
      "When a haircut cannot wait, ChairRadar highlights Mooresville shops with walk-in friendly signals and direct ways to call or check in.",
    metaTitle: "Walk-In Haircuts in Mooresville, NC",
    metaDescription:
      "Looking for walk-in haircuts in Mooresville, NC? See nearby shops, phone numbers, check-in links, and directions on ChairRadar.",
    searchLocation: "Mooresville, NC",
    zipCodes: ["28117", "28115"],
    cityNames: ["Mooresville"],
    shopFilter: "walkIns",
    relatedPageIds: ["mooresville-haircuts", "mooresville-28117", "lake-norman-walk-in-haircuts"]
  },
  {
    id: "mooresville-28117",
    segments: ["mooresville", "28117"],
    href: "/nc/mooresville/28117",
    areaName: "28117",
    eyebrow: "28117 haircut guide",
    heading: "Haircut shops near 28117",
    description:
      "Find haircut shops near 28117 with phone numbers, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar is starting with real public haircut listings around 28117 so people nearby can move from search to action fast.",
    metaTitle: "Haircut Shops Near 28117",
    metaDescription:
      "Find haircut shops near 28117. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28117",
    zipCodes: ["28117"],
    cityNames: ["Mooresville"],
    shopFilter: "all",
    relatedPageIds: ["mooresville-haircuts", "mooresville-walk-in-haircuts", "lake-norman-haircuts"]
  },
  {
    id: "lake-norman-haircuts",
    segments: ["lake-norman", "haircuts"],
    href: "/nc/lake-norman/haircuts",
    areaName: "Lake Norman",
    eyebrow: "Lake Norman haircut guide",
    heading: "Haircut availability near Lake Norman",
    description:
      "Compare haircut shops in the current Lake Norman coverage area with direct call, booking, website, and directions links.",
    intro:
      "ChairRadar is building a Lake Norman haircut discovery layer for people who need a nearby shop quickly and want to act from their phone.",
    metaTitle: "Haircut Availability Near Lake Norman",
    metaDescription:
      "Find haircut availability near Lake Norman. Compare nearby shops, walk-in signals, phone numbers, booking links, and directions.",
    searchLocation: "Lake Norman",
    zipCodes: ["28117", "28115", "28031", "28036", "28078", "28037"],
    cityNames: ["Mooresville", "Cornelius", "Davidson", "Huntersville", "Denver"],
    shopFilter: "all",
    relatedPageIds: ["lake-norman-walk-in-haircuts", "mooresville-haircuts", "mooresville-28117"]
  },
  {
    id: "lake-norman-walk-in-haircuts",
    segments: ["lake-norman", "walk-in-haircuts"],
    href: "/nc/lake-norman/walk-in-haircuts",
    areaName: "Lake Norman",
    eyebrow: "Lake Norman walk-in guide",
    heading: "Walk-in haircuts near Lake Norman",
    description:
      "Find Lake Norman-area haircut shops with walk-in friendly signals, direct phone links, online check-in, and directions.",
    intro:
      "For urgent haircut needs around Lake Norman, ChairRadar surfaces shops with public walk-in or same-day access signals first.",
    metaTitle: "Walk-In Haircuts Near Lake Norman",
    metaDescription:
      "Need a walk-in haircut near Lake Norman? Compare nearby shops, call directly, check in online, or get directions from ChairRadar.",
    searchLocation: "Lake Norman",
    zipCodes: ["28117", "28115", "28031", "28036", "28078", "28037"],
    cityNames: ["Mooresville", "Cornelius", "Davidson", "Huntersville", "Denver"],
    shopFilter: "walkIns",
    relatedPageIds: ["lake-norman-haircuts", "mooresville-walk-in-haircuts", "mooresville-28117"]
  }
];

export function getLocationPageBySegments(segments: string[]) {
  return locationPages.find((page) => page.segments.join("/") === segments.join("/"));
}

export function getLocationPageShops(page: LocationPage) {
  const matchingShops = shops.filter((shop) => {
    const locationMatches =
      page.zipCodes.includes(shop.zip) || page.cityNames.includes(shop.city);
    const typeMatches = page.shopFilter === "all" || shop.walkInsAvailable;

    return locationMatches && typeMatches;
  });

  return matchingShops.length > 0 ? matchingShops : shops;
}

export function getRelatedLocationPages(page: LocationPage) {
  return page.relatedPageIds
    .map((pageId) => locationPages.find((item) => item.id === pageId))
    .filter((item): item is LocationPage => Boolean(item));
}

export function getShopLocationSummary(shopList: Shop[]) {
  const cities = Array.from(new Set(shopList.map((shop) => shop.city)));
  const zips = Array.from(new Set(shopList.map((shop) => shop.zip)));

  return {
    cities,
    zips
  };
}
