import React from 'react';
import './Table.css';
import numeral from 'numeral'

function Table( {countries} ) {
    return (
        <div className="table">
            {
                // Here {country, cases} is iterating through each object in
                // countries and picking out key-value pairs of country and
                // cases. Commented section next to codes below shows 
                // usual method.
            countries.map(({country, cases}) => (
              <tr>
                  <td>{country}</td>
                  <td> <strong> {numeral(cases).format("0,0")} </strong> </td>
              </tr>  
            ))
            // countries.map((country) => (
            //     <tr>
            //         <td>{country.country}</td>
            //         <td> <strong> {country.cases} </strong> </td>
            //     </tr>  
            //   ))
        }
        </div>
    )
}

export default Table
