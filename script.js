const form = document.getElementById('regForm');
const cardsContainer = document.getElementById('cards');
const tableBody = document.querySelector('#summary tbody');
let profileId = 0;

form.addEventListener('submit', function(e){
  e.preventDefault();

  // Clear previous error messages
  document.querySelectorAll('.error').forEach(err => err.textContent = '');
  document.getElementById('live').textContent = '';

  const first = document.getElementById('first').value.trim();
  const last = document.getElementById('last').value.trim();
  const email = document.getElementById('email').value.trim();
  const prog = document.getElementById('prog').value.trim();
  const year = document.getElementById('year').value;
  const interests = document.getElementById('interests').value.trim();
  const photo = document.getElementById('photo').value.trim() || "https://placehold.co/100";

  let valid = true;

  // Inline validation
  if(!first){ document.getElementById('firstError').textContent = "First name is required."; valid = false; }
  if(!last){ document.getElementById('lastError').textContent = "Last name is required."; valid = false; }
  if(!email){ 
    document.getElementById('emailError').textContent = "Email is required."; 
    valid = false; 
  } else if(!/\S+@\S+\.\S+/.test(email)){
    document.getElementById('emailError').textContent = "Email format is invalid."; 
    valid = false;
  }
  if(!prog){ document.getElementById('progError').textContent = "Programme is required."; valid = false; }
  if(!year){ document.getElementById('yearError').textContent = "Select a year."; valid = false; }

  if(!valid){
    document.getElementById('live').textContent = "Please fix errors above.";
    return;
  }

  profileId++;

  // Create card
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = profileId;
  card.innerHTML = `
    <img src="${photo}" alt="${first} ${last}">
    <h2>${first} ${last}</h2>
    <p class="course">${prog} - Year ${year}</p>
    <p>${interests || "No interests listed"}</p>
    <button class="remove">Remove</button>
  `;
  cardsContainer.appendChild(card);

  // Create table row
  const row = document.createElement('tr');
  row.dataset.id = profileId;
  row.innerHTML = `
    <td>${first} ${last}</td>
    <td>${prog}</td>
    <td>${year}</td>
    <td>${interests || "None"}</td>
    <td><button class="remove">Remove</button></td>
  `;
  tableBody.appendChild(row);

  // Remove buttons
  const cardBtn = card.querySelector('.remove');
  const rowBtn = row.querySelector('.remove');
  cardBtn.addEventListener('click', () => removeProfile(profileId));
  rowBtn.addEventListener('click', () => removeProfile(profileId));

  form.reset();
  document.getElementById('live').textContent = "Student added successfully!";
});

// Remove function
function removeProfile(id){
  const card = document.querySelector(`.card[data-id='${id}']`);
  const row = document.querySelector(`tr[data-id='${id}']`);
  if(card) card.remove();
  if(row) row.remove();
}
