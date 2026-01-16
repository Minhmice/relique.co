import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

// Collections
import { Posts } from './payload/collections/Posts';
import { Testimonials } from './payload/collections/Testimonials';
import { Team } from './payload/collections/Team';
import { Media } from './payload/collections/Media';

// Globals
import { HomePage } from './payload/globals/HomePage';
import { ContactPage } from './payload/globals/ContactPage';
import { AboutPage } from './payload/globals/AboutPage';
import { Legal } from './payload/globals/Legal';
import { SiteSettings } from './payload/globals/SiteSettings';
import { StrategicPartner } from './payload/globals/StrategicPartner';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Media,
    Posts,
    Testimonials,
    Team,
  ],
  globals: [
    HomePage,
    ContactPage,
    AboutPage,
    Legal,
    SiteSettings,
    StrategicPartner,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    },
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
});
