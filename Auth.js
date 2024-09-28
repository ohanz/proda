// Import required libraries
const crypto = window.crypto || window.msCrypto;

// to be used booleans
let userSignedIn = false
let userSignedUp = false;
let hasErrors = false;
let signedUp = false;

// Function to hash password
function hashPassword(password) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  return crypto.subtle.digest('SHA-256', passwordBuffer).then((hash) => {
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  });
}

// Function to generate random salt
function generateSalt() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(salt, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// Store user data in local storage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Sign-in function
async function signIn() {
  // const email = document.getElementById('signInEmail').value;
  // const password = document.getElementById('signInPassword').value;
  // const hashedPassword = await hashPassword(password);
  // const user = users.find((u) => u.email === email && u.password === hashedPassword);
  // if (user) {
  //   localStorage.setItem('currentUser', JSON.stringify(user));
  //   document.getElementById('message').innerHTML = 'Signed in successfully!';
  //   // Show Sign-In Status Above.

  // } else {
  //   document.getElementById('message').innerHTML = 'Invalid credentials!';
  // }
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  // Find user by email
  const user = users.find((u) => u.email === email);

  if (!user) {
    message.innerHTML = 'Email not found!';
    return;
  }

  // Hash input password with stored salt
  const hashedPassword = await hashPassword(password + user.salt);

  // Check password match
  if (hashedPassword !== user.password) {
    message.innerHTML = 'Incorrect password!';
    return;
  }

  // Store current user in localStorage
  localStorage.setItem('currentUser', JSON.stringify(user));

  message.innerHTML = 'Signed in successfully!';
  // Call showSignInForm() or redirect to dashboard
  countdownTimer.innerHTML = 'Redirecting to Home in 10 seconds...';
    let countdown = 10;
    const intervalId = setInterval(() => {
      countdown--;
      countdownTimer.innerHTML = `Redirecting in ${countdown} seconds...`;
      if (countdown === 0) {
        clearInterval(intervalId);
        // Redirect to Order Confirmation page
        window.location.href = 'index.htm';
      }
    }, 1000);
}

// Sign-up function
// async function signUp() {
//   const email = document.getElementById('signUpEmail').value;
//   const password = document.getElementById('signUpPassword').value;
//   const confirmPassword = document.getElementById('confirmPassword').value;
//   if (password === confirmPassword) {
//     const salt = generateSalt();
//     const hashedPassword = await hashPassword(password + salt);
//     const user = { email, password: hashedPassword, salt };
//     users.push(user);
//     localStorage.setItem('users', JSON.stringify(users));
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     document.getElementById('message').innerHTML = 'Signed up successfully!';
//     showSignInForm(); // Now Sign-In and Be redirected to Last Page.

//   } else {
//     document.getElementById('message').innerHTML = 'Passwords do not match!';
//   }
// }
// Sign-up function
// async function signUp() {
//   if (hasErrors) return;

//   const email = document.getElementById('signUpEmail').value;
//   const password = document.getElementById('signUpPassword').value;
//   const confirmPassword = document.getElementById('confirmPassword').value;

//   const errors = validatePassword(password);
//   if (errors.length > 0) {
//     hasErrors = true;
//     const errorHTML = errors.map((error) => `<li>${error}</li>`).join('');
//     document.getElementById('message').innerHTML = `<ul>${errorHTML}</ul>`;
//     document.getElementById('message').className = 'error';
//     document.getElementById('signUpButton').disabled = true;
//     return;
//   }

//   if (password !== confirmPassword) {
//     hasErrors = true;
//     document.getElementById('message').innerHTML = 'Passwords do not match!';
//     document.getElementById('message').className = 'error';
//     // document.getElementById('signUpButton').disabled = true;
//     return;
//   }
  

//   const existingUser = users.find((u) => u.email === email);
//   if (existingUser) {
//     hasErrors = true;
//     document.getElementById('message').innerHTML = 'Email already in use!';
//     document.getElementById('message').className = 'error';
//     document.getElementById('signUpButton').disabled = true;
//     return;
//   }

//   const salt = generateSalt();
//   const hashedPassword = await hashPassword(password + salt);
//   const user = { email, password: hashedPassword, salt };

//   users.push(user);
//   localStorage.setItem('users', JSON.stringify(users));
//   localStorage.setItem('currentUser', JSON.stringify(user));
//   console.log('User added:', user); // Log user to console

//   document.getElementById('message').innerHTML = 'Signed up successfully!';
//   document.getElementById('message').className = 'success';
//   document.getElementById('signUpButton').disabled = false;

//   // setTimeout(() => {
//   //   showSignInForm();
//   // }, 5000); // Wait for 5 seconds
// }

const countdownTimer = document.getElementById('countdown-timer');
async function signUp() {
  const email = document.getElementById('signUpEmail').value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validate user input
  const errors = validatePassword(password);
  if (errors.length > 0) {
    message.innerHTML = 'Password requirements not met!';
    return;
  }

  if (password !== confirmPassword) {
    message.innerHTML = 'Passwords do not match!';
    return;
  }

  // Generate salt and hash password
  const salt = generateSalt();
  const hashedPassword = await hashPassword(password + salt);

  // Check for existing user
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    message.innerHTML = 'Email already in use!';
    return;
  }

  // Create new user object
  const user = { email, password: hashedPassword, salt };

  // Store user data in localStorage
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));

  message.innerHTML = 'Signed up successfully!';
  signedUp = true; // dont show sign-in again in toggle

}


