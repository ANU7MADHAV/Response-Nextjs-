export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/response/:id+", "/response/new", "/response/:id/edit"],
};
