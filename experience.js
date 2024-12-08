// Adding interactivity with JavaScript
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.style.backgroundColor = '#f0f4ff';
  });

  card.addEventListener('mouseout', () => {
    card.style.backgroundColor = '#ffffff';
  });
});

document.querySelectorAll('[data-bs-toggle="collapse"]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.getAttribute('data-bs-target'));
    if (target.classList.contains('show')) {
      btn.textContent = 'View Bio';
    } else {
      btn.textContent = 'Hide Bio';
    }
  });
});
