import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/hehehe"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
