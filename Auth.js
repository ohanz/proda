// Import required libraries
const crypto = window.crypto || window.msCrypto;

// to be used booleans
let userSignedIn = false
let userSignedUp = false;

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
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;
  const hashedPassword = await hashPassword(password);
  const user = users.find((u) => u.email === email && u.password === hashedPassword);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.getElementById('message').innerHTML = 'Signed in successfully!';
    // Show Sign-In Status Above.

  } else {
    document.getElementById('message').innerHTML = 'Invalid credentials!';
  }
}

// Sign-up function
async function signUp() {
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password === confirmPassword) {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password + salt);
    const user = { email, password: hashedPassword, salt };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.getElementById('message').innerHTML = 'Signed up successfully!';
    showSignInForm(); // Now Sign-In and Be redirected to Last Page.
    
  } else {
    document.getElementById('message').innerHTML = 'Passwords do not match!';
  }
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
  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
}

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
// document.getElementById('signUpButton').addEventListener('click', signUp);
// document.getElementById('showSignInForm').addEventListener('click', showSignInForm);