// ================= MENU =================
function toggleMenu() {
  const menu = document.getElementById("menu");
  const toggle = document.querySelector(".menu-toggle");

  if (!menu) return;

  menu.classList.toggle("active");
  document.body.classList.toggle("menu-open", menu.classList.contains("active"));

  if (toggle) {
    toggle.classList.toggle("active", menu.classList.contains("active"));
  }
}

function closeMenu() {
  const menu = document.getElementById("menu");
  const toggle = document.querySelector(".menu-toggle");

  if (menu) menu.classList.remove("active");
  if (toggle) toggle.classList.remove("active");

  document.body.classList.remove("menu-open");
}

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;


// ================= STEPS =================
window.showStep = function (step) {
  const contents = document.querySelectorAll(".step-content");
  const boxes = document.querySelectorAll(".step-box");

  if (!contents.length || !boxes.length) return;

  contents.forEach(el => el.classList.remove("active"));
  boxes.forEach(el => el.classList.remove("active"));

  const selectedContent = document.getElementById("step-content-" + step);
  const selectedBox = boxes[step - 1];

  if (selectedContent) selectedContent.classList.add("active");
  if (selectedBox) selectedBox.classList.add("active");
};


// ================= PAGE INIT =================
document.addEventListener("DOMContentLoaded", () => {

  const transition = document.querySelector(".page-transition");

  // PAGE ENTER
  if (transition && typeof gsap !== "undefined") {
    gsap.to(transition, {
      scaleY: 0,
      duration: 0.7,
      ease: "power4.out",
      transformOrigin: "bottom"
    });
  }

  // LINK TRANSITION
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    if (link.closest("#menu")) return;
    if (!href || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("tel")) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (transition && typeof gsap !== "undefined") {
        gsap.to(transition, {
          scaleY: 1,
          duration: 0.6,
          ease: "power4.in",
          onComplete: () => {
            window.location.href = href;
          }
        });
      } else {
        window.location.href = href;
      }
    });
  });

  // CLOSE MENU BUTTON
  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  window.addEventListener("pageshow", closeMenu);


  // ================= MOBILE MENU ACCORDION =================
  const menuTitles = document.querySelectorAll(".menu-title");

  menuTitles.forEach(title => {
    title.addEventListener("click", function () {
      const column = title.closest(".menu-column");
      if (!column) return;

      document.querySelectorAll(".menu-column").forEach(item => {
        if (item !== column) item.classList.remove("active");
      });

      column.classList.toggle("active");
    });
  });


  // ================= CURSOR GLOW =================
  const glow = document.querySelector(".cursor-glow");

  if (glow) {
    document.addEventListener("mousemove", (e) => {
      if (typeof gsap !== "undefined") {
        gsap.to(glow, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.25
        });
      } else {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }

      glow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });
  }


  // ================= IN THIS SECTION SLIDE PANEL =================
  const sectionTab = document.querySelector(".section-tab");
  const sectionPanel = document.querySelector(".section-panel-slide");

  if (sectionTab && sectionPanel) {
    sectionTab.addEventListener("click", (e) => {
      e.stopPropagation();
      sectionPanel.classList.toggle("open");
      sectionTab.classList.toggle("active");
    });

    sectionPanel.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      sectionPanel.classList.remove("open");
      sectionTab.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        sectionPanel.classList.remove("open");
        sectionTab.classList.remove("active");
      }
    });
  }


  // ================= INFINITE FULLSCREEN SLIDER =================
  const slidesContainer = document.querySelector(".slides");
  const prevBtn = document.querySelector(".arrow.left");
  const nextBtn = document.querySelector(".arrow.right");

  if (slidesContainer && prevBtn && nextBtn) {
    let slides = document.querySelectorAll(".slide");

    if (slides.length > 1) {
      const firstClone = slides[0].cloneNode(true);
      const lastClone = slides[slides.length - 1].cloneNode(true);

      slidesContainer.appendChild(firstClone);
      slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

      slides = document.querySelectorAll(".slide");

      let index = 1;
      const totalSlides = slides.length;

      slidesContainer.style.transform = `translateX(-${index * 100}%)`;

      function updateSlider() {
        slidesContainer.style.transition = "transform 0.8s ease-in-out";
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      }

      nextBtn.addEventListener("click", () => {
        if (index >= totalSlides - 1) return;
        index++;
        updateSlider();
      });

      prevBtn.addEventListener("click", () => {
        if (index <= 0) return;
        index--;
        updateSlider();
      });

      slidesContainer.addEventListener("transitionend", () => {
        if (slides[index].isSameNode(firstClone)) {
          slidesContainer.style.transition = "none";
          index = 1;
          slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }

        if (slides[index].isSameNode(lastClone)) {
          slidesContainer.style.transition = "none";
          index = totalSlides - 2;
          slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }
      });
    }
  }

  renderOutdoorSlider();
});


