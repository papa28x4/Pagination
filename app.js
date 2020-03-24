let start = 0;
		let limit = 10;
		let count = 5000;
		let page = 1;
		let gap = 5;
		const prev = document.querySelector('#prev');
		const next = document.querySelector('#next');
		const pagination = document.querySelector('.pagination')
		const pages = document.querySelectorAll('.pagination a')
		const details = document.querySelector('.details');
		const filters = document.querySelector('.filters');
		


		filters.addEventListener('change', e => {
			limit = +e.target.value;
			displayPictures(start, limit)
		})
		pagination.addEventListener('click', e =>{
			
			if(e.target.id === 'next'){
				if(start < count){
					page++;
					start += limit;
					displayPictures(start, limit)
				}			
			}

			else if(e.target.id === 'prev'){
				if(start >= limit){
					page--;
					start -= limit;
					displayPictures(start, limit)
				}	
			}
			
			else{
				 const pages = document.querySelectorAll('.pagination a')
				 page = +e.target.textContent;
				 console.log(page)
		         pages.forEach(item => item.classList.remove('active'));
		         e.target.classList.add('active');
		         start = limit * (page - 1);
		         displayPictures(start, limit);
			}

		})
		

		function displayPictures(start, limit){
			// getCount();
			let endpoint = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
			console.log(endpoint)
			fetch(endpoint)
			.then(res => res.json())
			.then(images => {
				console.log(images)
				let html = "";
				let pages = Math.ceil(count / limit)
				console.log('total number of pages', pages)
				pagination.innerHTML = `<a id="prev" href="#">&laquo;</a>`
		
				console.log('currentPage in displayPicturesFxn',page)
				let maxRight = page + Math.floor(gap / 2)
				let maxLeft = page - Math.floor(gap / 2)
				console.log(maxRight, maxLeft)
				if(maxLeft <= 0) { maxLeft = 1; maxRight = gap}
				if(maxRight > pages) {maxRight = pages; maxLeft = pages - (gap-1)}
				console.log(maxRight, maxLeft)
				for(i=maxLeft; i<=maxRight; i++){
					pagination.innerHTML += i === page ? `<a class="active" href="#">${i}</a>` : `<a href="#">${i}</a>`
				}
				pagination.innerHTML += `<a id="next" href="#">&raquo;</a>`
				details.innerHTML = `On page ${page} of ${pages}`
				details.innerHTML = `On page ${page} of ${pages}, showing images ${images[0].id} to ${images[images.length - 1].id} `
				for (image of images){
					html += `<figure><img class="images" src="${image.url}"  alt="${image.title}">
					<figCaption><span>${image.title}</span></figcaption></figure>`;
					imagesBox.innerHTML = html;
				}
			})
			.catch(e => console.log(e));
		}

		 function getCount(){
			let endpoint = `https://jsonplaceholder.typicode.com/photos`;
			fetch(endpoint)
			.then(res => res.json())
			.then(data => count = data.length)
			.catch(e => console.log(e))
		}

		 

		 displayPictures(start, limit)

