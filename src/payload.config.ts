import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { FoodsCollection, foodsSlug } from "./collections/Foods";
import { MediaCollection } from "./collections/Media";
import { StoresCollection, storesSlug } from "./collections/Stores";
import { devUser } from "./credentials";

import Users from "./collections/Users";
import { MenuGlobal } from "./globals/Menu";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, StoresCollection, MediaCollection, FoodsCollection],
  globals: [MenuGlobal],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  onInit: async (payload) => {
    await payload.create({
      collection: "users",
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });

    const store1 = await payload.create({
      collection: storesSlug,
      data: {
        title: "Store 1",
      },
    });

    await payload.create({
      collection: foodsSlug,
      data: {
        title: "Food 1",
        store: store1.id,
      },
    });
  },
});
