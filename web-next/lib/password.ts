/**
 * At least one uppercase letter, one digit, one special character, 8+ chars.
 *
 * The Express API read this from `process.env.PASSWORD_REGEX` and then called
 * `.test()` on the resulting string, which is not a function — registration
 * threw every time. It lives in code now, and is shared by the client form and
 * the server so both agree on the rule.
 */
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

export const PASSWORD_MESSAGE =
  "Password must include at least one uppercase letter, one number, and one special character.";
