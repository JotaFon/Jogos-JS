const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Envia uma solicitação POST para a rota de login no servidor backend
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (response.ok) {
        // Login bem-sucedido
        alert('Login bem-sucedido!');
      } else if (response.status === 401) {
        // Credenciais inválidas
        alert('Credenciais inválidas.');
      } else {
        // Erro ao processar o login
        alert('Erro ao processar o login.');
      }
    })
    .catch(error => {
      console.error('Erro ao processar o login:', error);
      alert('Erro ao processar o login.');
    });
});
