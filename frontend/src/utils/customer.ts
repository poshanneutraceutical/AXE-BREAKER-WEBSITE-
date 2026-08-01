import { v4 as uuid } from "uuid";

export function getCustomerId(): string {
  let customerId = localStorage.getItem("customerId");

  if (!customerId) {
    customerId = `guest-${uuid()}`;
    localStorage.setItem("customerId", customerId);
  }

  return customerId;
}