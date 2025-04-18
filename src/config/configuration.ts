const { PORT } = process.env;
export default () => ({
  port: PORT || 8080,
});
