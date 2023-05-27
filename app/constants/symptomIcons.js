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
  }
  return img;
}

export default symptomIcons;
