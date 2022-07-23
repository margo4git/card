import { chunk } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { DateY } from "../date/date";
import { Input } from "../input/Input";
import { Letter } from "../letter/letter";
import { Number } from "../number/number";
import classes from "./cart.module.css";

import visa from "../../images/visa.png";
import troy from "../../images/troy.png";
import amex from "../../images/amex.png";
import discover from "../../images/discover.png";
import mastercard from "../../images/mastercard.png";
import chip from "../../images/chip.png";

export const Cart = () => {
  const lengthNumbersCard = 16;
  const initialFullName = "FULL NAME";
  const reg_name_lastname = /^[a-zA-Z\s]*$/;

  const [numbers, setNumbers] = useState("");
  const [fullName, setFullName] = useState("");
  const [cvv, setCvv] = useState("");
  const [back, setBack] = useState(false);

  const [date, setDate] = useState({});

  const getCardType = useCallback(
    (numbers) => {
      let re = new RegExp("^4");
      if (numbers.match(re) != null) return visa;

      re = new RegExp("^(34|37)");
      if (numbers.match(re) != null) return amex;

      re = new RegExp("^5[1-5]");
      if (numbers.match(re) != null) return mastercard;

      re = new RegExp("^6011");
      if (numbers.match(re) != null) return discover;

      re = new RegExp("^9792");
      if (numbers.match(re) != null) return troy;

      return visa;
    },
    [numbers]
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const laterYear = currentYear + 5;
    const years = [];
    for (let i = currentYear; i <= laterYear; i++) {
      years.push(i);
    }
    return years;
  }, []);

  const months = useMemo(() => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i < 10 ? `0${i}` : i);
    }
    return months;
  }, []);

  const createArray = useCallback(
    (numbers) => {
      const arr = new Array(lengthNumbersCard - numbers.length).fill("");
      const result = numbers.split("").concat(arr);
      if (numbers.length > 4) {
        for (let i = 4; i < numbers.length && i <= lengthNumbersCard - 5; i++) {
          result[i] = "*";
        }
      }
      return result;
    },
    [numbers, lengthNumbersCard]
  );

  return (
    <div className={classes.container}>
      <div className={classes.flipCart}>
        <div
          className={
            classes.cartInner + ` ${back ? classes.cartInnerRotate : ""}`
          }
        >
          <div className={classes.cart}>
            <div className={classes.frontCard}>
              <div className={classes.containerTypeCard}>
                <img className={classes.typeCard} src={chip} />
                <img className={classes.typeCard} src={getCardType(numbers)} />
              </div>

              <div className={classes.numberContainer}>
                <div className={classes.borderNumbers}></div>
                {chunk(createArray(numbers), 4).map((array, id) => {
                  return (
                    <div key={id}>
                      {array.map((number, id) => {
                        return <Number number={number} key={id} />;
                      })}
                    </div>
                  );
                })}
              </div>
              <div className={classes.information}>
                <div className={classes.cardHolderExpires}>
                  <span className={classes.greyText}>Card Holder</span>
                  <div>
                    {!fullName ? (
                      <span>{initialFullName}</span>
                    ) : (
                      fullName
                        .slice(0, 20)
                        .split("")
                        .map((letter, id) => {
                          return <Letter letter={letter} key={id} />;
                        })
                    )}
                  </div>
                  {/* <span>{fullName || initialFullName}</span> */}
                </div>
                <div className={classes.cardHolderExpires}>
                  <span className={classes.greyText}>Expires</span>
                  <span>
                    {`${date.month || "MM"} / ${date.year || "YY"}`}
                    {/* <DateY
                      date={date.month || "MM"}
                      prevDate={date.prevMonth}
                    />
                    /{date.year || "YY"} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.cartBack}>
            <div className={classes.cartBackContainer}>
              <div className={classes.blackLine}></div>
              <span>CVV</span>
              <div className={classes.whiteLine}>
                <span>
                  {cvv
                    .split("")
                    .map((_) => "*")
                    .join("")}
                </span>
              </div>
              <img className={classes.typeCard} src={getCardType(numbers)} />
            </div>
          </div>
        </div>
      </div>
      <form
        className={classes.form}
        onSubmit={(ev) => {
          ev.preventDefault();

          alert("SUBMIT");
        }}
      >
        <Input
          label="Card Number"
          maxLength={lengthNumbersCard}
          value={numbers}
          onChange={({ target: { value } }) => {
            if (value.match(/[^0-9]/)) return;
            setNumbers(value);
          }}
        />
        <Input
          label="Card Holder"
          value={fullName}
          onChange={({ target: { value } }) => {
            if (value.match(/[^a-zA-Z ]/)) return;
            if (value.includes("  ")) {
              setFullName(value.replace("  ", " ").trim());
            } else {
              setFullName(value);
            }
          }}
        />
        <div className={classes.block}>
          <div className={classes.selectsContainer}>
            <span>Expiration Date</span>
            <div className={classes.selects}>
              <select
                name="Year"
                onChange={(event) => {
                  setDate((prevState) => ({
                    ...prevState,
                    year: event.target.value,
                  }));
                }}
              >
                {years.map((year, id) => {
                  return (
                    <option value={year} key={id}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <select
                name="Month"
                onChange={(event) => {
                  setDate((prevState) => ({
                    ...prevState,
                    month: event.target.value,
                    prevMonth: prevState.month || "MM",
                  }));
                }}
              >
                {months.map((month, id) => {
                  return (
                    <option value={month} key={id}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <Input
            label="CVV"
            value={cvv}
            maxLength={4}
            onChange={({ target: { value } }) => {
              if (value.match(/[^0-9]/)) return;
              setCvv(value);
            }}
            onFocus={() => {
              setBack(!back);
              console.log("focus", back);
            }}
            onBlur={() => {
              setBack(!back);
              console.log("blur", back);
            }}
          />
        </div>
        <button className={classes.sumbit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
