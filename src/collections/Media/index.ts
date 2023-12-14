import type { CollectionConfig } from "payload/types";

export const mediaSlug = "media";

export const MediaCollection: CollectionConfig = {
  slug: mediaSlug,
  upload: true,
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [],
};
