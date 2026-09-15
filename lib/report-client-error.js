export function reportClientError(error) {
  const payload = {
    message: error?.message || 'Unknown browser error',
    digest: error?.digest,
    path: typeof window === 'undefined' ? undefined : window.location.pathname,
  };

  fetch('/api/client-errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
