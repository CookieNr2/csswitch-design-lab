/**
 * At least one uppercase letter, one digit, one special character, 8+ chars.
 * Shared by the client form and the server so both enforce the same rule.
 */
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

export const PASSWORD_MESSAGE =
  "Password must include at least one uppercase letter, one number, and one special character.";
