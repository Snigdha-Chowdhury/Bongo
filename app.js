let restaurantList = document.getElementById("restaurantList");
let restaurantSort = document.getElementById("restaurantSort");
let restaurantSearch = document.getElementById("restaurantSearch");
let restaurantFavorites = document.getElementById("restaurantFavorites");
let restaurantFavoritesShow = document.getElementById("restaurantFavoritesShow");
let suggestions = document.querySelector('.suggestions');

let data = [];

//const api_Url = "http://localhost:3000/restaurants";
 const api_Url = "https://snigdha-chowdhury.github.io/Bongo/restaurant.json";
async function getResto() {
    const response = await fetch(api_Url);
    data = await response.json();
    data = data.restaurants;
    console.log(data);
    displayData(data);
};

window.onload = getResto();

//show restaurants
function displayData(data) {
    const htmlString = data.map((data) => {
        return `<li class="element">
                    <img src = "${data.restaurant.thumb}"/>
                    <p><b>${data.restaurant.name}</b> <br>
                   ${data.restaurant.cuisines}<br>
                    Rating: ${data.restaurant.user_rating.aggregate_rating}<br>
                    Min Cost for two: ₹${data.restaurant.average_cost_for_two}</p><br>
                    <button style="border:2px solid black; text-align: center" class="btn btn-primary" id="favoriteItem" onClick="fav('${data.restaurant.name}')">Favorites</button>
                </li>`;
    }).join('');
    restaurantList.innerHTML = htmlString;
}

//Search restaurants
restaurantSearch.addEventListener('keyup', (event) => {
    let userSearchText = event.target.value.toLowerCase();
    suggestions.innerHTML = '';
    let suggestionResto = data.filter(elt => {
        return elt.restaurant.name.toLowerCase().startsWith(userSearchText) || elt.restaurant.cuisines.toLowerCase().startsWith(userSearchText);
    });
    suggestionResto.forEach(item => {
        let div = document.createElement('div');
        div.innerHTML = item.restaurant.name;
        suggestions.appendChild(div);
    })
    if (userSearchText == '') {
        suggestions.innerHTML = '';
    }

    let filteredResto = data.filter(elt => {
        return elt.restaurant.name.toLowerCase().includes(userSearchText) || elt.restaurant.cuisines.toLowerCase().includes(userSearchText);
    })
    displayData(filteredResto);
});


//favorite restaurants
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
function fav(name) {
    let index = favorites.indexOf(name);
    if (index == -1) {
        favorites.push(name);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}


restaurantFavorites.addEventListener('click', (e) => {
    console.log(e);
    let showFavorites = JSON.parse(localStorage.getItem('favorites'));

    if (restaurantFavoritesShow.style.display === 'none') {
        restaurantFavoritesShow.style.display = 'block';
        restaurantFavoritesShow.innerHTML = '';
        showFavorites.forEach(elt => {
            let li = document.createElement('li');
            li.innerHTML = elt;
            restaurantFavoritesShow.appendChild(li);
        })
    } else {
        restaurantFavoritesShow.style.display = 'none';
    }

});
// console.log(JSON.parse(localStorage.getItem('favorites')));


// sort restaurant 
function sortRestaurantByRating() {
    let optionSelected = restaurantSort.value;
    // console.log(optionSelected);
    if (optionSelected === 'rating') {
        let restaurantSortedByRating = data.sort(function (a, b) {
            return b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating;
        });
        // console.log(restaurantSortedByRating);
        displayData(restaurantSortedByRating);
    }else if (optionSelected === 'name') {
        let restaurantSortedByName = data.sort((a,b) => {
            return a.restaurant.name.localeCompare(b.restaurant.name);
        });
        // console.log(restaurantSortedByName);
        displayData(restaurantSortedByName);
    }
}



