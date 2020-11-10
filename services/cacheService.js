import { buildId } from "../public/buildId.js";

export const isCached = (path) => {
  // SSR backup - just in case...
  if (typeof window === 'undefined') return true;

  const url = `${window.location.origin}/_next/data/${buildId}${path}.json`

  return caches.match(new Request(url)).then(m => m ? true : false)
};
