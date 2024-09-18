export function isStrongPassword(
  password: string,
  firstName: string,
  lastName: string
): boolean {
  // Define regular expressions to check for different criteria
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
  const isLengthValid = password.length >= 8; // Adjust the length as needed

  // Check if the password contains the user's first name and last name
  const containsFirstName = password
    .toLowerCase()
    .includes(firstName.toLowerCase());
  const containsLastName = password
    .toLowerCase()
    .includes(lastName.toLowerCase());

  // Check all criteria and return true if all are met and the password doesn't contain the first name or last name
  return (
    hasUppercase &&
    hasLowercase &&
    hasDigit &&
    hasSpecialChar &&
    isLengthValid &&
    !containsFirstName &&
    !containsLastName
  );
}

// Example usage
// const password = 'bPress@123';
// const firstName = 'Burhan';
// const lastName = 'Press';
// const isStrong = isStrongPassword(password, firstName, lastName);

// if (isStrong) {
//   console.log('Password is strong!');
// } else {
//   console.log('Password is not strong enough.');
// }
