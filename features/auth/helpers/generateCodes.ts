import {
  getRandomBytesAsync,
  digestStringAsync,
  CryptoDigestAlgorithm,
  CryptoEncoding,
} from 'expo-crypto';

function base64URLEncode(bytes: Uint8Array | string): string {
  let base64: string;

  if (bytes instanceof Uint8Array) {
    // Convert Uint8Array → binary string → Base64
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    base64 = btoa(binary);
  } else {
    // Already a string (like digestStringAsync result with BASE64 encoding)
    base64 = bytes;
  }

  // Make Base64 URL-safe (RFC 4648 §5)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export const generateCodes = async () => {
  const randomBytes = await getRandomBytesAsync(32);
  const cv = base64URLEncode(randomBytes);
  console.log('cv: ', cv);

  const cc = base64URLEncode(
    await digestStringAsync(CryptoDigestAlgorithm.SHA256, cv, {
      encoding: CryptoEncoding.BASE64,
    })
  );
  console.log('cc: ', cc);

  return { cv, cc };
};
