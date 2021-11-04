import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [allNumbers, setAllNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [limitError, setLimitError] = useState(false);

  let number = [];
  for (let i = 1; i <= 48; i++) {
    let color;
    if (i === 1 || i === 9 || i === 17 || i === 25 || i === 33 || i === 41) {
      color = "rgb(255, 191, 0)";
    } else if (i === 2 || i === 10 || i === 18 || i === 26 || i === 34 || i === 42) {
      color = "rgb(255, 128, 0)";
    } else if (i === 3 || i === 11 || i === 19 || i === 27 || i === 35 || i === 43) {
      color = "rgb(255, 0, 0)";
    } else if (i === 4 || i === 12 || i === 20 || i === 28 || i === 36 || i === 44) {
      color = "rgb(255, 0, 191)";
    } else if (i === 5 || i === 13 || i === 21 || i === 29 || i === 37 || i === 45) {
      color = "rgb(191, 0, 255)";
    } else if (i === 6 || i === 14 || i === 22 || i === 30 || i === 38 || i === 46) {
      color = "rgb(0, 0, 255)";
    } else if (i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47) {
      color = "rgb(0, 191, 255)";
    } else if (i === 8 || i === 16 || i === 24 || i === 32 || i === 40 || i === 48) {
      color = "rgb(0, 255, 128)";
    }

    const numbObj = {
      number: i,
      color: color,
      opacity: "1",
    };
    number.push(numbObj);
  }
  useEffect(() => {
    setAllNumbers(number);
  }, []);

  const selectNumbers = (item, i) => {
    const newSelectedNumbers = [...selectedNumbers];

    newSelectedNumbers.push(item);
    if (newSelectedNumbers.length <= 10) {
      setSelectedNumbers(newSelectedNumbers);
      allNumbers[i].opacity = "0.3";
    } else {
      setLimitError(true);
      setTimeout(() => {
        setLimitError(false);
        setAllNumbers(number);
      }, 4000);
    }
  };

  const randomRumbers = () => {
    let randomNumberArray = [];
    allNumbers.forEach((item) => {
      item.opacity = "1";
    });
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * 48);
      randomNumberArray.push(allNumbers[random]);
      allNumbers[random].opacity = "0.3";
    }
    setSelectedNumbers(randomNumberArray);
  };

  const getEveryColor = (color) => {
    const numberColor = allNumbers.filter((item) => {
      return item.color === color;
    });
    allNumbers.forEach((item) => {
      if (item.color === color) {
        return (item.opacity = "0.3");
      } else {
        item.opacity = "1";
      }
    });
    setSelectedNumbers(numberColor);
  };

  const reset = () => {
    setSelectedNumbers([]);
    setAllNumbers(number);
  };

  return (
    <div className="App">
      <div className="App__container">
        <div className="App__selection">
          <ul className="App__numberSlection">
            {allNumbers.map((item, i) => {
              return (
                <li
                  style={{
                    backgroundColor: `${item.color}`,
                    opacity: `${item.opacity}`,
                  }}
                  onClick={() => selectNumbers(item, i)}
                >
                  {item.number}
                </li>
              );
            })}
          </ul>
          <ul className="App__colorPalette">
            {allNumbers.map((item) => {
              if (item.number <= 8) {
                return (
                  <li
                    onClick={(e) => getEveryColor(e.target.style.backgroundColor)}
                    style={{ backgroundColor: `${item.color}` }}
                  ></li>
                );
              } else return null;
            })}
          </ul>
          <div className="App__buttons">
            <button onClick={randomRumbers}>RANDOM 6</button>
            <button onClick={reset}>RESET</button>
          </div>
        </div>
        <div className="App__results">
          <h3>Brojevi</h3>
          <div className="App__line"></div>
          <ul>
            {selectedNumbers.map((item) => {
              return <li style={{ backgroundColor: `${item.color}` }}>{item.number}</li>;
            })}
          </ul>
          {limitError ? (
            <div className="App__error">
              <h2>Greška</h2>
              <h2>Možete izabrati maksimalno deset brojeva </h2>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
