// allow user to comment on other user's blogs
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.getElementById('comment').value.trim();
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
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
  
document.getElementById('submit-comment').addEventListener('click', commentFormHandler);
  