/*==========
var click = 0;

document.getElementById('sleepyCat').addEventListener("click",
function catOpen(){
  document.querySelector('#testing').classList.toggle('hide');
});

document.getElementById("catPic").addEventListener("click", counterFunction);

// function for the click counter //
function counterFunction() {
  click++;
  document.getElementById("clickCounter").innerHTML = "Cat Clicking Counter: " + click;
};
==========*/


/* ======= Model ======= */

var model = {
    currentCat: null,
    adminShow: false, //hides the admin display area.
    cats: [
        {
            clickCount : 0,
            name : 'Doctor Cat',
            imgSrc : 'DoctorCat.jpg',
        },
        {
            clickCount : 0,
            name : 'Rainbow Cat',
            imgSrc : 'RainbowCat.jpg',
        },
        {
            clickCount : 0,
            name : 'Running Cat',
            imgSrc : 'RunningCat.jpg',
        },
        {
            clickCount : 0,
            name : 'Sleepy Cat',
            imgSrc : 'SleepyCat.jpg',
        },
        {
            clickCount : 0,
            name : 'Smiling Cat',
            imgSrc : 'SmilingCat.jpg',
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
        adminView.hide();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }

    //function runs when 'Admin' button is clicked.
    adminDisplay: function(){
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show(); //displays the admin input boxes and buttons
        }
        else if (model.adminShow === true) {
            model.adminShow = false;
            adminView.hide();// hides the admin input boxes and buttons
        }
    },

    //hides admin display when cancel button is clicked.
    adminCancel: function(){
        adminView.hide();
    },

    //hides admin display and saves new cat data when save button is clicked.
    adminSave: function(){
        model.currentCat.name= adminCatName.value;
        model.currentCat.imgSrc= adminCatURL.value;
        model.currentCat.clickCount= adminCatClicks.value;
        catView.render();
        catListView.render();
        adminView.hide();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }

    var adminView = {
    init: function(){
        this.adminCatName = document.getElementById("adminCatName");
        this.adminCatURL = document.getElementById("adminCatURL");
        this.adminCatClicks = document.getElementById("adminCatClicks");
        var admin = document.getElementById("admin");

        this.adminBtn = document.getElementById("adminBtn");
        this.adminCancel = document.getElementById("adminCancel");
        this.adminSave = document.getElementById("adminSave");

        this.adminBtn.addEventListener('click', function(){ //shows the admin display.
            octopus.adminDisplay();
        });

        this.adminCancel.addEventListener('click', function(){ //hides the admin display without saving any new cat data.
            octopus.adminCancel();
        });

        this.adminSave.addEventListener('click', function(){ //hides the admin display and saves new cat data.
            octopus.adminSave();
        });

        this.render();
    },

    render: function(){
        var currentCat = octopus.getCurrentCat(); //calls current cat
        this.adminCatName.value = currentCat.name;
        this.adminCatURL.value = currentCat.imgSrc;
        this.adminCatClicks.value = currentCat.clickCount;
    },

    show: function(){
            admin.style.display = 'block'; //shows the admin div on index.html
        },

    hide: function(){
        admin.style.display = 'none';
    }
  };

// make it go!
octopus.init();
