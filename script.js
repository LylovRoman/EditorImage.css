filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
volumeSlider = document.querySelector("#volume"),
rotateOptions = document.querySelectorAll(".rotate button"),
imgParent = document.querySelector(".preview-img"),
resetFilterBtn = document.querySelector(".reset-filter"),
setka = document.querySelector("#setka"),
offMusic = document.querySelector("#off-music"),
saveImgBtn = document.querySelector(".save-img"),
loadImgBtns = document.querySelectorAll(".load"),
setValues = document.querySelector("#setValues"),
setkaWidth = document.querySelector("#width"),
setkaHeight= document.querySelector("#height"),
table = document.querySelector(".preview-img table"),
zIndex = 1;

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1, moveX = 0, moveY = 0;

const loadImage = (image = previewImg, createOnDesk = true) => {
    let newImage = new Image();
    newImage.src = image.src;
    newImage.style = "position: absolute; z-index:" + zIndex++ + ";";
    imgParent.prepend(newImage);

    previewImg = document.querySelector(".preview-img img");
    applyFilter();
    document.querySelector(".container").classList.remove("disable");

    if (!createOnDesk){
      newImage.remove();
    }

    previewImg.addEventListener("mouseup", () => {
        newImage.remove();
    });
    previewImg.addEventListener("mousemove", (e) => {
      if (e.which == 1){
        newImage.remove();
      }
    });
}
document.querySelectorAll(".btn").forEach(button => {
  let active = null;
  if (button.id == "block" || button.id == "item" || button.id == "interface" || button.id == "creatures" || button.id == "settings"){
    button.addEventListener("click", () => {
      active = document.querySelector("#popup_" + button.id);
      active.classList.add("visible");
    })
  }
  if (button.id == "music"){
    button.addEventListener("click", () => {
      var audio = new Audio('Музыка/MysteriousMovement.mp3');
      audio.play();
      audio.addEventListener('ended', () => {
        audio = new Audio('Музыка/DayOrion.mp3');
        audio.play();
        audio.addEventListener('ended', () => {
          audio = new Audio('Музыка/NightOrion.mp3');
          audio.play();
          audio.addEventListener('ended', () => {
            audio = new Audio('Музыка/OrionMainTheme(Tobias Mitter).mp3');
            audio.play();
            audio.addEventListener('ended', () => {
              offMusic.classList.add("hide");
              button.classList.remove("hide");
            });
          });
        });
      });
      button.classList.add("hide");
      offMusic.classList.remove("hide");
      offMusic.addEventListener("click", () => {
        audio.pause();
        offMusic.classList.add("hide");
        button.classList.remove("hide");
      });
      volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
      });
    });
  }
});
document.querySelectorAll(".popup_close").forEach(popupClose => {
  popupClose.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains("popup_close") || event.target.classList.contains("popup_body")){
      document.querySelectorAll(".popup").forEach(pop => {
        pop.classList.remove("visible");
      })
    }
  })
})

setka.addEventListener('click', () => {
  table.classList.toggle("visible");
  table.setAttribute("style", `z-index: 999999;`);
});
loadImgBtns.forEach(load => {
  load.addEventListener('click', () => {
    loadImage(load, false);
    document.querySelectorAll(".popup").forEach(popup => {
      popup.classList.remove("visible");
    });
  });
});

const applyFilter = () => {
    previewImg.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  }