// ================= ACADEMIC INTRO REVEAL =================
function revealIntro() {
  const overlay = document.getElementById("introOverlay");
  if (overlay) overlay.classList.add("hide");
}
window.revealIntro = revealIntro;


// ================= HOME INTRO UNCOVER =================
window.uncoverIntro = function () {
  const cover = document.getElementById("introCover");

  if (!cover) {
    console.log("introCover not found");
    return;
  }

  cover.classList.add("hide");
};


// ================= BOARDING UNCOVER =================
function uncoverBoarding() {
  const overlay = document.getElementById("boardingOverlay");
  if (overlay) overlay.classList.add("hide");
}
window.uncoverBoarding = uncoverBoarding;


// ================= CO-CURRICULAR UNCOVER =================
function uncoverCo() {
  const overlay = document.getElementById("cocurricularOverlay");
  if (overlay) overlay.classList.add("hide");
}
window.uncoverCo = uncoverCo;


// ================= BOARDING ROOM SLIDER =================
const roomSlides = [
  "images/boarding-room.jpg",
  "images/boarding-room2.jpg",
  "images/boarding-room3.jpg"
];

let roomIndex = 0;

function changeRoomSlide(direction) {
  const image = document.getElementById("houseRoomImage");
  if (!image) return;

  roomIndex += direction;

  if (roomIndex < 0) roomIndex = roomSlides.length - 1;
  if (roomIndex >= roomSlides.length) roomIndex = 0;

  image.style.opacity = "0";

  setTimeout(() => {
    image.src = roomSlides[roomIndex];
    image.style.opacity = "1";
  }, 250);
}
window.changeRoomSlide = changeRoomSlide;


// ================= BOARDING HOUSE IMAGE OPEN =================
function openHouseImage(button) {
  const card = button.closest(".house-small");
  if (!card) return;

  card.classList.toggle("show");
  button.textContent = card.classList.contains("show") ? "−" : "+";
}
window.openHouseImage = openHouseImage;


// ================= LEADERSHIP SLIDER =================
let currentLeader = 0;

function changeLeader(direction) {
  const cards = document.querySelectorAll(".leader-card");
  const messages = document.querySelectorAll(".leader-message");

  if (!cards.length || !messages.length) return;

  cards[currentLeader].classList.remove("active");
  messages[currentLeader].classList.remove("active");

  currentLeader += direction;

  if (currentLeader < 0) currentLeader = cards.length - 1;
  if (currentLeader >= cards.length) currentLeader = 0;

  cards[currentLeader].classList.add("active");
  messages[currentLeader].classList.add("active");
}
window.changeLeader = changeLeader;


// ================= TEAM SLIDER INFINITE LOOP =================

let teamIndex = 1;
let teamTrack;
let teamSlides;
let isTeamSliding = false;

document.addEventListener("DOMContentLoaded", () => {
  teamTrack = document.querySelector(".team-slides");

  if (!teamTrack) return;

  const originalSlides = Array.from(document.querySelectorAll(".team-slide"));

  if (originalSlides.length === 0) return;

  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  teamTrack.appendChild(firstClone);
  teamTrack.insertBefore(lastClone, originalSlides[0]);

  teamSlides = document.querySelectorAll(".team-slide");

  teamTrack.style.transition = "none";
  teamTrack.style.transform = `translateX(-${teamIndex * 100}%)`;

  setTimeout(() => {
    teamTrack.style.transition = "transform 0.6s ease";
  }, 50);
});

