jQuery(document).ready(function () {

    var object;
    var added = 0;

    function callAPI() {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            success: function (result) {
                object = result;
                sessionStorage.object = object;
                console.log(object);
                document.querySelector('.loader').innerHTML = '';
                object.forEach(element => {
                    var h3 = document.createElement('h3');
                    h3.textContent = element.title.charAt(0).toUpperCase() + element.title.slice(1);
                    h3.classList.add('mt-3');

                    var div = document.createElement('span');
                    div.innerHTML = '<a href="" class="btn btn-elegant" data-toggle="modal" data-target="#modalArticleUpdate">Éditer</a>';

                    div.addEventListener('click', function () {
                        document.getElementById('editTitle').value = element.title.charAt(0).toUpperCase() + element.title.slice(1);
                        document.getElementById('editContent').innerHTML = element.body.charAt(0).toUpperCase() + element.body.slice(1);
                        document.getElementById('updateArticle').dataset.id = element.id;
                    });

                    var deleteButton = document.createElement('span');
                    deleteButton.innerHTML = '<a class="btn btn-danger">Supprimer</a>';
                    deleteButton.addEventListener('click', function () {
                        supprimer(element.id);
                    });

                    h3.addEventListener('click', function () {
                        sessionStorage.title = element.title;
                        sessionStorage.body = element.body;
                        window.location = 'article.html';
                    })

                    document.querySelector('.titles').appendChild(h3);
                    document.querySelector('.titles').appendChild(div);
                    document.querySelector('.titles').appendChild(deleteButton);


                    var hr = document.createElement('hr');
                    document.querySelector('.titles').appendChild(hr);

                });
            }
        });
    }

    function supprimer(index) {
        $.ajax({
            method: 'DELETE',
            url: "https://jsonplaceholder.typicode.com/posts/" + (index - 1),
            data: {
                title: document.getElementById('addTitle').value,
                body: document.getElementById('addTitle').value
            },
            success: function (result) {
                console.log(result);
                console.log('supprimé')
                delete object[index - 1];
                refreshWithoutCallAPI();
            }
        });
    }

    document.getElementById('search').addEventListener('keyup', () => {
        refreshWithSearsh(document.getElementById('search').value);
    });

    function refreshWithSearsh(keyword) {
        document.querySelector('.titles').innerHTML = '';
        sessionStorage.object = object;
        console.log(object);
        document.querySelector('.loader').innerHTML = '';
        object.forEach(element => {
            if (element.title.includes(keyword)) {
                var h3 = document.createElement('h3');
                h3.textContent = element.title.charAt(0).toUpperCase() + element.title.slice(1);
                h3.classList.add('mt-3');

                var div = document.createElement('span');
                div.innerHTML = '<a href="" class="btn btn-elegant" data-toggle="modal" data-target="#modalArticleUpdate">Éditer</a>';
                div.addEventListener('click', function () {
                    document.getElementById('editTitle').value = element.title.charAt(0).toUpperCase() + element.title.slice(1);
                    document.getElementById('editContent').innerHTML = element.body.charAt(0).toUpperCase() + element.body.slice(1);
                });

                var deleteButton = document.createElement('span');
                deleteButton.innerHTML = '<a class="btn btn-danger">Supprimer</a>';
                deleteButton.addEventListener('click', function () {
                    supprimer(element.id);
                });

                h3.addEventListener('click', function () {
                    sessionStorage.title = element.title;
                    sessionStorage.body = element.body;
                    window.location = 'article.html';
                });

                document.querySelector('.titles').appendChild(h3);
                document.querySelector('.titles').appendChild(div);
                document.querySelector('.titles').appendChild(deleteButton);

                var hr = document.createElement('hr');
                document.querySelector('.titles').appendChild(hr);
            }
        });
    }


    function refreshWithoutCallAPI() {
        document.querySelector('.titles').innerHTML = '';
        sessionStorage.object = object;
        console.log(object);
        document.querySelector('.loader').innerHTML = '';
        object.forEach(element => {
            var h3 = document.createElement('h3');
            h3.textContent = element.title.charAt(0).toUpperCase() + element.title.slice(1);
            h3.classList.add('mt-3');

            var div = document.createElement('span');
            div.innerHTML = '<a href="" class="btn btn-elegant" data-toggle="modal" data-target="#modalArticleUpdate">Éditer</a>';
            div.addEventListener('click', function () {
                document.getElementById('editTitle').value = element.title.charAt(0).toUpperCase() + element.title.slice(1);
                document.getElementById('editContent').innerHTML = element.body.charAt(0).toUpperCase() + element.body.slice(1);
            });

            var deleteButton = document.createElement('span');
            deleteButton.innerHTML = '<a class="btn btn-danger">Supprimer</a>';
            deleteButton.addEventListener('click', function () {
                supprimer(element.id);
            });

            h3.addEventListener('click', function () {
                sessionStorage.title = element.title;
                sessionStorage.body = element.body;
                window.location = 'article.html';
            });

            document.querySelector('.titles').appendChild(h3);
            document.querySelector('.titles').appendChild(div);
            document.querySelector('.titles').appendChild(deleteButton);

            var hr = document.createElement('hr');
            document.querySelector('.titles').appendChild(hr);
        });
    }



    document.getElementById('addArticle').addEventListener('click', function () {
        document.getElementById('loaderModal').style.display = "block";
        $.ajax({
            method: 'POST',
            url: "https://jsonplaceholder.typicode.com/posts",
            data: {
                title: document.getElementById('addTitle').value,
                body: document.getElementById('addTitle').value
            },
            success: function (result) {
                document.getElementById('loaderModal').style.display = "none";

                var element = {};
                element.id = 100 + added;
                element.title = result.title;
                element.body = result.body;
                object.push(element);

                refreshWithoutCallAPI();

            }
        });
    })

    document.getElementById('updateArticle').addEventListener('click', function () {
        $.ajax({
            method: 'PUT',
            url: "https://jsonplaceholder.typicode.com/posts/" + document.getElementById('updateArticle').dataset.id,
            data: {
                title: document.getElementById('editTitle').value,
                body: document.getElementById('editContent').value
            },
            success: function (result) {
                console.log(result)

                document.getElementById('loaderModal').style.display = "none";

                object[document.getElementById('updateArticle').dataset.id - 1].title = document.getElementById('editTitle').value;
                object[document.getElementById('updateArticle').dataset.id - 1].body = document.getElementById('editContent').value;

                refreshWithoutCallAPI();

            }
        });
    })

    callAPI();

});