filterOptions.forEach(option => {
  option.addEventListener('click', () => {
    document.querySelector('.active').classList.remove('active');
    option.classList.add('active');
    filterName.innerText = option.innerText;

    if(option.id === 'brightness') {
      filterSlider.max = '200';
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if(option.id === 'saturation') {
      filterSlider.max = '200';
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`
    } else if(option.id === 'inversion') {
      filterSlider.max = '100';
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === 'grayscale'){
      filterSlider.max = '100';
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    } else {
      filterSlider.max = '360';
      filterSlider.value = rotate;
      filterValue.innerText = `${rotate}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector('.filter .active');

  if(selectedFilter.id === 'brightness') {
    brightness = filterSlider.value;
  } else if(selectedFilter.id === 'saturation') {
    saturation = filterSlider.value;
  } else if(selectedFilter.id === 'inversion') {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === 'grayscale'){
    grayscale = filterSlider.value;
  } else {
    rotate = filterSlider.value;
  }
  applyFilter();
}
document.addEventListener('keydown', (event) => {
  switch (event.key){
    case 'ArrowRight':
      if (event.ctrlKey) {
        moveX += 1;
      } else if (event.shiftKey){
        moveX += 16;
      } else if (event.altKey){
        moveX += 32;
        loadImage();
      } else {
        moveX += 32;
      }
      break;
    case 'ArrowLeft':
      if (event.ctrlKey) {
        moveX -= 1;
      } else if (event.shiftKey){
        moveX -= 16;
      } else if (event.altKey){
        moveX -= 32;
        loadImage();
      } else {
        moveX -= 32;
      }
      break;
    case 'ArrowUp':
      if (event.ctrlKey) {
        moveY -= 1;
      } else if (event.shiftKey){
        moveY -= 16;
      } else if (event.altKey){
        moveY -= 32;
        loadImage();
      } else {
        moveY -= 32;
      }
      break;
    case 'ArrowDown':
      if (event.ctrlKey) {
        moveY += 1;
      } else if (event.shiftKey){
        moveY += 16;
      } else if (event.altKey){
        moveY += 32;
        loadImage();
      } else {
        moveY += 32;
      }
      break;
    case 'к':
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
      break;
    case 'К':
      flipVertical = flipVertical === 1 ? -1 : 1;
      break;
    default: break;
  }
  applyFilter();
});
rotateOptions.forEach(option => {
  option.addEventListener('click', (event) => {
    if(option.id === 'left') {
      if (event.ctrlKey) {
        moveX -= 1;
      } else if (event.shiftKey){
        moveX -= 16;
      } else if (event.altKey){
        moveX -= 32;
        loadImage();
      } else {
        moveX -= 32;
      }
    } else if(option.id === 'right') {
      if (event.ctrlKey) {
        moveX += 1;
      } else if (event.shiftKey){
        moveX += 16;
      } else if (event.altKey){
        moveX += previewImg.naturalWidth;
        loadImage();
      } else {
        moveX += 32;
      }
    } else if(option.id === 'up') {
      if (event.ctrlKey) {
        moveY -= 1;
      } else if (event.shiftKey){
        moveY -= 16;
      } else if (event.altKey){
        moveY -= 32;
        loadImage();
      } else {
        moveY -= 32;
      }
    } else if (option.id === 'down'){
      if (event.ctrlKey) {
        moveY += 1;
      } else if (event.shiftKey){
        moveY += 16;
      } else if (event.altKey){
        moveY += previewImg.naturalHeight;
        loadImage();
      } else {
        moveY += 32;
      }
    } else if (option.id === 'horizontal') {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else if (option.id === 'vertical'){
      flipVertical = flipVertical === 1 ? -1 : 1;
    }else {
      loadImage();
    }
    applyFilter();
  });
});

const resetFilter = () => {
  brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
  rotate = 0; flipHorizontal = 1; flipVertical = 1;
  filterOptions[0].click();
  applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
  
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
      ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
  };

function createTable(x, y){
  x++;
  y++;
  imgParent.setAttribute("style", `width: ${y * 32}px; height: ${x * 32}px;`);
  let count = 0;
  for (let i = 1; i < x; i++){
    let tr = document.createElement('tr');
    for (let j = 1; j < y; j++){
      let td = document.createElement('td');
      td.data = {
        x: i,
        y: j,
        xBlock: (i - (x / 2)) * 32,
        yBlock: (j - (y / 2)) * 32,
      }
      td.addEventListener('mousedown', (e) => {
        if (e.which == 1) {
          table.setAttribute("style", `z-index: 0;`);
        }
      });
      imgParent.addEventListener('mouseup', (e) => {
        table.setAttribute("style", `z-index: 999999;`);
      });
      td.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if ((moveX != e.target.data.yBlock) || (moveY != e.target.data.xBlock)){
          moveX = e.target.data.yBlock;
          moveY = e.target.data.xBlock;
          loadImage();
        }
      });
      td.addEventListener('mousemove', (e) => {
        if (e.which == 3){
          if ((moveX != e.target.data.yBlock) || (moveY != e.target.data.xBlock)){
            moveX = e.target.data.yBlock;
            moveY = e.target.data.xBlock;
            loadImage();
          }
        }
      });
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}
setkaWidth.value = localStorage.getItem("setkaWidth");
setkaHeight.value = localStorage.getItem("setkaHeight");
if (!setkaWidth.value){
  setkaWidth.value = 32;
}
if (!setkaHeight.value) {
  setkaHeight.value = 20;
}
setValues.addEventListener("click", () => {
  if (setkaWidth.value){
    localStorage.setItem("setkaWidth", setkaWidth.value);
  }
  if (setkaHeight.value){
    localStorage.setItem("setkaHeight", setkaHeight.value);
  }
  location.reload();
});

createTable(setkaHeight.value, setkaWidth.value);
filterSlider.addEventListener('input', updateFilter);
resetFilterBtn.addEventListener('click', resetFilter);


//saveImgBtn.addEventListener('click', saveImage);
/*
ВОТ ТАК РАБОТАЮТ НАСТРОЙКИ C ЧЕКБОКСОМ


let setting1 = false;
document.querySelector("#setting1").addEventListener('click', () => {
  setting1 = !setting1;
  if (setting1){
    console.log('TRUE')
  } else {
    console.log("FALSE");
  }
});
 */