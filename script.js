const buttonEdit = document.querySelector('.button_type_edit');
const popupInfoEdit = document.querySelector('.popup_type_profile');
const buttonsClose = document.querySelectorAll('.button_type_close');
const buttonAdd = document.querySelector('.button_type_add');
const popupPhotoAdd = document.querySelector('.popup_type_photo');


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
   
    popup.classList.remove('popup_opened');
}



buttonEdit.addEventListener('click', function() {
    openPopup(popupInfoEdit)
})

Array.from(buttonsClose).forEach(function(button) {
    button.addEventListener('click', function() {
        if(popupInfoEdit.classList.contains('popup_opened')) {
            closePopup(popupInfoEdit);
        } else {
            closePopup(popupPhotoAdd);
        }
    })
})

buttonAdd.addEventListener('click', function() {
    openPopup(popupPhotoAdd);
})



const formElement = document.querySelector('.profile-form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__user-info');

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupInfoEdit)
}

formElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const photoTemplate = document.querySelector('#photo-grid').content;
const elements = document.querySelector('.elements');

initialCards.forEach(function(item) {
    const photoElement = photoTemplate.querySelector('.element').cloneNode(true);

    photoElement.querySelector('.element__illustration').src = item.link;
    photoElement.querySelector('.element__text').textContent = item.name;

    elements.append(photoElement);
})


const photoFormElement = document.querySelector('.photo-form');
const photoNameInput = document.querySelector('.popup__input_type_place-name');
const photoUrlInput = document.querySelector('.popup__input_type_photo-url');
const trashes = document.querySelectorAll('.element__trash');
const trash = Array.from(trashes);



    trash.forEach(function(button) {
        button.addEventListener('click', function() {
        button.parentElement.remove();
        trash.splice(trash.indexOf(this), 1);
        })
        })

function handlePhotoFormSubmit(evt) {
    evt.preventDefault(); 
    const photoElement = photoTemplate.querySelector('.element').cloneNode(true);
    photoElement.querySelector('.element__illustration').src = photoUrlInput.value;
    photoElement.querySelector('.element__text').textContent = photoNameInput.value;
    
  

    elements.prepend(photoElement);
    

    trash.unshift(photoElement.querySelector('.element__trash'));
    photoElement.querySelector('.element__trash').addEventListener('click', function() {
        this.parentElement.remove();
        trash.splice(trash.indexOf(this), 1);
    })

    photoElement.querySelector('.element__illustration').addEventListener('click', function() {
        illustrationBig.src=photoElement.querySelector('.element__illustration').src;
        textBig.textContent = photoElement.querySelector('.element__illustration').parentElement.children[2].children[0].textContent;
         openPopup(popupBig); 
    })

    evt.target.reset();

    closePopup(popupPhotoAdd);
}


photoFormElement.addEventListener('submit', handlePhotoFormSubmit);



const buttonsLike = document.querySelectorAll('.button_type_like');

Array.from(buttonsLike).forEach(function(button) {
    button.addEventListener('click', function() {
        button.classList.toggle('button_type_like-active');
    })
})


const photos = document.querySelectorAll('.element__illustration');
const popupBig = document.querySelector('.popup_big-view');
const illustrationBig = document.querySelector('.element__illustration_big-view');
const textBig = document.querySelector('.element__text_big-view');

Array.from(photos).forEach(function(photo) {
    photo.addEventListener('click', function() {
       illustrationBig.src=photo.src;
       textBig.textContent = photo.parentElement.children[2].children[0].textContent;
        openPopup(popupBig);    
    })
})

const buttonsCloseBig = document.querySelectorAll('.button_type_close-bv');

Array.from(buttonsCloseBig).forEach(function(button) {
    button.addEventListener('click', function() {
        closePopup(popupBig);
    })
})

