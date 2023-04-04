const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const currentDate = new Date().toLocaleString();
const deleteButton = document.getElementById("del-button");

let comments = [];
// Лайки и их счетчик

const likeButtonsListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  // console.log(likeButtons);
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      const index = likeButton.dataset.like;
      if (comments[index].likedComment === "like-button") {
        comments[index].likesComment += 1;
        comments[index].likedComment = "like-button -active-like";

      } else {
        comments[index].likesComment -= 1;
        comments[index].likedComment = "like-button";
      }
      renderComments();
    });
  }
};

//ЗАПРОС
const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/anton-sobachkin/comments", {
  method: "GET"
});
fetchPromise.then((res) => {
  res.json().then((responseData) => {
    const appComments = responseData.comments.map((comment, id) => {
      return {
        nameComment: comment.author.name,
        dateComment: new Date(comment.date).toLocaleString(),
        textComment: comment.text,
        likesComment: comment.likes,
        likedComment: "like-button",
      };
    });
    comments = appComments;    
    renderComments();
    console.log(comments);
  });
});

console.log(comments);

//Рендер-функция

const renderComments = () => {
  const commentsHtml = comments.map((comment,index) => {
    return `<li class="comment" >
    <div class="comment-header">
      <div class="comment-name">${comment.nameComment}</div>
      <div>${comment.dateComment}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text" >
        ${comment.textComment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likesComment}</span>      
        <button class="like-button ${comment.likedComment}" data-like="${index}"></button>
      </div>
    </div>
  </li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;

  likeButtonsListeners();
  addNewElement();
};
renderComments();


//Добавление комментария
buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
      return;
  }
  fetch("https://webdev-hw-api.vercel.app/api/v1/anton-sobachkin/comments", {
      method: "POST",
      body: JSON.stringify({
          "text": textInputElement.value,
          "name": nameInputElement.value
      })
  });
  renderComments();
  textInputElement.value = "";
});


//Обновление по кнопке
function addNewElement() {
  buttonElement.addEventListener('click', () => {
const refresh = fetch("https://webdev-hw-api.vercel.app/api/v1/anton-sobachkin/comments", {
  method: "GET"
});
refresh.then((res) => {
  res.json().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        nameComment: comment.author.name,
        dateComment: new Date(comment.date).toLocaleString(),
        textComment: comment.text,
        likesComment: comment.likes,
        likedComment: "like-button",
      };
    });
    comments = appComments;
    renderComments();
  });
});

  });
}
addNewElement();

//кнопка удаления

deleteButton.addEventListener('click', () => {
  listElement.lastElementChild.remove(`${textInputElement.value}`);
});







//                    С 11 ДЗ

// // Лайки и их счетчик

// const likeButtonsListeners = () => {
//   const likeButtons = document.querySelectorAll(".like-button");
//   // console.log(likeButtons);
//   for (const likeButton of likeButtons) {
//     likeButton.addEventListener('click', () => {
//       //  event.stopPropagation();
//       const index = likeButton.dataset.like;
//       if (comments[index].likedComment === "like-button") {
//         comments[index].likesComment += 1;
//         comments[index].likedComment = "like-button -active-like";

//       } else {
//         comments[index].likesComment -= 1;
//         comments[index].likedComment = "like-button";
//       }
//       renderComments();
//     });
//   }
// };


// //Данные о комментариях

// const comments = [{
//     nameComment: "Глеб Фокин",
//     textComment: "Это будет первый комментарий на этой странице",
//     dateComment: "12.02.22 12:18",
//     likesComment: 3,
//     likedComment: "like-button",
//   },
//   {
//     nameComment: "Варвара Н.",
//     textComment: "Мне нравится как оформлена эта страница! ❤",
//     dateComment: "13.02.22 19:22",
//     likesComment: 75,
//     likedComment: "like-button",
//   }
// ];


// //Рендер-функция

// const renderComments = () => {
//   const commentsHtml = comments.map((comment, index) => {
//     return `<li class="comment" data-name="${protectHtml(comment.nameComment)}">
//     <div class="comment-header">
//       <div class="comment-name">${protectHtml(comment.nameComment)}</div>
//       <div>${comment.dateComment}</div>
//     </div>
//     <div class="comment-body">
//       <div class="comment-text" data-reply="${index}">
//         ${protectHtml(comment.textComment)}
//       </div>
//     </div>
//     <div class="comment-footer">
//       <div class="likes">
//         <span class="likes-counter">${comment.likesComment}</span>      
//         <button class="like-button ${comment.likedComment}" data-like="${index}"></button>
//       </div>
//     </div>
//   </li>`;
//   }).join('');
//   listElement.innerHTML = commentsHtml;
//   likeButtonsListeners();
//   buttonSwitch();
// };
// renderComments();


// //Новый элемент
// function addNewElement() {
//   buttonElement.addEventListener('click', () => {
//     nameInputElement.classList.remove("error");
//     if (nameInputElement.value === "") {
//       nameInputElement.classList.add("error");
//       return;
//     } else if (textInputElement.value === "") {
//       textInputElement.classList.add("error");
//       return;
//     }
//     comments.push({
//       nameComment: nameInputElement.value,
//       textComment: textInputElement.value,
//       dateComment: currentDate,
//       likesComment: 0,
//       likedComment: "like-button",
//     });
//     protectHtml();
//     renderComments();
//     makeResponse();
//   });
// }
// addNewElement();


// // Вкл/выкл кнопки добавления нового элемента в список
// nameInputElement.addEventListener("input", buttonSwitch);
// textInputElement.addEventListener("input", buttonSwitch);

// function buttonSwitch() {
//   buttonElement.classList.remove("turn-off");
//   if (document.getElementById("name-input").value === "" || document.getElementById("text-input").value === "") {
//     document.getElementById("add-button").disabled = true;
//     buttonElement.classList.add("turn-off");
//   } else {
//     document.getElementById("add-button").disabled = false;
//     buttonElement.classList.remove("turn-off");
//   }
// }
// buttonSwitch();


// // Работа по Enter

// nameInputElement.addEventListener("keyup", ({
//   key
// }) => {
//   if (key === "Enter") {
//     nameInputElement.classList.remove("error");
//     if (nameInputElement.value === "") {
//       nameInputElement.classList.add("error");
//       return;
//     } else if (textInputElement.value === "") {
//       textInputElement.classList.add("error");
//       return;
//     }
//     renderComments();
//   }

// });

// textInputElement.addEventListener("keyup", ({
//   key
// }) => {
//   if (key === "Enter") {
//     textInputElement.classList.remove("error");
//     if (textInputElement.value === "") {
//       textInputElement.classList.add("error");
//       return;
//     } else if (nameInputElement.value === "") {
//       nameInputElement.classList.add("error");
//       return;
//     }
//     renderComments();
//   }

// });

// //замена символов
// function protectHtml(anything = "") {
//   return anything.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
// }

// // Ответ на комментарий

// const makeResponse = () => {

//   const allComments = document.querySelectorAll(".comment-text");
//   for (const oneComment of allComments) {
//     oneComment.addEventListener('click', () => {
//       const index = oneComment.dataset.reply;
//       textInputElement.value = "> " + comments[index].textComment + "\n" + comments[index].nameComment + ",";
//     });
//   }
// };

// makeResponse();

// //кнопка удаления
// deleteButton.addEventListener('click', () => {
//   listElement.lastElementChild.remove(`${textInputElement.value}`);
// });