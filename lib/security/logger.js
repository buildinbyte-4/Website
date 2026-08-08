function serializeContext(context) {
  return Object.fromEntries(
    Object.entries(context || {}).filter(([, value]) => value !== undefined)
  );
}

export function appLog(message, context = {}) {
  console.info(JSON.stringify({ level: 'info', category: 'application', message, ...serializeContext(context) }));
}

export function activityLog(action, context = {}) {
  console.info(JSON.stringify({ level: 'info', category: 'activity', action, ...serializeContext(context) }));
}

export function errorLog(message, context = {}) {
  console.error(JSON.stringify({ level: 'error', category: 'error', message, ...serializeContext(context) }));
}

export function securityLog(message, context = {}) {
  console.warn(JSON.stringify({ level: 'warn', category: 'security', message, ...serializeContext(context) }));
}
