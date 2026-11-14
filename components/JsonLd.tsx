import { site } from "@/lib/site";

export function JsonLd() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "School",
    name: site.name,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  };

  const sameAs = [site.social.instagram, site.social.tiktok].filter(Boolean);
  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  if (site.url) {
    schema.url = site.url;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
