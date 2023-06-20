document.addEventListener('DOMContentLoaded', () => {
const formRegistro = document.getElementById('form-registro');

formRegistro.addEventListener('submit', (event) => {
  event.preventDefault();
  const usuarioInput = document.getElementById('usuario');
  const nickInput = document.getElementById('nick');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const dtNascimentoInput = document.getElementById('dtnascimento');

  const usuario = usuarioInput.value.trim();
  const nick = nickInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  const dtNascimento = dtNascimentoInput.value;

  const formData = new FormData();
  formData.append('usuario', usuario);
  formData.append('nick', nick);
  formData.append('email', email);
  formData.append('password', senha); // Alterado para 'password'
  formData.append('dtNascimento', dtNascimento);

  fetch('http://localhost:3000/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
});
});
