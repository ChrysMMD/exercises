//Jeg bruger JSX-syntax i koden, og derfor skal REact importeres for at JSX-kode kan forståes.
import React from "react";

//Funktionel komponent. FC betyder Functional Component, som er en type i Typescript, der giver mig autocomplete og type-checking, når jeg arbejder med komponenter.
const CookieConsent: React.FC = () => {
  return (
    //Containeren for hele min cookie-meddelelse. Det er normalt HTML. I React bruges der className i stedet for class, fordi class er et reserveret ord i JAvascript.
    <div className="container">
      {/* Inde i wrapperen bruger jeg flexbox med justify-between og items-center.
      Jeg sætter også begrænsninger på boksens bredde og centrere den. */}
      <p className="text">
        We use cookies to ensure you get the best experience on our website.
      </p>
      {/*En knap med baggrundsfarve, padding, tekstfarve og en rundet form. */}
      <button className="knap">Accept</button>
    </div>
  );
};

export default CookieConsent;
