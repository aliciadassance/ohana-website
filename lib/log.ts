type LogFields = Record<string, string | number | boolean | null | undefined>

function emit(level: 'info' | 'warn' | 'error', route: string, msg: string, fields?: LogFields) {
  const payload = {
    t: new Date().toISOString(),
    lvl: level,
    route,
    msg,
    ...fields,
  }
  const line = JSON.stringify(payload)
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

export function logger(route: string) {
  return {
    info: (msg: string, fields?: LogFields) => emit('info', route, msg, fields),
    warn: (msg: string, fields?: LogFields) => emit('warn', route, msg, fields),
    error: (msg: string, fields?: LogFields) => emit('error', route, msg, fields),
  }
}
