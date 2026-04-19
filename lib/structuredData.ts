import type { LocationPage } from "@/data/locationPages";
import type { Shop } from "@/data/shops";
import { SITE_URL } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  url: string;
};

function formatTelephone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `+1${digits}` : phone;
}

export function getBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function getShopStructuredData(shop: Shop) {
  const shopUrl = `${SITE_URL}/shops/${shop.id}`;
  const sameAs = Array.from(new Set([shop.websiteUrl, shop.bookingUrl].filter(Boolean)));

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HairSalon"],
    "@id": `${shopUrl}#business`,
    name: shop.name,
    description: shop.availabilitySummary,
    url: shopUrl,
    telephone: formatTelephone(shop.phone),
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address,
      addressLocality: shop.city,
      addressRegion: shop.state,
      postalCode: shop.zip,
      addressCountry: "US"
    },
    areaServed: {
      "@type": "City",
      name: `${shop.city}, ${shop.state}`
    },
    priceRange: shop.priceFrom ? `From $${shop.priceFrom}` : undefined,
    sameAs,
    potentialAction: [
      shop.bookingUrl
        ? {
            "@type": "ReserveAction",
            target: shop.bookingUrl,
            name: shop.bookingLabel
          }
        : undefined,
      {
        "@type": "CommunicateAction",
        target: shop.callUrl,
        name: "Call shop"
      }
    ].filter(Boolean)
  };
}

export function getLocationPageStructuredData(page: LocationPage, pageShops: Shop[]) {
  const pageUrl = `${SITE_URL}${page.href}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      name: page.metaTitle,
      description: page.metaDescription,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "ChairRadar",
        url: SITE_URL
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: pageShops.slice(0, 30).map((shop, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: shop.name,
          url: `${SITE_URL}/shops/${shop.id}`
        }))
      }
    },
    getBreadcrumbStructuredData([
      { name: "ChairRadar", url: SITE_URL },
      { name: page.areaName, url: pageUrl }
    ])
  ];
}
