export function buildURL(location: string, params?: Record<string, string>) {
  const url = new URL(location);

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value) {
        url.searchParams.set(key, value);
      }
    }
  }

  return url.href;
}

export function isUrlValid(text: string) {
  const res = text.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
}

export const getFileNameFromBlobUrl = (blobUrl: string) => {
  const url = new URL(blobUrl);
  const path = url.pathname;
  const fileName = path.substring(path.lastIndexOf("/") + 1);
  return fileName;
};
