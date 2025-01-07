"use server";

import { unstable_expireTag as expireTag } from "next/cache";

export async function refreshAgents() {
  expireTag("items");
}
