const latestPosts = [
    {
      title: 'Post 1',
      date: 'March 1, 2024',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, consequatur laboriosam provident repellat necessitatibus corporis. Nobis nostrum voluptas quod expedita commodi aliquid voluptate fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni sint dignissimos vel eveniet, debitis, odio nesciunt nemo iste temporibus excepturi possimus. Dolore at quaerat eius similique reiciendis vero iure in ex fuga blanditiis!'
    },
    { 
      title: 'Post 2', 
      date: 'February 28, 2024',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, consequatur laboriosam provident repellat necessitatibus corporis. Nobis nostrum voluptas quod expedita commodi aliquid voluptate fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni sint dignissimos vel eveniet, debitis, odio nesciunt nemo iste temporibus excepturi possimus. Dolore at quaerat eius similique reiciendis vero iure in ex fuga blanditiis!'
    },
    {
      title: 'Post 3',
      date: 'February 27, 2024',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, consequatur laboriosam provident repellat necessitatibus corporis. Nobis nostrum voluptas quod expedita commodi aliquid voluptate fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni sint dignissimos vel eveniet, debitis, odio nesciunt nemo iste temporibus excepturi possimus. Dolore at quaerat eius similique reiciendis vero iure in ex fuga blanditiis!'
    }
  ];

  const trendingPosts = [
    {
      title: 'Post 1',
      date: 'March 1, 2024',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, consequatur laboriosam provident repellat necessitatibus corporis. Nobis nostrum voluptas quod expedita commodi aliquid voluptate fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni sint dignissimos vel eveniet, debitis, odio nesciunt nemo iste temporibus excepturi possimus. Dolore at quaerat eius similique reiciendis vero iure in ex fuga blanditiis!'
    },
    { 
      title: 'Post 2', 
      date: 'February 28, 2024',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, consequatur laboriosam provident repellat necessitatibus corporis. Nobis nostrum voluptas quod expedita commodi aliquid voluptate fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni sint dignissimos vel eveniet, debitis, odio nesciunt nemo iste temporibus excepturi possimus. Dolore at quaerat eius similique reiciendis vero iure in ex fuga blanditiis!'
    },
    {
      title: 'Post 3',
      date: 'February 27, 2024',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, consequatur laboriosam provident repellat necessitatibus corporis. Nobis nostrum voluptas quod expedita commodi aliquid voluptate fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni sint dignissimos vel eveniet, debitis, odio nesciunt nemo iste temporibus excepturi possimus. Dolore at quaerat eius similique reiciendis vero iure in ex fuga blanditiis!'
    }
  ];
  
  function renderLatestPosts() {
    const postsList = document.getElementById('posts-list');
  
    postsList.innerHTML = '';
  
    latestPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
  
      const titleElement = document.createElement('h3');
      titleElement.classList.add('post-title');
      titleElement.textContent = post.title;

      const content = document.createElement("p");
      content.classList.add('post-content');
      content.textContent = post.content;
  
      const dateElement = document.createElement('p');
      dateElement.classList.add('post-date');
      dateElement.textContent = 'Published on ' + post.date;
  
      postElement.appendChild(titleElement);
      postElement.appendChild(content);
      postElement.appendChild(dateElement);
  
      postsList.appendChild(postElement);
    });
  }

  function renderTrendingPosts() {
    const postsList = document.getElementById('trending-list');
  
    postsList.innerHTML = '';
  
    latestPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
  
      const titleElement = document.createElement('h3');
      titleElement.classList.add('post-title');
      titleElement.textContent = post.title;

      const content = document.createElement("p");
      content.classList.add('post-content');
      content.textContent = post.content;
  
      const dateElement = document.createElement('p');
      dateElement.classList.add('post-date');
      dateElement.textContent = 'Published on ' + post.date;
  
      postElement.appendChild(titleElement);
      postElement.appendChild(content);
      postElement.appendChild(dateElement);
  
      postsList.appendChild(postElement);
    });
  }
  
  window.addEventListener('load', renderLatestPosts);
  window.addEventListener('load', renderTrendingPosts);
  