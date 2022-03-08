async function editFormHandler(event) {
    event.preventDefault();
  
    // const title = document.querySelector('input[name="b-title"]').value.trim();
    // const content = document.querySelector('textarea[name="bb-content"]').value.trim();
    // const id = window.location.toString().split('/')[
    //   window.location.toString().split('/').length - 1
    // ];

    console.log('This button works');
    // console.log(title);
    // console.log(id);
    // console.log(content);

    // if (title && content) {
        // const response = await fetch(`/api/blogs/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         title,
        //         content
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
    
        // if (response.ok) {
        //     document.location.replace('/dashboard');
        // } 
        // else {
        //     alert(response.statusText);
        // }
    // }
}
  
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);