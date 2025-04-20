import { type Request } from 'express';
import { URL } from 'node:url';

export const pageHandler = (config: {
  req: Request;
  page: number;
  totalPages: number;
}) => {
  const hadNextPage = config.page < config.totalPages;
  const hadPreviousPage = config.page > 1;
  const url = new URL(`http://localhost:8080${config.req.url}`);
  const urlApiIndex = url.href.indexOf('/api');

  let nextPage: string = null;
  if (hadNextPage) {
    try {
      url.searchParams.set('page', (config.page + 1).toString());
      nextPage = url.toString();
    } catch (error) {
      console.error('Error al construir la URL de la página siguiente:', error);
    }
  }

  let previousPage: string = null;
  if (hadPreviousPage) {
    try {
      url.searchParams.set('page', (config.page - 1).toString());
      previousPage = url.toString();
    } catch (error) {
      console.error('Error al construir la URL de la página anterior:', error);
    }
  }

  return {
    nextPage: nextPage ? nextPage.slice(urlApiIndex) : null,
    previousPage: previousPage ? previousPage.slice(urlApiIndex) : null,
  };
};
