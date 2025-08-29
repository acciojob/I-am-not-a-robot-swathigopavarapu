//your code here
const imgContainer = document.getElementById("images");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");
const h = document.getElementById("h");

let selectedImages = [];

// 5 sample images (from your CSS classes)
const images = ["img1", "img2", "img3", "img4", "img5"];

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load images dynamically
function loadImages() {
  imgContainer.innerHTML = "";
  para.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  selectedImages = [];

  // Pick random duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];
  const imgList = [...images, duplicate];
  shuffle(imgList);

  imgList.forEach((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.id = cls;
    img.addEventListener("click", () => handleClick(img));
    imgContainer.appendChild(img);
  });
}

// Handle click
function handleClick(img) {
  if (selectedImages.length >= 2 || img.classList.contains("selected")) return;

  img.classList.add("selected");
  selectedImages.push(img);

  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset
resetBtn.addEventListener("click", () => {
  loadImages();
  h.innerText = "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  if (selectedImages[0].dataset.id === selectedImages[1].dataset.id) {
    para.innerText = "You are a human. Congratulations!";
    para.style.color = "green";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    para.style.color = "red";
  }
});

// Initialize
loadImages();
