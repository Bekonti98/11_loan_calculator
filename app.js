// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide Results
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
  // UI Vars
  const UI_amount = document.getElementById('amount');
  const UI_interest = document.getElementById('interest');
  const UI_years = document.getElementById('years');
  const UI_monthlyPayment = document.getElementById('monthly-payment');
  const UI_totalPayment = document.getElementById('total-payment');
  const UI_totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(UI_amount.value);
  const calculatedInterest = parseFloat(UI_interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UI_years.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UI_monthlyPayment.value = monthly.toFixed(2);
    UI_totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UI_totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers!');
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide Loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3s
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}