search = () => {
    let mealName = document.getElementById("input-meal-name").value.trim();
    if (mealName === "") {
        warningText("Please Enter a Meal Name");
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    warningText("No Meal Found");
                } else {
                    displayMeal(data.meals[0]);
                    //after finding the meal, clear the input field
                    document.getElementById("input-meal-name").value = "";
                }
            })
    }
    //hide warning after 3 seconds
    setTimeout(function () {
        warningText("");
    }, 3000);


}

// If no meals are found or no entries are made, an alert will be shown.
warningText = (message) => {
    document.getElementById("warning").innerText = message;
}

displayMeal = (data) => {
    //creating a div for search result
    document.getElementById("meal-details-display").innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${data.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title meal-title">${data.strMeal}</h5>
    </div>
    </div>
    `;

    //getting the ingredient list
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let measure = 'strMeasure' + i;
        if (data[ingredient] === "" || data[ingredient] == null) {
            break;
        }
        const li = document.createElement("li");
        li.innerHTML = `
        <li><i class="icon-color fas fa-check-square"></i> ${data[measure]}, ${data[ingredient]}</li>
        `;
        getIngredientList = document.getElementById("ingredient-list")
        getIngredientList.appendChild(li);
        document.getElementById("ingredient-display").style.display = "none";
    }
    //The meal card is hidden and the ingredient is shown.
    document.getElementById("meal-details").addEventListener('click', () => {
        document.getElementById("ingredient-display").style.display = "block";
        document.getElementById("meal-details-display").style.display = "none";
    })
}