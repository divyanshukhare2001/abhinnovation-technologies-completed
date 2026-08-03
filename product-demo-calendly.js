// product demo-book-code


document.addEventListener('DOMContentLoaded', () => {
  // Replace this with your actual Calendly URL link
  const CALENDLY_LINK = 'https://calendly.com/kharedivyanshu8/product-demo-call';

  const demoBtn = document.querySelectorAll('.demo-btn'); // ID of your header button
  const modal = document.querySelector('#demo-modal');
  const closeModal = document.querySelector('#close-modal');
  const demoForm = document.querySelector('#demo-form');
  const formStep = document.querySelector('#form-step');
  const calendarStep = document.querySelector('#calendar-step');

  // 1. Open Modal on Header Button Click
  if (demoBtn) {
    demoBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
    })
  }

  // 2. Close Modal Functions
  const handleClose = () => {
    modal.classList.remove('active');
    // Reset steps back to form when closed
    setTimeout(() => {
      formStep.style.display = 'block';
      calendarStep.style.display = 'none';
      demoForm.reset();
    }, 300);
  };

  closeModal.addEventListener('click', handleClose);
  
  // Close if user clicks outside the modal box
  window.addEventListener('click', (e) => {
    if (e.target === modal) handleClose();
  });

  // 3. Form Submit -> Inject Calendly Widget with User Data
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#user-name').value;
    const email = document.querySelector('#user-email').value;
    const product = document.querySelector('#product-select').value;
    const company = document.querySelector('#company-name').value || 'Not specified';

    // Hide Step 1 Form, Show Step 2 Calendar
    formStep.style.display = 'none';
    calendarStep.style.display = 'block';

    // Pass details directly into Calendly so user doesn't re-type them
    Calendly.initInlineWidget({
      url: CALENDLY_LINK,
      parentElement: document.getElementById('calendly-embed'),
      prefill: {
        name: name,
        email: email,
        customAnswers: {
          a1: `Product: ${product} | Company: ${company}` // Passes details to Calendly questions
        }
      }
    });
  });
});