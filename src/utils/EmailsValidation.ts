const emailValidationRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?<![0-9])$/;

export function validateEmails(email1: string, email2: string): boolean {
  const isValidEmail = (email: string) => emailValidationRegex.test(email);

  if (!email1 && !email2) {
    // Both emails are empty strings
    return false;
  } else if (
    (!isValidEmail(email1) && email1 !== "") ||
    (!isValidEmail(email2) && email2 !== "")
  ) {
    // At least one email is invalid and not an empty string
    return false;
  } else {
    // Both emails are either valid or one is valid and the other is an empty string
    return true;
  }
}
