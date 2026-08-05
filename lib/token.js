const encoder = new TextEncoder();
const sessionSecret = process.env.SESSION_SECRET || 'buildinbyte-super-secret-pre-prod-token';

export async function signToken(payload) {
  const payloadStr = JSON.stringify({ ...payload, exp: Date.now() + 3600000 });
  const payloadB64 = btoa(unescape(encodeURIComponent(payloadStr))).replace(/=/g, '');
  
  const keyData = encoder.encode(sessionSecret);
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payloadB64)
  );
  
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${payloadB64}.${signatureHex}`;
}

export async function verifyToken(token) {
  if (!token || !token.includes('.')) {
    return null;
  }
  
  try {
    const [payloadB64, signatureHex] = token.split('.');
    const keyData = encoder.encode(sessionSecret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const sigBytes = new Uint8Array(signatureHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      encoder.encode(payloadB64)
    );
    
    if (!isValid) {
      return null;
    }
    
    const payloadStr = decodeURIComponent(escape(atob(payloadB64)));
    const payload = JSON.parse(payloadStr);
    
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (err) {
    return null;
  }
}
