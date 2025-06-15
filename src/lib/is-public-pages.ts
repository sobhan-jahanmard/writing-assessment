export function isPublicPage(pathname: string) {
  if (pathname === "/") {
    return true;
  } else if (pathname.startsWith("/auth/login")) {
    return true;
  } else if (pathname.startsWith("/auth/signup")) {
    return true;
  } else if (pathname.startsWith("/error")) {
    return true;
  } else {
    return false;
  }
}
