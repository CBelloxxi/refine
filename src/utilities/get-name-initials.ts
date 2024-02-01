export const getNameInitials = (name: string, count = 2) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const filtered = initials.replace(/[^a-zA-Z]/g, "");
  return filtered.slice(0, count).toUpperCase();
};

// Create a function that gets initials from a name

const fullName = "John Doe";
const initials = getNameInitials(fullName); // Default count is 2
console.log(initials); // Output: "JD"

// You can also provide a custom count
const customCountInitials = getNameInitials(fullName, 3);
console.log(customCountInitials); // Output: "JDO"
