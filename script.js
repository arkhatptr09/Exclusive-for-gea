const heartWrapper = document.getElementById("heart-wrapper");
const face = document.getElementById("face");
const memoryPage = document.getElementById("memoryPage");

let clickCount = 0;
let currentScale = 1;

const expression = {

  sad: "assets/sad.png",
  blink: "assets/blink.png",
  happy: "assets/happy.png",
  veryhappy: "assets/veryhappy.png"

};

heartWrapper.classList.add("pumping");

/* ==========================
   MODE IDLE
========================== */

let idleMode = true;

let idleAnimation = setInterval(() => {

  if (!idleMode) return;

  const currentFace = face.src;

  if (currentFace.includes("sad.png")) {

    face.src = expression.blink;

  } else {

    face.src = expression.sad;

  }

}, 3000);

/* ==========================
   CLICK LOVE
========================== */

heartWrapper.addEventListener("click", () => {

  clickCount++;

  idleMode = false;

  heartWrapper.classList.remove("pumping");

  if (clickCount % 2 === 1) {

    face.src = expression.happy;

  } else {

    face.src = expression.veryhappy;

  }

  currentScale += 0.07;

  heartWrapper.style.transform =
    `scale(${currentScale})`;

  createMiniHeartBurst();

  if (clickCount >= 10) {

    explodeHeart();
  }

});

/* ==========================
   MINI EFFECT
========================== */

function createMiniHeartBurst() {

  for(let i=0;i<8;i++){

    const p = document.createElement("div");

    p.classList.add("particle");

    p.style.left =
      window.innerWidth/2 + "px";

    p.style.top =
      window.innerHeight/2 + "px";

    document.body.appendChild(p);

    const x =
      (Math.random()-0.5)*250;

    const y =
      (Math.random()-0.5)*250;

    p.animate(
      [
        {
          transform:"translate(0,0)",
          opacity:1
        },

        {
          transform:`translate(${x}px,${y}px)`,
          opacity:0
        }

      ],
      {
        duration:900
      }
    );

    setTimeout(()=>{
      p.remove();
    },900);

  }

}

/* ==========================
   LOVE EXPLOSION
========================== */

function explodeHeart(){

  clearInterval(idleAnimation);

  heartWrapper.classList.add("explode");

  createExplosionParticles();

  setTimeout(()=>{

    document.getElementById("scene")
    .style.display = "none";

    memoryPage.classList.remove("hidden");

  },3000);

}

/* ==========================
   PARTICLE EXPLOSION
========================== */

function createExplosionParticles(){

  for(let i=0;i<100;i++){

    const particle =
    document.createElement("div");

    particle.className =
    "particle";

    particle.style.left =
    window.innerWidth/2+"px";

    particle.style.top =
    window.innerHeight/2+"px";

    document.body.appendChild(particle);

    const moveX =
    (Math.random()-0.5)*1500;

    const moveY =
    (Math.random()-0.5)*1500;

    const rotate =
    Math.random()*1080;

    particle.animate(

      [

        {
          transform:
          "translate(0,0) rotate(0deg)",
          opacity:1
        },

        {
          transform:
          `translate(${moveX}px,${moveY}px)
          rotate(${rotate}deg)`,

          opacity:0
        }

      ],

      {
        duration:3000,
        easing:"ease-out"
      }

    );

    setTimeout(()=>{

      particle.remove();

    },3000);

  }

}
