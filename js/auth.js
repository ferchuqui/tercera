import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCwvaLySCXwAT_gV9M1F8eGkDvg0rvK18Y",
    authDomain: "tt-8e7d7.firebaseapp.com",
    projectId: "tt-8e7d7",
    storageBucket: "tt-8e7d7.firebasestorage.app",
    messagingSenderId: "868474273264",
    appId: "1:868474273264:web:f5aeb0f97c08709c81f135",
    measurementId: "G-56T7E76SNS"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elemento contenedor para los formularios
const authContainer = document.getElementById('authContainer');

// Función para mostrar alertas
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type} alert-dismissible fade show`;
    alertBox.role = 'alert';
    alertBox.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertBox);

    // Elimina la alerta después de 5 segundos
    setTimeout(() => alertBox.remove(), 5000);
}

// Función para renderizar el formulario de inicio de sesión
function renderSignInForm() {
    authContainer.innerHTML = `
        <form id="signInForm">
            <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <p class="text-center mt-3">
            ¿No tienes cuenta? <button id="switchToRegister" class="btn btn-link">Regístrate</button>
        </p>
    `;

    document.getElementById('switchToRegister').addEventListener('click', renderRegisterForm);

    // Evento para manejar el inicio de sesión
    document.getElementById('signInForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    showAlert('Inicio de sesión exitoso', 'success');
                    console.log('Usuario autenticado:', user);
                } else {
                    showAlert('Tu correo electrónico no está verificado. Verifica tu correo o haz clic en el botón para reenviar.', 'warning');
                    renderVerificationResend(user);
                }
            })
            .catch((error) => {
                showAlert('Error al iniciar sesión. Verifica tus credenciales.', 'danger');
            });
    });
}

// Función para reenviar correo de verificación
function renderVerificationResend(user) {
    authContainer.innerHTML = `
        <p class="text-center mt-3">
            No has verificado tu correo. Por favor revisa tu bandeja de entrada o haz clic en el botón para reenviar el correo de verificación.
        </p>
        <button id="resendVerificationEmail" class="btn btn-warning w-100">Reenviar correo de verificación</button>
        <button id="backToSignIn" class="btn btn-link w-100 mt-3">Volver al inicio de sesión</button>
    `;

    document.getElementById('resendVerificationEmail').addEventListener('click', () => {
        sendEmailVerification(user)
            .then(() => {
                showAlert('Se ha enviado un nuevo correo de verificación. Por favor, revisa tu bandeja de entrada.', 'success');
            })
            .catch((error) => {
                showAlert(`Error al reenviar el correo: ${error.message}`, 'danger');
            });
    });

    document.getElementById('backToSignIn').addEventListener('click', renderSignInForm);
}

// Función para renderizar el formulario de registro
function renderRegisterForm() {
    authContainer.innerHTML = `
        <form id="registerForm">
            <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Registrar</button>
        </form>
        <p class="text-center mt-3">
            ¿Ya tienes cuenta? <button id="switchToSignIn" class="btn btn-link">Iniciar Sesión</button>
        </p>
    `;

    document.getElementById('switchToSignIn').addEventListener('click', renderSignInForm);

    // Evento para manejar el registro
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        showAlert('¡Usuario registrado con éxito! Se ha enviado un correo de verificación.', 'success');
                        renderSignInForm(); // Cambiar automáticamente al formulario de inicio de sesión
                    })
                    .catch((error) => {
                        showAlert(`Error al enviar el correo de verificación: ${error.message}`, 'danger');
                    });
            })
            .catch((error) => {
                showAlert(`Error: ${error.message}`, 'danger');
            });
    });
}

// Renderizar el formulario de inicio de sesión al cargar la página
renderSignInForm();
