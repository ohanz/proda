// Import required libraries
const crypto = window.crypto || window.msCrypto;

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
    showSignInForm();
  } else {
    document.getElementById('message').innerHTML = 'Passwords do not match!';
  }
}

// Toggle forms
function showSignInForm() {
  document.getElementById('signInForm').style.display = 'block';
  document.getElementById('signUpForm').style.display = 'none';
}

function showSignUpForm() {
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('signUpForm').style.display = 'block';
}

// Add event listeners
document.getElementById('signInButton').addEventListener('click', signIn);
document.getElementById('signUpButton').addEventListener('click', signUp);
document.getElementById('showSignInForm').addEventListener('click', showSignInForm);