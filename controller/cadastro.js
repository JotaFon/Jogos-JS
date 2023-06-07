function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;
    //pegar o campo do email
    // ela da uma zapiada se o email ta vazio ou nao e se e valido
    //tando tudo ok ela vai habilitar o botao
    //caso nao esteja ele vai deixa o botao de recuperar senha ativado
    //pode fala jota o pai deita explicando

}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
