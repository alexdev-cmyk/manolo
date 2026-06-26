document.addEventListener('DOMContentLoaded', function() {
    // ================= PASSWORD =================
    const passwordModal = document.getElementById('passwordModal');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');

    submitPassword.addEventListener('click', function() {
        if (passwordInput.value.toLowerCase() === 'manolo') {
            passwordModal.style.opacity = '0';
            setTimeout(() => {
                passwordModal.style.display = 'none';
                welcomeScreen.style.display = 'flex';

                setTimeout(() => {
                    welcomeScreen.style.opacity = '0';
                    setTimeout(() => {
                        welcomeScreen.style.display = 'none';
                        mainContent.style.display = 'block';
                    }, 800);
                }, 2500);
            }, 500);
        } else {
            passwordInput.value = '';
            passwordInput.placeholder = 'Try again, my love...';
            passwordInput.style.borderColor = '#ff4d4d';
            setTimeout(() => {
                passwordInput.style.borderColor = '#ffb7c5';
                passwordInput.placeholder = 'Our special word...';
            }, 1500);
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') submitPassword.click();
    });

    // ================= TABS =================
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) content.classList.add('active');
            });
        });
    });

    // ================= LOVE LETTER =================
    const loveLetter = document.getElementById('loveLetter');
    loveLetter.addEventListener('click', () => {
        loveLetter.classList.toggle('expanded');
    });

    // ================= MUSIC PLAYER =================
    let currentAudio = null;
    let currentDisco = null;

    document.querySelectorAll('.song').forEach(song => {

        const audio = song.querySelector('.audio');
        const playBtn = song.querySelector('.play-btn');
        const pauseBtn = song.querySelector('.pause-btn');
        const backBtn = song.querySelector('.back');
        const forwardBtn = song.querySelector('.forward');
        const disco = song.querySelector('.disco');

        // ▶ PLAY
        playBtn.addEventListener('click', () => {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;

                if (currentDisco) {
                    currentDisco.classList.remove('playing');
                    currentDisco.classList.add('stopping');

                    setTimeout(() => {
                        currentDisco.classList.remove('stopping');
                    }, 800);
                }
            }

            audio.play();
            disco.classList.remove('stopping');
            disco.classList.add('playing');

            currentAudio = audio;
            currentDisco = disco;
        });

        // ⏸ PAUSE (GIRO SUAVE)
        pauseBtn.addEventListener('click', () => {
            audio.pause();

            disco.classList.remove('playing');
            disco.classList.add('stopping');

            setTimeout(() => {
                disco.classList.remove('stopping');
            }, 800);
        });

        // ⏪ BACK 10s
        backBtn.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        });

        // ⏩ FORWARD 10s
        forwardBtn.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        });

        // 🎵 END
        audio.addEventListener('ended', () => {
            disco.classList.remove('playing');
            disco.classList.remove('stopping');

            if (currentAudio === audio) {
                currentAudio = null;
                currentDisco = null;
            }
        });
    });
});
// ================= DRAWING LETTER =================
const drawingLetter = document.getElementById('drawingLetter');

drawingLetter.addEventListener('click', (e) => {

    // Evita que al dar click en el botón de descargar
    // se vuelva a cerrar la carta
    if(e.target.classList.contains('download-btn')){
        return;
    }

    drawingLetter.classList.toggle('expanded');

});
// ================= FORZAR DESCARGA DEL DIBUJO =================
const downloadBtn = document.querySelector('.download-btn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el comportamiento por defecto de abrir la imagen
        
        const imageUrl = this.getAttribute('href');
        const fileName = this.getAttribute('download') || 'dibujo.jpg';
        
        // Hacemos una petición para obtener la imagen como un Blob
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                // Creamos un enlace temporal en memoria
                const blobUrl = URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.href = blobUrl;
                tempLink.download = fileName;
                
                // Añadimos el enlace al documento, lo clickeamos y lo removemos
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                
                // Liberamos la memoria del objeto URL
                URL.revokeObjectURL(blobUrl);
            })
            .catch(error => {
                console.error('Error al descargar la imagen:', error);
                // Si falla por seguridad estricta, abre la imagen en otra pestaña como respaldo
                window.open(imageUrl, '_blank');
            });
    });
}