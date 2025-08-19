document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if(username === "" || password === "") {
    alert("Please fill in all fields!");
    return;
  }

  alert(`Welcome, ${username}!`);
});
window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginForm').addEventListener('submit', function(e){
    // your code here
  });
});
// Simple "logged in" check
let isLoggedIn = false; // Change to true after actual login

// Get all destination boxes
const boxes = document.querySelectorAll('.destination-box');

boxes.forEach(box => {
  box.addEventListener('click', function() {
    if(!isLoggedIn) {
      // Redirect to login page
      window.location.href = "login.html";
    } else {
      // Redirect to the actual destination page
      const link = box.getAttribute('data-link');
      window.location.href = link;
    }
  });
});
