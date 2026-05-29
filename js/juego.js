let score = 0;
let level = 1;
let speed = 1000;
let timeLeft = 30;

/* =========================
   ELEMENTOS
========================= */
const nameScreen = document.getElementById("nameScreen");
const nameInput = document.getElementById("nameInput");
const enterBtn = document.getElementById("enterBtn");
const start = document.getElementById("start");
const game = document.getElementById("game");
const over = document.getElementById("over");
const box = document.getElementById("box");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const timeText = document.getElementById("time");
const beep = document.getElementById("beep");
const bgMusic = document.getElementById("bgMusic");
const startBtn = document.getElementById("startBtn");
const globalRank = document.getElementById("globalRank");

/* =========================
   VARIABLES
========================= */
let timer;
let mover;
let playerName = "Player";

/* =========================
   INGRESAR NOMBRE
========================= */
enterBtn.addEventListener("click", () => {
    bgMusic.volume = 0.3;
    bgMusic.play()
    .then(() => {
        console.log("🎵 Música ON");
    })
    .catch(() => {
        console.log("Chrome bloqueó autoplay");
    });

    if(nameInput.value.trim() !== ""){
        playerName = nameInput.value.trim();
    }

    nameScreen.classList.add("hidden");
    start.classList.remove("hidden");
});

nameInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        enterBtn.click();
    }
});

function unlockAudio(){
    beep.play()
    .then(() => {
        beep.pause();
        beep.currentTime = 0;
    })
    .catch(() => {});
}

/* =========================
   START GAME
========================= */
startBtn.addEventListener("click", () => {
    unlockAudio();
    start.classList.add("hidden");
    game.classList.remove("hidden");
    startGame();
});

function startGame(){
    score = 0;
    level = 1;
    speed = 1000;
    timeLeft = 30;

    scoreText.textContent = score;
    levelText.textContent = level;
    timeText.textContent = timeLeft;

    moveBox();
    clearInterval(timer);
    timer = setInterval(updateTime, 1000);
}

/* =========================
   TIMER
========================= */
function updateTime(){
    timeLeft--;
    timeText.textContent = timeLeft;

    if(timeLeft <= 0){
        endGame();
    }
}

/* =========================
   MOVE BOX
========================= */
function moveBox(){
    const gameWidth = window.innerWidth - 100;
    const gameHeight = window.innerHeight - 220;

    const x = Math.random() * gameWidth;
    const y = Math.random() * gameHeight;

    box.style.left = x + "px";
    box.style.top = y + "px";

    mover = setTimeout(moveBox, speed);
}

/* =========================
   CLICK BOX
========================= */
box.onclick = () => {
    score++;
    scoreText.textContent = score;

    beep.currentTime = 0;
    beep.play().catch(() => {});

    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 150);

    if(score % 5 === 0){
        level++;
        levelText.textContent = level;
        if(speed > 250){
            speed -= 80;
        }
    }
};

/* =========================
   GAME OVER (GUARDAR RECORDS)
========================= */
function endGame(){
    clearInterval(timer);
    clearTimeout(mover);

    game.classList.add("hidden");
    over.classList.remove("hidden");

    document.getElementById("final").innerText = `${playerName} - ${score} puntos`;
    console.log("🔥 Guardando score usando Proxy...");

    const datosASalvar = {
        nombre: playerName,
        puntos: score
    };

    // 🚀 Cambiado con el Proxy para saltar el bloqueo de InfinityFree
    fetch("https://cors-anywhere.herokuapp.com/https://pruebasguzman.infinityfreeapp.com/api_save_score.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosASalvar)
    })
    .then(response => response.json())
    .then(data => {
        console.log("RESPUESTA GUARDADO:", data);
        loadRanking(); 
    })
    .catch(error => {
        console.log("ERROR AL GUARDAR:", error);
    });
}

/* =========================
   TOP 3 GLOBAL (CARGAR RANKING)
========================= */
function loadRanking(){
    console.log("🔄 Cargando ranking desde el servidor...");

    // 🚀 Cambiado con el Proxy apuntando a tu archivo real get_scores.php
    fetch("https://cors-anywhere.herokuapp.com/https://pruebasguzman.infinityfreeapp.com/get_scores.php")
    .then(response => response.json()) 
    .then(data => {
        console.log("Datos recibidos correctamente:", data);
        
        let html = "";
        data.forEach((r, index) => {
            html += `
            <li>
                🏆 ${index + 1}. ${r.nombre} - ${r.puntos} pts
            </li>
            `;
        });

        document.getElementById("rank").innerHTML = html;
        globalRank.innerHTML = html;
    })
    .catch(error => {
        console.log("ERROR AL CARGAR RANKING:", error);
    });
}

/* =========================
   EXIT
========================= */
function exitGame(){
    window.location.href = "index.html";
}

/* =========================
   PARTICULAS DE FONDO
========================= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i = 0; i < 80; i++){
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3,
        speed: Math.random() * 2 + 1
    });
}

function drawParticles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00fff2";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speed;

        if(p.y > canvas.height){
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* =========================
   EJECUCIÓN INICIAL
========================= */
loadRanking();
