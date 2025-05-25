export function isPublicPage(pathname: string) {
  if (pathname === "/") {
    return true;
  } else if (pathname.startsWith("/login")) {
    return true;
  } else if (pathname.startsWith("/auth")) {
    return true;
  } else {
    return false;
  }
}
