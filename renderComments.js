import {comments} from "./api.js";
const listElement = document.getElementById("list");

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

likeButtonsListeners();

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
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
  };
  export default renderComments;