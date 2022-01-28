import React, {useState, useEffect} from 'react';
import App from '../../App';
import './Button.css';

function Button(props) {
  
const [rates, setRates] = useState({});    
//const [conversionDropdownIsShowing, setConversionDropdownIsShowing] = useState(false);
//const [conversionCurrencies, setConversionCurrencies] = useState([]);

useEffect(() => {
    doFetchConvert()
  }, [])


function doFetchConvert() {
    fetch('https://kc-exchangeratesapi.herokuapp.com/latest')
    .then(response => response.json())
    .then(jsonData => {
        setRates(jsonData['rates']);
    });
}



  return (

    <div className="button-dropdown">
      <button className="dropbtn" id="navButton" onClick={props.showCurrencies}>{props.title}</button>
      <div 
        className={props.className}
        id={props.id}
      >
        {Object.entries(rates).map(([key, value]) => {
          return <button 
                    style={props.style}
                    id={key} 
                    onClick={props.selectConversionCurrency}
                  >
                    {key}
                    
                  </button>
        })}
      </div>
    </div>
  );
}

export default Button;