function symptomIcons(type) {
  let img = "";

  switch (type) {
    case "Energy":
      img = require("../images/Symptoms/energy.png");
      break;
    case "Anxiety":
      img = require("../images/Symptoms/anxiety.png");
      break;
    case "Muscle strength":
      img = require("../images/Symptoms/muscle.png");
      break;
    case "Temperature":
      img = require("../images/Symptoms/temperature.png");
      break;
    case "Swelling neck":
      img = require("../images/Symptoms/throat.png");
      break;
    case "Brain fog":
      img = require("../images/Symptoms/brain.png");
      break;
  }
  return img;
}

export default symptomIcons;