function moveTeamSlider() {
  if (!teamTrack || isTeamSliding) return;

  isTeamSliding = true;
  teamTrack.style.transition = "transform 0.6s ease";
  teamTrack.style.transform = `translateX(-${teamIndex * 100}%)`;
}

function nextTeamSlide() {
  if (!teamTrack || isTeamSliding) return;

  teamIndex++;
  moveTeamSlider();
}

function prevTeamSlide() {
  if (!teamTrack || isTeamSliding) return;

  teamIndex--;
  moveTeamSlider();
}

document.addEventListener("transitionend", (e) => {
  if (!teamTrack || e.target !== teamTrack) return;

  teamSlides = document.querySelectorAll(".team-slide");

  if (teamSlides[teamIndex].classList.contains("clone")) {
    teamTrack.style.transition = "none";

    if (teamIndex === teamSlides.length - 1) {
      teamIndex = 1;
    }

    if (teamIndex === 0) {
      teamIndex = teamSlides.length - 2;
    }

    teamTrack.style.transform = `translateX(-${teamIndex * 100}%)`;

    setTimeout(() => {
      teamTrack.style.transition = "transform 0.6s ease";
    }, 50);
  }

  isTeamSliding = false;
});

window.nextTeamSlide = nextTeamSlide;
window.prevTeamSlide = prevTeamSlide;


// ================= CO-CURRICULAR INFINITE SLIDER =================

let cocoIndex = 1;
let cocoTrack;
let cocoSlides;
let isCocoSliding = false;

function setupCocoSlider() {
  cocoTrack = document.querySelector(".coco-slider-track");

  if (!cocoTrack) return;

  const originalSlides = Array.from(document.querySelectorAll(".coco-slide"));

  if (originalSlides.length <= 1) return;

  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  cocoTrack.appendChild(firstClone);
  cocoTrack.insertBefore(lastClone, originalSlides[0]);

  cocoSlides = document.querySelectorAll(".coco-slide");

  cocoTrack.style.transition = "none";
  cocoTrack.style.transform = `translateX(-${cocoIndex * 100}%)`;

  setTimeout(() => {
    cocoTrack.style.transition = "transform 0.75s ease";
  }, 50);
}

function changeCocoSlide(direction) {
  if (!cocoTrack || isCocoSliding) return;

  isCocoSliding = true;
  cocoIndex += direction;

  cocoTrack.style.transition = "transform 0.75s ease";
  cocoTrack.style.transform = `translateX(-${cocoIndex * 100}%)`;
}

document.addEventListener("transitionend", (e) => {
  if (!cocoTrack || e.target !== cocoTrack) return;

  cocoSlides = document.querySelectorAll(".coco-slide");

  if (cocoSlides[cocoIndex].classList.contains("clone")) {
    cocoTrack.style.transition = "none";

    if (cocoIndex === cocoSlides.length - 1) {
      cocoIndex = 1;
    }

    if (cocoIndex === 0) {
      cocoIndex = cocoSlides.length - 2;
    }

    cocoTrack.style.transform = `translateX(-${cocoIndex * 100}%)`;

    setTimeout(() => {
      cocoTrack.style.transition = "transform 0.75s ease";
    }, 50);
  }

  isCocoSliding = false;
});

document.addEventListener("DOMContentLoaded", setupCocoSlider);

window.changeCocoSlide = changeCocoSlide;


// ================= SPORTS HERO SLIDER =================
let sportIndex = 0;

function changeSportSlide(direction) {
  const slides = document.querySelectorAll(".sports-slide");
  if (!slides.length) return;

  slides[sportIndex].classList.remove("active");

  sportIndex += direction;

  if (sportIndex < 0) sportIndex = slides.length - 1;
  if (sportIndex >= slides.length) sportIndex = 0;

  slides[sportIndex].classList.add("active");
}
window.changeSportSlide = changeSportSlide;


