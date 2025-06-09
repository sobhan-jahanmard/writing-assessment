export function isPublicPage(pathname: string) {
  if (pathname === "/") {
    return true;
  } else if (pathname.startsWith("/login")) {
    return true;
  } else if (pathname.startsWith("/auth")) {
    return true;
  } else if (pathname.startsWith("/error")) {
    return true;
  } else {
    return false;
  }
}
