// allow user to update blog
async function editFormHandler(event) {
    event.preventDefault();
  
    const blog_title = document.querySelector('input[name="b-title"]').value.trim();
    const blog_text = document.querySelector('textarea[name="bb-content"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    if (blog_title && blog_text) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
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
        } 
        else {
            alert(response.statusText);
        }
    }
}
  
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);