// tests/extensionless-resolve.mjs — resolver hook, test-only. See loader.mjs.
//
// Try "./thing.js" when the code asked for "./thing", then fall back to Node's
// default behaviour so real resolution errors still surface as themselves.

const HAS_EXTENSION = /\.[cm]?[jt]sx?$/i;

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") && !HAS_EXTENSION.test(specifier)) {
    try {
      return await nextResolve(`${specifier}.js`, context);
    } catch {
      // Fall through: report the original specifier, not the invented one.
    }
  }
  return nextResolve(specifier, context);
}
