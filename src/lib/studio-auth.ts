export const STUDIO_AUTH_COOKIE = 'studio_auth';

const encodeBase64 = (value: string) => {
  if (typeof Buffer !== 'undefined') return Buffer.from(value, 'utf-8').toString('base64');
  if (typeof btoa === 'function') {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }
  throw new Error('Base64 encoder is not available in this runtime.');
};

export const isStudioEnabled = process.env.STUDIO_ENABLED === 'true';

export const getStudioCredentials = () => {
  const username = process.env.STUDIO_AUTH_USER;
  const password = process.env.STUDIO_AUTH_PASSWORD;
  if (!username || !password) return null;
  return { username, password };
};

export const getStudioExpectedToken = () => {
  const credentials = getStudioCredentials();
  if (!credentials) return null;
  return encodeBase64(`${credentials.username}:${credentials.password}`);
};

export const isStudioSessionTokenValid = (token: string | null | undefined) => {
  if (!isStudioEnabled) return false;
  const expectedToken = getStudioExpectedToken();
  if (!expectedToken || !token) return false;
  return token === expectedToken;
};

export const sanitizeStudioNextPath = (
  nextPath: string | null | undefined,
  fallbackPath = '/studio',
) => {
  if (!nextPath) return fallbackPath;
  if (!nextPath.startsWith('/')) return fallbackPath;
  if (nextPath.startsWith('//')) return fallbackPath;
  return nextPath;
};
