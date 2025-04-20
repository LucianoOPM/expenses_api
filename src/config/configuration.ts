export default () => ({
  port: process.env.PORT || 8080,
  versionApi: process.env.API_VERSION || 'v1',
  databaseUrl: process.env.DATABASE_URL,
});
