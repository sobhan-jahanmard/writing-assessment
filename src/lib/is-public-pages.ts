export function isPublicPage(pathname: string) {
  if (
    pathname === "/" ||
    ["/auth/login", "/auth/signup", "error", "/api/assess"]?.some((item) =>
      pathname.startsWith(item)
    )
  ) {
    return true;
  } else {
    return false;
  }
}
