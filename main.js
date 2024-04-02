let ul = document.getElementById("userUL")
let postul = document.getElementById("postUL")

fetch("https://jsonplaceholder.typicode.com/users")
.then(response =>response.json())
.then(data =>{
    data.forEach(user => {
        let li = document.createElement("li")
        li.innerText = user.name
        ul.appendChild(li)
        li.setAttribute("data-id",user.id)
        li.onclick = function(e){
            let userId = e.target.getAttribute("data-id")
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts =>{
                posts.forEach(post => {
                    let postLi = document.createElement("li")
                    let details = document.createElement("a")
                    // let postId = post.id
                    postLi.innerText = post.title
                    details.innerText = "Details"
                    // details.setAttribute("href",`https://jsonplaceholder.typicode.com/posts/${postId}`)
                    details.setAttribute("href", "#");
                    details.addEventListener("click", function() {
                        openPostDetails(post);
                    });
                    postLi.appendChild(details)
                    postul.appendChild(postLi)
                })
            })
            .catch(error => console.error('Error fetching posts:', error));
        }
    });
}) .catch(error => console.error('Error fetching users:', error));


function openPostDetails(post) {
    let postDetails = `
        <h2>Post Details</h2>
        <p><strong>ID:</strong> ${post.id}</p>
        <p><strong>Title:</strong> ${post.title}</p>
        <p><strong>User ID:</strong> ${post.userId}</p>
        <p><strong>Body:</strong> ${post.body}</p>
    `;
    let newWindow = window.open();
    newWindow.document.body.innerHTML = postDetails;
}