import React, {useState, useEffect} from 'react';
import './Nav.css';

import Button from '../Button/Button';

function Nav(props) {

  const [rates, setRates] = useState({});    
  const [conversionDropdownIsShowing, setConversionDropdownIsShowing] = useState(false);
  const [conversionCurrencies, setConversionCurrencies] = useState([]);

// use a .map to loop through and put the fetch function in App.js
// look at quiditch activities for reference


  useEffect(() => {
    function doFetchConvert() {
      fetch('https://kc-exchangeratesapi.herokuapp.com/latest')
      .then(response => response.json())
      .then(jsonData => {
          setRates(jsonData['rates']);
      });
    }
    doFetchConvert()
  }, []);


  
  function selectConversionCurrency(clicked_id) {
    let currencyName = clicked_id.target.id;
    let newArray = [...conversionCurrencies, currencyName];
    let content = document.getElementById('maincontent');
    content.innerHTML = "";
    let currencyValues = [];

    removeDuplicate(newArray);
    setConversionCurrencies(newArray);
    
    console.log('Currencies:', newArray);

    fetch('https://kc-exchangeratesapi.herokuapp.com/latest')
    .then(response => response.json())
    .then(jsonData => {
      for(let currency of newArray) {
        currencyValues.push(jsonData['rates'][currency]);
  
        if(newArray.includes(currency)) {
          console.log('turning green:', currency); 

          let height = jsonData['rates'][currency] * 100;
          let chart = document.createElement('div');
          content.appendChild(chart);
          chart.setAttribute('class', 'BarChart-bar')
          chart.setAttribute('onClick', "alert('1 EUR = " + jsonData['rates'][currency] + " " + currency + "')");
          chart.setAttribute('style', "height: calc(" + height + "px)");
          chart.innerHTML += currency;
        }
      }

      let max = Math.max(...currencyValues);
      console.log('Currency Values:', currencyValues);
      console.log('Max num:', max);
    });

    if(!newArray.includes(currencyName)) {
      console.log('turning white: ', currencyName);
      content.innerHTML -= currencyName;
    }     
  }


  // Helper functions to remove duplicates in the conversionCurrency array
  function removeDuplicate(arr){
    let result = false;
    // iterate over the array
    for(let i = 0; i < arr.length;i++) {
        // compare the first and last index of an element
        if(arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])){
          result = true;
          if(result) {
            removeItemAll(arr, arr[i]);
            } 
        }
    }
  }
  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  const keys = Object.keys(rates);
  let value;
  for(let key in keys) {
    value = key;
  }
  console.log('value', value)

  function showConversionDropDown() {
    setConversionDropdownIsShowing(!conversionDropdownIsShowing);
    console.log('Dictionary:', rates);
    //console.log('Keys:', keys);
  }

  console.log('Conversion currencies:', conversionCurrencies);

  function hasCommonElements(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
  }

  let filteredArray = conversionCurrencies.filter(value => keys.includes(value));
  console.log('filtered array:', filteredArray);



  return (
    <div className="NavBar">
        
        <Button
            title="Base Currency: EUR"
            className={`dropdown-content ${conversionDropdownIsShowing ? "" : ""}`}
        />

        <Button
            title="Convert to:"
            className={`dropdown-content ${conversionDropdownIsShowing ? "show" : ""}`}
            id="conversionDropDown"
            showCurrencies={showConversionDropDown}
            selectConversionCurrency={selectConversionCurrency}
            style={{backgroundColor: conversionCurrencies.includes(keys) ? "lightgreen" : "white"}}
            
        >
          
        </Button>



        
        
    </div>
  );
}

export default Nav;