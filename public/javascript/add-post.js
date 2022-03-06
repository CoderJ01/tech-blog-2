async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="b-title"]').value.trim();
    const blog_content = document.querySelector('textarea[name="bb-content"]').value.trim();

    console.log('This button works');
    console.log(title);
    console.log(blog_content);

    if (title && blog_content) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({
              title,
              blog_content
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
  