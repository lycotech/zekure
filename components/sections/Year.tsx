import { cacheLife } from "next/cache";

/** Current year computed in code; cached for a day so the page stays static. */
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
