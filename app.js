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
      displayFamily(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      displayDescendants(personDescendants);
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
  let firstName = promptFor("What is the person's first name?", alphabetic);
  let lastName = promptFor("What is the person's last name?", alphabetic);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

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

function displayFamily(family) {
  alert(
    `Spouse:\n${family.spouse}\n\nParents:\n${family.parents} \n\nSiblings:\n${family.siblings}`
  );
}

function displayDescendants(descendants){
  if (Object.keys(descendants).length < 2) {
    alert(
      `Children:\n${descendants[1]}`
    )
  }
  alert(
    `Children:\n${descendants[1]}\n\nGrandchildren:\n${descendants[2]}`
  );
}
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


//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * Return a formatted string of names of people
 * @param {Array} people  Array of person objects
 * @returns {String}  String of names separated by newline
 */
function getNameListString(people) {
  return people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
}

/**
 * This function is used when searching the people collection by
 * one or more traits
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByTraits(people) {
  let traitSearchType = promptFor(
    "Do you want to search usig a single trait? Please type 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let traitSearchResults, personFound;
  switch (traitSearchType) {
    case "yes":
      traitSearchResults = searchBySingleTrait(people);
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
  return personFound;
}

/**
 * Prompts user to select a trait and trait value and use it in a search against
 * all person objects
 * @param {Array} people   An array of person objects
 * @returns {Array}    An array of person objects with the specified trait
 */
function searchBySingleTrait(people) {
  var trait = promptFor(
    `Please enter the trait you wish to search with: \nOptions:\n${Object.keys(people[0]).slice(3,9).join('\n')}`,
    traitType
  );
  let traitValue = promptFor(`Please enter the ${trait}: `, alphabetic);

  return filterBySingleTrait(people, trait, traitValue);
}

/**
 * Returns a filtered array of people objects matched against a specified trait value
 * @param {Array} people        An array of person objects
 * @param {String} traitKey     Specified trait type
 * @param {String} traitValue   Specified trait value
 * @returns {Array}             Array of person objects that match specified trait
 */
function filterBySingleTrait(people, traitKey, traitValue) {
  return people.filter((el) => {
    return el[traitKey] == traitValue;
  });
}

/**
 * Prompts user to select multiple traits and trait values and uses them in a 
 * search against collection of person objects.
 * @param {Array} people  An array of person objects
 * @returns {Array}       An array of person objects that match specified traits
 */
function searchByMultipleTraits(people) {
  let traits = promptFor(
    `Please enter the traits you wish to search with (separated by commas): \nOptions:\n${Object.keys(people).slice(3,9).join('\n')}`,
    traitType
  )
    .toLowerCase()
    .trim()
    .split(",");
  let traitValues = [];
  for (let trait of traits) {
    let value = promptFor(`Please enter the ${trait}: `, alphabetic);
    traitValues.push(value);
  }

  let multipleFilteredSearch = people;
  for (let i = 0; i < traits.length; i++) {
    multipleFilteredSearch = filterBySingleTrait(multipleFilteredSearch, traits[i], traitValues[i]);
  }
  return multipleFilteredSearch;
}

/**
 * Ask user if the result of their trait search matches their target, and redirect them.
 * @param {Array} results   Array of person objects from previous search
 * @param {Array} people    Array of all person objects
 * @returns {Function}
 */
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
}


/**
 * Compiles list of a person's family (i.e., spouse, parents, siblings)
 * @param {Object} person   Person object that function finding family members for
 * @param {Array} people    An array of all person objects
 * @returns {Object}        Object containing spouse, parents, siblings person objects
 */
 function findPersonFamily(person, people) {
  let family = {
    'spouse': `${person.firstName} has no spouse`,
    'parents': `${person.firstName} has no parents`,
    'siblings': `${person.firstName} has no siblings`
  };
  if (person.currentSpouse) {
    let spouse = people.filter((el) => {
      return el.id === person.currentSpouse;
    });
    family['spouse'] = getNameListString(spouse);
  }

  if (person.parents) {
    let parents = people.filter((el) => {
      return person.parents.includes(el.id);
    });
    if (parents.length > 0) {
      family['parents'] = getNameListString(parents);
    }
    
  }

  let siblings = people.filter((el) => {
    for (let parent of person.parents) {
      if (el.parents.includes(parent) && el !== person) {
        return true;
      }
    }
  });
  if (siblings.length > 0) {
    family['siblings'] = getNameListString(siblings);
  }

  return family;
}

/**
 * Recursively compiles list of a person's children and grandchildren
 * @param {Object} person       Person object for finding descendants
 * @param {Array} people        An array of all person objects
 * @param {Number} level        Generation/Depth of family tree (used in recursion)
 * @param {Object} descendants  Object containing children and grandchildren person arrays
 * @returns 
 */
function findPersonDescendants(person, people, level = 1, descendants = {}) {

  let children = people.filter((el) => {
    //children contains objects that have person's id as a parent
    return el.parents.includes(person.id);
  });

  if (children.length > 0) {
    descendants[level] = getNameListString(children)

    level++;
    for (let child of children) {
      descendants = findPersonDescendants(child, people, level, descendants);
    }
  } else {
    descendants[level] = "None"
  }
  return descendants;
}

/**
 * Validation function for trait type user input
 * 
 * Checks user input against a list of valid trait types
 * @param {String} input  Trait type user input
 * @returns {Boolean}
 */
 function traitType(input) {//searchByMultipleTraits, searchBySingleTrait, searchByName
  const validTraits = 'gender;dob;height;weight;eyeColor;occupation'.split(';');
  return validTraits.includes(input);
}

/**
 * Validation function for alphabetic input
 * 
 * Checks user input against a list of invalid characters.
 * @param {String} input  User input
 * @returns {Boolean} 
 */
function alphabetic(input){
  const numbers = "0123456789".split('')
  const symbols = "!@#$%^&*()_+=-{}|[]\;':\",./<>\?`~".split('')

  for (let char of input) {
    if (numbers.includes(char) || symbols.includes(char)) return false;
  }
  return true;
}
