import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import React, { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from "next/link";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] < b[value] ? 1 : -1));
  }
  return countries;
};

function CountriesTable({ countries }) {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState("population");

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value1) => {
    if (value1 === value) {
      switchDirection();
    } else {
      setDirection("desc");
    }
    setValue(value1);
  };

  const orderedCountries = orderBy(countries, value, direction);

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <div className={styles.heading_arrow}>
            {direction &&
              value === "name" &&
              (direction === "asc" ? (
                <KeyboardArrowDownRounded />
              ) : direction === "desc" ? (
                <KeyboardArrowUpRounded />
              ) : (
                <></>
              ))}
          </div>
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <div className={styles.heading_arrow}>
            {direction &&
              value === "population" &&
              (direction === "asc" ? (
                <KeyboardArrowDownRounded />
              ) : direction === "desc" ? (
                <KeyboardArrowUpRounded />
              ) : (
                <></>
              ))}
          </div>
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          <div className={styles.heading_arrow}>
            {direction &&
              value === "area" &&
              (direction === "asc" ? (
                <KeyboardArrowDownRounded />
              ) : direction === "desc" ? (
                <KeyboardArrowUpRounded />
              ) : (
                <></>
              ))}
          </div>
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          <div className={styles.heading_arrow}>
            {direction &&
              value === "gini" &&
              (direction === "asc" ? (
                <KeyboardArrowDownRounded />
              ) : direction === "desc" ? (
                <KeyboardArrowUpRounded />
              ) : (
                <></>
              ))}
          </div>
        </button>
      </div>
      {orderedCountries.map((country, index) => (
        <Link href={`/country/${country.alpha3Code}`} key={index}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountriesTable;
