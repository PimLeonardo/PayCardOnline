import "./css/index.css";
import Imask from "imask";

const ccBgColor01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
);
const ccBgColor02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
);
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colorCard = {
    default: ["black", "grey"],
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    alelo: ["#02AA7D", "#04805E"],
    maestro: ["#3A9BD9", "#CC2131"],
    elo: ["#EF4123", "#FFCB05"],
    diners: ["#234B8D", "#235FC1"],
    caixa: ["#E8DB46", "#FFEF38"],
    hipercard: ["#822124", "#D03237"],
    american: ["#0077A6", "#3F8BA9"],
  };

  ccBgColor01.setAttribute("fill", colorCard[type][0]);
  ccBgColor02.setAttribute("fill", colorCard[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`);
}

globalThis.setCardType = setCardType;

const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
  mask: "0000",
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
};
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: "diners",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "american",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    let number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const findMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });
    return findMask;
  },
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);
