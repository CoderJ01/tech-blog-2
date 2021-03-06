// allow user to add blog post
async function newFormHandler(event) {
    event.preventDefault();
  
    const blog_title = document.querySelector('input[name="b-title"]').value.trim();
    const blog_text = document.querySelector('textarea[name="bb-content"]').value.trim();

    if (blog_title && blog_text) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({
              blog_title,
              blog_text
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert(response.statusText);
          }
    }
}
  
document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
  