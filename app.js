let restaurantList = document.getElementById("restaurantList");
let restaurantSort = document.getElementById("restaurantSort");
let restaurantSearch = document.getElementById("restaurantSearch");
let data = [];

const api_Url = "http://localhost:3000/restaurants";
async function getResto() {
    const response = await fetch(api_Url);
    data = await response.json();
    console.log(data);
    displayData(data);
};

getResto();

//show restaurants
function displayData(data) {
    const htmlString = data.map((data) => {
        return `<li class="element">
                    <img src = "${data.restaurant.thumb}"/>
                    <p><b>${data.restaurant.name}</b> <br>
                   ${data.restaurant.cuisines}<br>
                    Rating: ${data.restaurant.user_rating.aggregate_rating}<br>
                    Min Cost for two: ₹${data.restaurant.average_cost_for_two}</p>
        
                </li>`;
    }).join('');
    restaurantList.innerHTML = htmlString;
}

//Search restaurants
restaurantSearch.addEventListener('keyup', (event) => {
    let userSearchText = event.target.value.toLowerCase();
    let filteredResto = data.filter(elt => {
        return elt.restaurant.name.toLowerCase().includes(userSearchText) || elt.restaurant.cuisines.toLowerCase().includes(userSearchText);
    })
    displayData(filteredResto);
});



