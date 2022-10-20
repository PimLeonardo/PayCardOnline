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
