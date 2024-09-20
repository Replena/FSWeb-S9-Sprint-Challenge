import React, { useState } from "react";

const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4;
const boundaryMessage = "Daha fazla ilerleyemezsiniz.";
const invalidEmailMessage = "Ouch: email must be a valid email";

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;

  function getXYMesaj() {
    return `Koordinatlar (${row}, ${column})`;
  }

  function reset() {
    setIndex(initialIndex);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setMessage(initialMessage);
  }

  function sonrakiIndex(yon) {
    const movements = {
      up: row > 1 ? index - 3 : index,
      down: row < 3 ? index + 3 : index,
      left: column > 1 ? index - 1 : index,
      right: column < 3 ? index + 1 : index,
    };
    return movements[yon];
  }

  function ilerle(evt) {
    const newIndex = sonrakiIndex(evt.target.id);

    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps((prevSteps) => prevSteps + 1);
      setMessage(initialMessage);
    } else {
      setMessage(boundaryMessage);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    if (email === "" || !email.includes("@")) {
      setMessage(invalidEmailMessage);
    } else {
      setMessage(`Başarıyla gönderildi: ${email}`);
      setEmail(initialEmail);
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates" data-testid="coordinates">
          {getXYMesaj()}
        </h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>

      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>

      <div className="info">
        <h3 id="message">{message}</h3>
      </div>

      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" value="Gönder" />
      </form>
    </div>
  );
}
