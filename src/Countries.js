import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import CountryDetails from "./CountryDetails";
import { Link } from "react-router-dom";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      capital
      region
      population
      flag
    }
  }
`;

const Countries = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countryList, setCountryList] = useState([]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    if (data?.countries) {
      setCountryList(data.countries);
    }
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (data?.countries) {
      const filtered = data.countries.filter((country) =>
        country.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCountryList(filtered);
    }
  };
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <input
          placeholder="search..."
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {countryList?.map((country, index) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/country/${country.name}`}
            key={index}
          >
            <div className="card">
              <div>
                {" "}
                <img
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  className="flag"
                />
              </div>
              <h3>{country.name}</h3>
              <p>
                <strong>Population:</strong> {country.population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p style={{ marginBottom: "18px" }}>
                <strong>Capital:</strong>
                {country.capital}
              </p>
            </div>
          </Link>
        ))}
        {/* {selectedCountry && <CountryDetails countryName={selectedCountry} />} */}
      </div>
    </>
  );
};

export default Countries;
