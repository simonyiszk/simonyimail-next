import 'dotenv/config';

import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.POSTGRES_URL_NON_POOLING ?? 'postgresql://dummy:dummy@localhost:5432/dummy',
  },
});
