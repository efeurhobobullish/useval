export const normalizePhone = (phone) => {
  if (!phone) return null;

  let p = phone.replace(/\s+/g, "").trim();

  // Remove +
  if (p.startsWith("+")) {
    p = p.slice(1);
  }

  // Convert 0xxxxxxxxxx → 234xxxxxxxxxx
  if (p.startsWith("0")) {
    p = "234" + p.slice(1);
  }

  // Must be 234 + 10 digits
  if (!/^234\d{10}$/.test(p)) {
    return null;
  }

  return p;
};