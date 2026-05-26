export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  let redirect = false;

  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    redirect = true;
  }
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.slice(4);
    redirect = true;
  }
  if (redirect) {
    return Response.redirect(url.toString(), 301);
  }

  const res = await next();

  if (url.hostname.endsWith('.pages.dev')) {
    const cloned = new Response(res.body, res);
    cloned.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return cloned;
  }

  return res;
};
