var new_arr = JSON.parse(localStorage.getItem('posts')) || [];
var div_posts = document.getElementById('posts');
var XML = new XMLHttpRequest();
var posts_arr;

function create_elements() {
    var html = '';
    var elem = '';
    for (var i = 0; i < new_arr.length; i++) {
        elem = new_arr[i];
        parseInt(elem);
        html += `
                  <div id="${elem}">
                    <article class="menu">
                    <img src="img/delete.png" data-delete alt="ss">
                    </article>
                    <img src="img/menu.png" data-menu="false" alt="ss">
                      <h3>${posts_arr[elem].title}</h3>
                      <p>${posts_arr[elem].body}</p>
                  </div>
              `
    }
    document.querySelector("#posts").innerHTML = html;

}

XML.onload = function() {
    posts_arr = JSON.parse(XML.responseText);
    create_elements();
    //// CLICKED 
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
    document.querySelector('div#posts').addEventListener('click', e => {
        if (e.target.hasAttribute('data-menu')) {
            if (e.target.getAttribute('data-menu') === 'false') {
                e.target.style.transform = `rotate(360deg)`;
                e.target.setAttribute('data-menu', 'true');
                e.target.parentElement.style.marginTop = `100px`;
                e.target.parentElement.children[0].style.top = `-50px`;
            } else {
                e.target.style.transform = `rotate(0deg)`;
                e.target.setAttribute('data-menu', 'false');
                e.target.parentElement.style.margin = `15px`;
                e.target.parentElement.children[0].style.top = `0px`;
            }
        } else if (e.target.hasAttribute('data-delete')) {
            var elemID = e.target.parentElement.parentElement.id;
            document.getElementById(elemID).style.transform = `scale(0)`;
            for (var i = 0; i < new_arr.length; i++) {
                if (elemID == new_arr[i]) {
                    new_arr.splice(i, 1);
                    localStorage.setItem('posts', JSON.stringify(new_arr));
                }
            }
            setTimeout(() => {
                e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
            }, 500);
            // Тут осталось добавить скрипт, ищущий в массиве элемент и удаляющий его :3
        }
    })

    //// CLICKED END 
}
XML.open("GET", `https://jsonplaceholder.typicode.com/posts/`);
XML.send();