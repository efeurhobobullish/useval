export const getFirstName = (fullName: string) => {
  if (!fullName) return "";
  return fullName.trim().split(" ")[0];
};
