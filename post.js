let postId = new URLSearchParams(window.location.search);
let currentPostId = postId.get('id');

document.querySelector('.container').classList.add('mt-3','mb-5');


async function loadPost(postNumber) {
    response = await fetch (`https://gorest.co.in/public/v2/posts/${postNumber}`);//https://gorest.co.in/public/v2/posts/15645
    const data = await response.json();
    console.log(data);
    
    let postTitle = document.createElement('h1');
    postTitle.classList.add('mt-3','mb-5');
    postTitle.textContent = data.title;
    document.querySelector('.container').append(postTitle);

    let postBody = document.createElement('p');
    postBody.textContent = data.body;
    document.querySelector('.container').append(postBody);

    let commentSectionTitle = document.createElement('h2');
    commentSectionTitle.classList.add('mt-5','mb-3')
    commentSectionTitle.textContent = 'Комментарии:'
    document.querySelector('.container').append(commentSectionTitle);
    
    responseComment = await fetch (`https://gorest.co.in/public/v2/comments?post_id=${postNumber}`);
    const comments = await responseComment.json();
    console.log(comments);

    comments.forEach(element => {
        let commentList = document.createElement('ul');
        commentList.innerHTML = `<li class="col-4">${element.name} (${element.email}): <br> ${element.body}</li>`;//style="outline: 1px solid grey;"
        document.querySelector('.container').append(commentList);
        
        
    });

}
loadPost(currentPostId);