// ================= OUTDOOR SLIDER =================
let outdoorSlides = [
  {
    image: "images/outdoor-main.jpeg",
    title: "Term 1 - Outdoor Activities",
    desc1: "In Term 1, students take part in outdoor activities and practical learning experiences in and around Dimapur.",
    desc2: "These activities help build confidence, teamwork, and leadership while encouraging students to learn beyond the classroom."
  },
  {
    image: "images/outdoor4.jpeg",
    title: "River Adventure",
    desc1: "Students experience the joy of outdoor learning through river-side activities around Dimapur.",
    desc2: "These moments help them build courage, teamwork and confidence while learning to respect nature."
  },
  {
    image: "images/outdoor3.jpeg",
    title: "Nature Walks",
    desc1: "Through guided walks and outdoor exploration, students observe the natural beauty around Nagaland.",
    desc2: "These experiences encourage curiosity, discipline and appreciation for the environment."
  }
];

let currentOutdoorIndex = 0;

function renderOutdoorSlider() {
  const mainImage = document.getElementById("outdoorMainImage");
  const titleBox = document.getElementById("outdoorTitle");
  const descBox1 = document.getElementById("outdoorDesc1");
  const descBox2 = document.getElementById("outdoorDesc2");
  const rightBox = document.getElementById("outdoorRight");

  if (!mainImage || !titleBox || !descBox1 || !descBox2 || !rightBox) return;

  const current = outdoorSlides[currentOutdoorIndex];

  mainImage.style.opacity = "0";
  titleBox.style.opacity = "0";
  descBox1.style.opacity = "0";
  descBox2.style.opacity = "0";

  setTimeout(() => {
    mainImage.src = current.image;
    titleBox.textContent = current.title;
    descBox1.textContent = current.desc1;
    descBox2.textContent = current.desc2;

    rightBox.innerHTML = "";

    outdoorSlides.forEach((slide, index) => {
      if (index !== currentOutdoorIndex) {
        rightBox.innerHTML += `
          <div class="small-img" onclick="currentOutdoorIndex=${index}; renderOutdoorSlider();">
            <img src="${slide.image}" alt="">
            <div class="plus">+</div>
          </div>
        `;
      }
    });

    mainImage.style.opacity = "1";
    titleBox.style.opacity = "1";
    descBox1.style.opacity = "1";
    descBox2.style.opacity = "1";
  }, 250);
}

window.renderOutdoorSlider = renderOutdoorSlider;


// ================= BEAU COLLAGE DRAG =================
document.addEventListener("DOMContentLoaded", function () {
  const beauCollage = document.querySelector(".beau-collage");

  if (!beauCollage) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  beauCollage.addEventListener("mousedown", (e) => {
    isDown = true;
    beauCollage.classList.add("dragging");
    startX = e.pageX - beauCollage.offsetLeft;
    scrollLeft = beauCollage.scrollLeft;
  });

  beauCollage.addEventListener("mouseleave", () => {
    isDown = false;
    beauCollage.classList.remove("dragging");
  });

  beauCollage.addEventListener("mouseup", () => {
    isDown = false;
    beauCollage.classList.remove("dragging");
  });

  beauCollage.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - beauCollage.offsetLeft;
    const walk = (x - startX) * 1.4;

    beauCollage.scrollLeft = scrollLeft - walk;
  });
});

// ================= TOUR VIDEO POPUP =================
document.addEventListener("DOMContentLoaded", () => {
  const tourButtons = document.querySelectorAll(".tour-play");
  const videoPopup = document.getElementById("videoPopup");
  const tourVideo = document.getElementById("tourVideo");
  const closeVideo = document.querySelector(".close-video");

  if (!tourButtons.length || !videoPopup || !tourVideo || !closeVideo) return;

  tourButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const videoPath = button.getAttribute("data-video");

      tourVideo.src = videoPath;
      tourVideo.load();

      videoPopup.classList.add("active");

      setTimeout(() => {
        tourVideo.play();
      }, 150);
    });
  });

  function closeTourVideo() {
    videoPopup.classList.remove("active");
    tourVideo.pause();
    tourVideo.currentTime = 0;
    tourVideo.removeAttribute("src");
    tourVideo.load();
  }

  closeVideo.addEventListener("click", closeTourVideo);

  videoPopup.addEventListener("click", (e) => {
    if (e.target === videoPopup) {
      closeTourVideo();
    }
  });
});