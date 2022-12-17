"use strict";

const upload_img_box = document.querySelector('.upload_img_box');
const selectedImage = document.querySelector('#selectedImage');
const choose_image = document.querySelector('.choose_image');

const image_holder = document.querySelector('.image_holder');
const image = document.querySelector('#image');

const slider = document.querySelectorAll('.slider');
const show_value = document.querySelectorAll('.show_value');

const list_options = document.querySelectorAll('ul li');

const options = document.querySelector('.options');
const option = document.querySelectorAll('.option');

const clearAll = document.querySelector('#clearAll');
const remove_img_btn = document.querySelector('#remove_img_btn');


let canvas = document.querySelector('#image_canvas');
const context = canvas.getContext('2d');

let File_Name;
let Edited = false;


/*handle choose image event*/

upload_img_box.addEventListener("click", function () {
   selectedImage.click();
});


/*choose image event*/
selectedImage.addEventListener("change", function () {
   const file = this.files[0];

   if (file) {
      const reader = new FileReader();
      File_Name = file.name;

      choose_image.style.display = "none";
      image_holder.style.display = "block";

      reader.addEventListener("load", function () {
         image.setAttribute("src", this.result);
      });

      reader.readAsDataURL(file);
      remove_img_btn.style.display = "block";
   }

   if (Edited == false) {
      Edited = true;
   }

})


/*function call when slider value change*/

for (let i = 0; i <= slider.length - 1; i++) {
   slider[i].addEventListener('input', editImage);
}

function editImage() {
   const bright = document.querySelector('#brightness');
   const blur = document.querySelector('#blur');
   const grey = document.querySelector('#greyScale');
   const hue = document.querySelector('#hue');
   const saturation = document.querySelector('#saturation');


   const brightValShow = document.querySelector('#brightVal');
   const blurValShow = document.querySelector('#blurVal');
   const greyValShow = document.querySelector('#greyVal');
   const hueValShow = document.querySelector('#hueVal');
   const saturationValShow = document.querySelector('#saturationVal');

   const brightVal = bright.value;
   const greyVal = grey.value;
   const blurVal = blur.value;
   const hueVal = hue.value;
   const satuVal = saturation.value;

   brightValShow.innerHTML = brightVal;
   blurValShow.innerHTML = blurVal;
   greyValShow.innerHTML = greyVal;
   hueValShow.innerHTML = hueVal;
   saturationValShow.innerHTML = satuVal;

   image.style.filter = 'grayscale(' + greyVal + '%) hue-rotate(' + hueVal + 'deg) brightness(' + brightVal + '%) blur(' + blurVal + 'px) saturate(' + satuVal + ')';
   context.filter = 'grayscale(' + greyVal + '%) hue-rotate(' + hueVal + 'deg) brightness(' + brightVal + '%) blur(' + blurVal + 'px) saturate(' + satuVal + ')';

   clearAll.style.transform = 'translateY(0px)';
}


/*handle each option*/

list_options.forEach((list_option, index) => {
    list_option.addEventListener('click', function () {
 
 
       if (image.getAttribute('src') == "") {
          alert("Choose Image First");
       } else {
 
          options.style.transform = 'translateY(0px)';
 
          if (Edited == true) {
             canvas.height = image.naturalHeight;
             canvas.width = image.naturalWidth;
 
             for (let i = 0; i <= 4; i++) {
 
                if (index != i) {
                   list_options[i].classList.remove("active_option");
                   option[i].classList.remove("active_controller");
 
                } else {
                   this.classList.add("active_option");
                   option[i].classList.add("active_controller");
                }
             }
 
          } else {
             alert("Edit Your Image First");
          }
 
       }
 
    })
 });
 
 
 /*download image*/

 function Download_btn() {
 
    if (image.getAttribute('src') != "") {
 
       if (Edited == true) {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          var jpegUrl = canvas.toDataURL("image/jpg");
 
          const link = document.createElement("a");
          document.body.appendChild(link);
 
          link.setAttribute("href", jpegUrl);
          link.setAttribute("download", File_Name);
          link.click();
          document.body.removeChild(link);
 
       }
    }
 };
 
 
 /*reset range value*/

 clearAll.addEventListener("click", function () {
    clearAllRangeValue();
 });
 
 function clearAllRangeValue() {
    image.style.filter = 'none';
    context.filter = 'none';
 
    for (let i = 0; i <= slider.length - 1; i++) {
       if (i == 0) {
          slider[i].value = '100';
       } else {
          slider[i].value = '0';
       }
    }
 
    editImage();
    clearAll.style.transform = 'translateY(150px)';
 };

 
 /*remove image */
 remove_img_btn.addEventListener("click", function () {
    image.src = "";
    this.style.display = "none";
    choose_image.style.display = "block";
    image_holder.style.display = "none";
    options.style.transform = 'translateY(80px)';
    clearAllRangeValue();
 });