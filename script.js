const accesskey = 'pfukYC3wn-tQA6Y1FZUKDj6Wd1FKvh7EFtLyTz7RSpg';
const searchform = document.querySelector('.form');  
const imagecontainer = document.querySelector('.image');  
const searchinput = document.querySelector('.search-input');  
const loadbtn = document.querySelector('.loadmorebtn');
let page = 1;

const fetchimage = async (query, pgno) => {
    if (page === 1)
        imagecontainer.innerHTML = ''; 

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pgno}&client_id=${accesskey}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch images: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.results.length > 0) {
            data.results.forEach(photo => {

                
                const imageelement = document.createElement('div');
                imageelement.classList.add('imgdiv');
                imageelement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description || 'Image'}" />`;

                
                const overlayelement = document.createElement('div');
                overlayelement.classList.add('overlay');

               
                const overlaytext = document.createElement('h3');
                overlaytext.innerHTML = `${photo.alt_description}`;
                overlayelement.appendChild(overlaytext);
                imageelement.appendChild(overlayelement);

               
                imagecontainer.appendChild(imageelement);
            });

            if (data.total_pages === pgno) {
                loadbtn.style.display = "none";
            } else {
                loadbtn.style.display = "block";
            }
        }

        else{
            imagecontainer.innerHTML = `<h2>No image found.</h2>`;
            if(loadbtn.style.display==='block')
                loadbtn.style.display==='none';
        }


    } catch (error) {
        console.error('Error fetching images:', error);
    }
};

searchform.addEventListener('submit', (e) => {
    e.preventDefault();  
    const inputtext = searchinput.value.trim();  
    if (inputtext !== '') {
        page = 1;
        fetchimage(inputtext, page);  
    } else {
        imagecontainer.innerHTML = `<h2>Please Enter a search term</h2>`;  
    }
});

loadbtn.addEventListener('click', () => {
    const query = searchinput.value.trim();
    if (query === '') {
        alert('Please enter a search term first!');
        return;
    }
    fetchimage(query, ++page); 
});
