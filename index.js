  const URL_API = "https://jsonplaceholder.typicode.com";

  var request = new XMLHttpRequest();
  request.open("GET", `${URL_API}/posts`);
  //https://jsonplaceholder.typicode.com/posts

  request.onload = function() {
      var array = JSON.parse(this.responseText);
      var html = '';
      array.forEach(element => {
          html += `
                <div>
                    <button class="save" onclick="save(${element.id})">Save</button>
                    <h3>${element.title}</h3>
                    <p>${element.body}</p>
                </div>
            `
      });

      //  html += 
      document.querySelector("#posts").innerHTML = html;
      document.querySelector('header').addEventListener('click', e => {
          if (e.target.hasAttribute('data-menu')) {
              if (e.target.getAttribute('data-menu') === 'false') {
                  e.target.style.transform = `rotate(360deg)`;
                  e.target.setAttribute('data-menu', 'true');
                  document.getElementById('right_nav').style.right = `0px`;
              } else {
                  e.target.style.transform = `rotate(0deg)`;
                  e.target.setAttribute('data-menu', 'false');
                  document.getElementById('right_nav').style.right = `-100px`;
              }
          }
      })
  }

  request.send();

  let titleElem = document.querySelector("#title");
  let bodyElem = document.querySelector("#body");
  let keywordsElem = document.querySelector("#keywords");

  document.querySelector("#keywords").addEventListener('input', search);
  titleElem.onclick = function() {
      if (titleElem.checked) {
          bodyElem.removeAttribute("disabled");
      } else {
          bodyElem.setAttribute("disabled", "disabled");
      }
      search();
  };
  bodyElem.onclick = function() {
      if (bodyElem.checked) {
          titleElem.removeAttribute("disabled");
      } else {
          titleElem.setAttribute("disabled", "disabled");
      }
      search();
  };;

  function search() {
      let items = document.querySelectorAll('#posts > div');
      for (var i = 0; i < items.length; i++) {
          var titleRes = false;
          var bodyRes = false;
          if (titleElem.checked) {
              titleRes =
                  items[i]
                  .querySelector('h3')
                  .innerHTML
                  .includes(keywordsElem.value);
          }
          if (bodyElem.checked) {
              bodyRes =
                  items[i]
                  .querySelector('p')
                  .innerHTML
                  .includes(keywordsElem.value);
          }
          items[i].style.display = titleRes || bodyRes ? "block" : 'none';
      }
  }

  function save(id) {
      var arr = JSON.parse(localStorage.getItem('posts')) || [];
      arr = arr.filter(e => e != id);
      arr.push(id);
      localStorage.setItem('posts', JSON.stringify(arr));
  }