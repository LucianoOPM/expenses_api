export default () => ({
  port: process.env.PORT || 8080,
  databaseUrl: process.env.DATABASE_URL,
});
