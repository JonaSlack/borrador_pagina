// ELEMENTOS
const correoLogin = document.getElementById("correoLogin");
const claveLogin = document.getElementById("claveLogin");
const errorCorreoLogin = document.getElementById("errorCorreoLogin");
const errorClaveLogin = document.getElementById("errorClaveLogin");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const resultadoLogin = document.getElementById("resultadoLogin");
const mostrarClave = document.getElementById("mostrarClave");
const recordarSesion = document.getElementById("recordarSesion");

// CUENTA DEMO
const USUARIO_DEMO = "demo@levelupstore.cl";
const CLAVE_DEMO = "1234";

// MOSTRAR / OCULTAR CONTRASEÑA
mostrarClave.addEventListener("change", function () {
    claveLogin.type = mostrarClave.checked ? "text" : "password";
});

// LIMPIAR ERRORES
function limpiarErrores() {
    errorCorreoLogin.textContent = "";
    errorClaveLogin.textContent = "";
    resultadoLogin.textContent = "";
}

// VALIDAR CORREO
function validarCorreo() {
    const correo = correoLogin.value.trim();

    if (correo === "") {
        errorCorreoLogin.textContent =
            "Debes ingresar tu correo electrónico.";
        return false;
    }

    if (!correo.includes("@")) {
        errorCorreoLogin.textContent =
            "Ingresa un correo electrónico válido.";
        return false;
    }

    return true;
}

// VALIDAR CONTRASEÑA
function validarClave() {
    const clave = claveLogin.value;

    // Solo comprobamos que no esté vacía
    if (clave.trim() === "") {
        errorClaveLogin.textContent =
            "Debes ingresar tu contraseña.";
        return false;
    }

    return true;
}

// INICIAR SESIÓN
btnIniciarSesion.addEventListener("click", function () {

    limpiarErrores();

    const correoValido = validarCorreo();
    const claveValida = validarClave();

    if (!correoValido || !claveValida) {
        resultadoLogin.textContent =
            "Revisa los datos ingresados.";
        return;
    }

    const correo = correoLogin.value.trim();
    const clave = claveLogin.value;

    if (
        correo === USUARIO_DEMO &&
        clave === CLAVE_DEMO
    ) {
        resultadoLogin.textContent =
            "✅ Inicio de sesión correcto.";

        const usuario = {
            correo: correo,
            conectado: true
        };

        if (recordarSesion.checked) {
            localStorage.setItem(
                "usuarioLevelUp",
                JSON.stringify(usuario)
            );
        } else {
            sessionStorage.setItem(
                "usuarioLevelUp",
                JSON.stringify(usuario)
            );
        }

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);

    } else {
        resultadoLogin.textContent =
            "❌ Correo o contraseña incorrectos.";
    }
});

// PERMITIR ENTER
correoLogin.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        btnIniciarSesion.click();
    }
});

claveLogin.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        btnIniciarSesion.click();
    }
});
