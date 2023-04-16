// "функция fetch вызывается только в этом модуле;" по ДЗ
import renderComments from "./renderComments.js";
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");

let comments = [];

const codeAdjust = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/anton-sobachkin/comments", {
        method: "GET"
      }).then((res) => {
        return res.json();
      })
      .then((responseData) => {
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
};

const addComm = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/anton-sobachkin/comments", {
    method: "POST",
    body: JSON.stringify({
      "text": textInputElement.value,
      "name": nameInputElement.value,
    //   forceError: true,
    }),
  })
  .then((response) => {
    renderComments();
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    if (response.status === 400) {
      throw new Error("too short");      }

    if (response.status === 500) {
      throw new Error("sever down");
    }
  })
  .catch((error) => {
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать"; 
    if (error.message === "sever down") {
      alert("Сервер сломался, попробуй позже");
      return;
    }    
    if (error.message === "too short") {
      alert("Имя и комментарий должны быть не короче 3 символов");  
      return;
    }  
    else {
     alert("Кажется, у вас сломался интернет, попробуйте позже");
    }
  });
};

export {addComm, codeAdjust, comments} ;