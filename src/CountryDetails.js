import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($name: String!) {
    country(name: $name) {
      name
      capital
      region
      population
      flag
    }
  }
`;

const CountryDetails = ({ countryName }) => {
  const params = useParams();
  console.log("Params", params);
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { name: params.name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { country } = data;

  return (
    <div class="card">
      <img src={country.flag} alt={`Flag of ${country.name}`} class="flag" />
      <h3>{country.name}</h3>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p style={{marginBottom:'18px'}}>
        <strong>Capital:</strong>
        {country.capital}
      </p>
    </div>
  );
};

export default CountryDetails;
