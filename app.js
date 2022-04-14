/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////

      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      let personFamily = findPersonFamily(person[0], people);
      displayPeople(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      displayPeople(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", charsName);
  let lastName = promptFor("What is the person's last name?", charsName);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

function searchByTraits(people) {
  let traitSearchType = promptFor(
    "Do you want to search usig a single trait? Please type 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let traitSearchResults, personFound;
  switch (traitSearchType) {
    case "yes":
      traitSearchResults = searchBySingleTrait(people);
      //displayPeople(traitSearchResults);
      personFound = searchConfirmation(traitSearchResults, people);
      break;
    case "no":
      traitSearchResults = searchByMultipleTraits(people);
      personFound = searchConfirmation(traitSearchResults, people)
      break;
    default:
      searchByTraits(people);
      break;
  }
  mainMenu(personFound, people)
}

function searchBySingleTrait(people) {
  var trait = promptFor(
    "Please enter the trait you wish to search with: \nOptions:\ngender\ndob\nheight\nweight\neyecolor\noccupation",
    chars
  );
  let traitValue = promptFor(`Please enter the ${trait}: `, chars);

  return filterBySingleTrait(people, trait, traitValue);
}

function filterBySingleTrait(people, traitKey, traitValue) {
  return people.filter((el) => {
    return el[traitKey] == traitValue;
  });
}

function searchByMultipleTraits(people) {
  let traits = promptFor(
    "Please enter the traits you wish to search with (separated by commas): \nOptions:\ngender\ndob\nheight\nweight\neyecolor\noccupation",
    chars
  )
    .toLowerCase()
    .trim()
    .split(",");
  let traitValues = [];
  for (let trait of traits) {
    let value = promptFor(`Please enter the ${trait}: `, chars);
    traitValues.push(value);
  }

  //   filter list of people to match gender
  //  filter list of people with gender to match height
  //  filter list of people with gender, height to match weight

  let temp = people;
  for (let i = 0; i < traits.length; i++) {
    temp = filterBySingleTrait(temp, traits[i], traitValues[i]);
  }
  return temp;
}

function searchConfirmation(results, people){
  //to ask if user sees the person they are searching for.
  //if so, select them so that person can be passed to mainmenu
  displayPeople(results);
  let foundPerson = promptFor("Did you see the person you were searching for? 'yes' or 'no'", yesNo);
  if(foundPerson === "yes"){
    return searchByName(people);
  }
  else{
    return searchByTraits(people);
  }


  //let userResponse = promptFor("Please enter the name of the person you were searching for: ", chars);
}

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `DOB: ${person.dob}\n`;
  personInfo += `Height: ${person.height} in.\n`;
  personInfo += `Weight: ${person.weight} lb.\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  return personInfo;
}
// End of displayPerson()

/**
 *
 * @param {Object} person
 * @param {Array} people
 */
function findPersonFamily(person, people) {
  let family = [];
  if (person.currentSpouse) {
    var spouse = people.filter((el) => {
      return el.id === person.currentSpouse;
    });
    family.push(...spouse);
  }

  if (person.parents) {
    var parents = people.filter((el) => {
      return person.parents.includes(el.id);
    });
    family.push(...parents);
  }

  var siblings = people.filter((el) => {
    for (let parent of person.parents) {
      if (el.parents.includes(parent) && el !== person) {
        return true;
      }
    }
  });
  family.push(...siblings);
  return family;
}
// End of findPersonFamily()

function findPersonDescendants(person, people) {
  let descendants = [];

  let children = people.filter((el) => {
    //children contains objects that have person's id as a parent
    return el.parents.includes(person.id);
  });
  descendants.push(...children);

  if (children.length > 0) {
    for (let child of children) {
      descendants.push(...findPersonDescendants(child, people));
    }
  } else {
    return descendants;
  }
  return descendants;
}

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {//searchByMultipleTraits, searchBySingleTrait, searchByName
  input = input.toLowerCase();
  return (input === "gender" || input === "dob" || input === "height" || input === "weight" || input === "eyecolor" || input === "occupation");
}
// End of chars()

function charsName(input){
  return typeof input === "string";
}

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