// Get elements
const showSignUpFormLink = document.getElementById('showSignUpForm');
const showSignInFormLink = document.getElementById('showSignInForm');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');

// Add event listeners
showSignUpFormLink.addEventListener('click', showSignUpForm);
showSignInFormLink.addEventListener('click', showSignInForm);

// Functions to toggle forms
function showSignUpForm() {
  signInForm.style.display = 'none';
  signUpForm.style.display = 'block';
}

function showSignInForm() {
  // if(!signedUp){
  //   setTimeout(() => {
  //     signInForm.style.display = 'block';
  //     signUpForm.style.display = 'none';
  // }, 5000); // Wait for 5 seconds 
  // }
  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
 
}

function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least 1 uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least 1 lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least 1 number');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain at least 1 special character');
    }
    return errors;
  }

  const passwordInput = document.getElementById('signUpPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  // Add event listeners
  passwordInput.addEventListener('input', checkPasswordsMatch);
  confirmPasswordInput.addEventListener('input', checkPasswordsMatch);
  
  // Function to check passwords match
  function checkPasswordsMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
  
    if (password !== confirmPassword) {
      document.getElementById('password-match-error').innerHTML = 'Passwords do not match!';
      document.getElementById('signUpButton').disabled = true;
    } else {
      document.getElementById('password-match-error').innerHTML = '';
      document.getElementById('signUpButton').disabled = false;
    }
  }
  
  

  
// passwordInput.addEventListener('input', () => {
//   const password = passwordInput.value;
//   const errors = validatePassword(password);
//   if (errors.length > 0) {
//     // Display errors
//     console.log(errors)
//     console.log('error occured')
//   } else {
//     // Password is valid
//     console.log('Strong Password')
//   }
// });
// passwordInput.addEventListener('input', () => {
//   const password = passwordInput.value;
//   const errors = validatePassword(password);

//   if (errors.length > 0) {
//     hasErrors = true;
//     const errorHTML = errors.map((error) => `<li>${error}</li>`).join('');
//     document.getElementById('message').innerHTML = `<ul>${errorHTML}</ul>`;
//     document.getElementById('message').className = 'error';
//     document.getElementById('signUpButton').disabled = true;
//   } else {
//     hasErrors = false;
//     document.getElementById('message').innerHTML = '';
//     document.getElementById('message').className = '';
//     document.getElementById('signUpButton').disabled = false;
//   }
// });

// // Toggle forms
// function showSignInForm() {
//   document.getElementById('signInForm').style.display = 'block';
//   document.getElementById('signUpForm').style.display = 'none';
// }

// function showSignUpForm() {
//   document.getElementById('signInForm').style.display = 'none';
//   document.getElementById('signUpForm').style.display = 'block';
// }

// // Add event listeners
// document.getElementById('signInButton').addEventListener('click', signIn);
// Add event listener
signInForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission
  signIn(); // Call signIn function
});
document.getElementById('signUpButton').addEventListener('click', signUp);
// document.getElementById('showSignInForm').addEventListener('click', showSignInForm);