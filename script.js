filterOptions = document.querySelectorAll(".filter .filter-img"),
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
resetValues = document.querySelector("#resetValues"),
setkaWidth = document.querySelector("#width"),
setkaHeight= document.querySelector("#height"),
setkaSize= document.querySelector("#size"),
table = document.querySelector(".preview-img table"),
slot = document.querySelector("#slot"),
fonch = document.querySelector("#fonch"),
zIndex = 21;

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1, moveX = 0, moveY = 0;

const loadImage = (image = previewImg, createOnDesk = true, deleted = true) => {
    let newImage = new Image();
    newImage.src = image.src;
    slot.src = image.src;
    if (deleted){
      newImage.style = "position: absolute; z-index:" + zIndex++ + ";";
    } else {
      newImage.style = "pointer-events: none; position: absolute; z-index:" + zIndex++ + ";";
    }
    newImage.width = newImage.width/8 * setkaSize.value;
    imgParent.prepend(newImage);

    previewImg = document.querySelector(".preview-img img");
    applyFilter();
    document.querySelector(".container").classList.remove("disable");

    if (!createOnDesk){
      newImage.remove();
    }

    if (deleted){
      previewImg.addEventListener("mouseup", () => {
        newImage.remove();
      });
      previewImg.addEventListener("mousemove", (e) => {
        if (e.which == 1){
          newImage.remove();
        }
      });
    }
}
let buttons = document.querySelectorAll(".hide-self");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.add("hide");
  })
});
document.querySelectorAll(".btn").forEach(button => {
  let active = null;
  if (button.id == "block" || button.id == "item" || button.id == "human" || button.id == "creatures" || button.id == "settings"){
    button.addEventListener("click", () => {
      buttons.forEach(but => {
        but.classList.add("hide");
      })
      active = document.querySelector("#" + button.id + "-div");
      active.classList.remove("hide");
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
  table.setAttribute("style", `z-index: 9000;`);
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

    if(option.id === 'brightness') {
      filterSlider.max = '200';
      filterSlider.value = brightness;
    } else if(option.id === 'saturation') {
      filterSlider.max = '200';
      filterSlider.value = saturation;
    } else if(option.id === 'inversion') {
      filterSlider.max = '100';
      filterSlider.value = inversion;
    } else if (option.id === 'grayscale'){
      filterSlider.max = '100';
      filterSlider.value = grayscale;
    } else {
      filterSlider.max = '360';
      filterSlider.value = rotate;
    }
  });
});

const updateFilter = () => {
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
        moveX += setkaSize.value * 2;
      } else if (event.altKey){
        moveX += setkaSize.value * 4;
        loadImage();
      } else {
        moveX += setkaSize.value * 4;
      }
      break;
    case 'ArrowLeft':
      if (event.ctrlKey) {
        moveX -= 1;
      } else if (event.shiftKey){
        moveX -= setkaSize.value * 2;
      } else if (event.altKey){
        moveX -= setkaSize.value * 4;
        loadImage();
      } else {
        moveX -= setkaSize.value * 4;
      }
      break;
    case 'ArrowUp':
      if (event.ctrlKey) {
        moveY -= 1;
      } else if (event.shiftKey){
        moveY -= setkaSize.value * 2;
      } else if (event.altKey){
        moveY -= setkaSize.value * 4;
        loadImage();
      } else {
        moveY -= setkaSize.value * 4;
      }
      break;
    case 'ArrowDown':
      if (event.ctrlKey) {
        moveY += 1;
      } else if (event.shiftKey){
        moveY += setkaSize.value * 2;
      } else if (event.altKey){
        moveY += setkaSize.value * 4;
        loadImage();
      } else {
        moveY += setkaSize.value * 4;
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
        moveX -= setkaSize.value * 2;
      } else if (event.altKey){
        moveX -= setkaSize.value * 4;
        loadImage();
      } else {
        moveX -= setkaSize.value * 4;
      }
    } else if(option.id === 'right') {
      if (event.ctrlKey) {
        moveX += 1;
      } else if (event.shiftKey){
        moveX += setkaSize.value * 2;
      } else if (event.altKey){
        moveX += previewImg.naturalWidth;
        loadImage();
      } else {
        moveX += setkaSize.value * 4;
      }
    } else if(option.id === 'up') {
      if (event.ctrlKey) {
        moveY -= 1;
      } else if (event.shiftKey){
        moveY -= setkaSize.value * 2;
      } else if (event.altKey){
        moveY -= setkaSize.value * 4;
        loadImage();
      } else {
        moveY -= setkaSize.value * 4;
      }
    } else if (option.id === 'down'){
      if (event.ctrlKey) {
        moveY += 1;
      } else if (event.shiftKey){
        moveY += setkaSize.value * 2;
      } else if (event.altKey){
        moveY += previewImg.naturalHeight;
        loadImage();
      } else {
        moveY += setkaSize.value * 4;
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
  imgParent.setAttribute("style", `min-width: ${y * (setkaSize.value * 4) + 2}px; min-height: ${x * (setkaSize.value * 4) + 2}px;`);
  document.querySelector('#lenta').setAttribute("style", `position: absolute; top: 0px; left: 0px; height: 50px; margin: 0px; z-index: 1; width: ${y * (setkaSize.value * 4) + 303}px; min-width: 100%`);
  document.querySelector('#polosa').setAttribute("style", `position: absolute; top: 0px; left: 0px; height: ${x * (setkaSize.value * 4) + 200}px; width: 205px; min-height: 100%`);
  x++;
  y++;
  let count = 0;
  for (let i = 1; i < x; i++){
    let tr = document.createElement('tr');
    for (let j = 1; j < y; j++){
      let td = document.createElement('td');
      td.setAttribute("style", `width: ${setkaSize.value * 4 - 2}px; height: ${setkaSize.value * 4 - 2}px; min-width: ${setkaSize.value * 4 - 2}px; min-height: ${setkaSize.value * 4 - 2}px; border: black solid 1px;`)
      td.data = {
        x: i,
        y: j,
        xBlock: (i - (x / 2)) * (setkaSize.value * 4),
        yBlock: (j - (y / 2)) * (setkaSize.value * 4),
      }
      td.addEventListener('mousedown', (e) => {
        if (e.which == 1) {
          table.setAttribute("style", `z-index: 0;`);
        }
      });
      imgParent.addEventListener('mouseup', (e) => {
        table.setAttribute("style", `z-index: 9000;`);
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
setkaSize.value = localStorage.getItem("setkaSize");
if (!setkaWidth.value){
  setkaWidth.value = 50;
}
if (!setkaHeight.value) {
  setkaHeight.value = 32;
}
if (!setkaSize.value) {
  setkaSize.value = 8;
}
if (setkaWidth.value != 50 || setkaHeight.value != 32){
  document.querySelectorAll(".preview-img img").forEach(image => {
    image.remove();
  });
} else if (setkaSize.value != 8){
  document.querySelectorAll(".preview-img img").forEach(image => {
    image.remove();
  });
  loadImage(fonch, true, false);
  previewImg = undefined;
}
setValues.addEventListener("click", () => {
  if (setkaWidth.value){
    localStorage.setItem("setkaWidth", setkaWidth.value);
  }
  if (setkaHeight.value){
    localStorage.setItem("setkaHeight", setkaHeight.value);
  }
  if (setkaSize.value) {
    localStorage.setItem("setkaSize", setkaSize.value);
  }
  location.reload();
});
resetValues.addEventListener("click", () => {
  if (setkaWidth.value){
    localStorage.setItem("setkaWidth", 50);
  }
  if (setkaHeight.value){
    localStorage.setItem("setkaHeight", 32);
  }
  if (setkaSize.value){
    localStorage.setItem("setkaSize", 8);
  }
  location.reload();
});

document.querySelectorAll(".popup_caller").forEach(call => {
  call.addEventListener("click", () => {
    document.querySelector("#popup_" + call.id).classList.add("visible");
  });
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