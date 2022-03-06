// allow user to comment on other user's blogs
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    
    const blog_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    console.log('button clicked');
    console.log(blog_id);
    console.log(comment_text);
  
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          blog_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
  
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  