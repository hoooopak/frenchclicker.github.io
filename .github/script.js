cash = 0;
croissant = { production: 0, value: 2, amount: 0 };
unlockpower = {
  chef: 1,
  bakery: 4,
  market: 8,
  factory: 20,
  industry: 60,
  company: 150,
};
unlocks = {
  chef: 0,
  bakery: 0,
  market: 0,
  factory: 0,
  industry: 0,
  company: 0,
};
unlockstatus = {
  bakery: false,
  market: false,
  factory: false,
  industry: false,
  company: false,
};
upgradeprices = {
  tef: 2,
  tea: 3,
  je: 2,
  jv: 3,
};
prices = {
  chef: 100,
  bakery: 300,
  market: 600,
  factory: 1500,
  industry: 4000,
  company: 10000,
};

sellrate = 5000;
upgrades = { tef: 0, tea: 0, je: 0, tc: 0, tv: 0, jv: 0 };
producerate = 1000;
maxsell = 20;
upgradeffect = {
  tef: ["50", "100", "300", "750", "2000", "6000"],
  tea: ["4", "3.5", "2.5", "2", "1"],
  je: ["3", "4", "5", "6", "10"],
  jv: [""],
};
function romanize(num) {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    roman = "",
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
function makeintervalsell() {
  if (sellinterval == null) {
    sellinterval = setInterval(() => {
      $("#pro1").animate(
        {
          width: "100%",
        },
        sellrate - 0.02
      );
      sell();
    }, sellrate);
  }
}
$("document").ready(function () {
  croissantdisplay = document.getElementById("croissants");
  cashdisplay = document.getElementById("cash");
  function lockchange() {
    if (unlocks.chef >= 5) {
      $(".bakerylock").attr("aria-disabled", "false");
      $(".bakerybutton").prop("disabled", false);
      unlockstatus.bakery = true;
    }
    if (unlockstatus.bakery == true) {
      unlockstatus.market = true;
      $(".market").css("display", "block");
    }
    if (unlocks.bakery >= 10) {
      $(".marketlock").attr("aria-disabled", "false");
      $(".marketbutton").prop("disabled", false);
      unlockstatus.factory = true;
    }
    if (unlocks.market >= 15) {
      $(".factorylock").attr("aria-disabled", "false");
      $(".factorybutton").prop("disabled", false);
      unlockstatus.industry = true;
    }
    if (unlockstatus.factory == true) {
      $(".factory").css("display", "block");
    }
    if (unlockstatus.industry == true) {
      $(".industry").css("display", "block");
    }
    if (unlocks.factory >= 25) {
      $(".industrylock").attr("aria-disabled", "false");
      $(".industrybutton").prop("disabled", false);
      unlockstatus.company = true;
    }
    if (unlockstatus.company == true) {
      $(".company").css("display", "block");
    }
    if (unlocks.industry >= 50) {
      $(".companylock").attr("aria-disabled", "false");
      $(".companybutton").prop("disabled", false);
    }
  }
  setInterval(() => {
    lockchange();
    upgradecheck();
    cashdisplay.innerHTML = cash;
  }, 10);
  function loopsell() {
    setTimeout(() => {
      sell();
      keep();
    }, sellrate);
  }
  function keep() {
    loopsell();
  }
  keep();
  function loopproduce() {
    setTimeout(() => {
      produce();
      keepproduce();
    }, producerate);
  }
  function keepproduce() {
    loopproduce();
  }
  keepproduce();
});
function sell() {
  $("#pro1").animate(
    {
      width: "100%",
    },
    sellrate - 0.02
  );
  if (croissant.amount >= maxsell) {
    croissant.amount -= maxsell;
    cash += maxsell * croissant.value;
    croissantdisplay.innerHTML = croissant.amount;
    cashdisplay.innerHTML = cash;
  } else {
    current = croissant.amount;
    croissant.amount -= croissant.amount;
    cash += current * croissant.value;
    croissantdisplay.innerHTML = croissant.amount;
    cashdisplay.innerHTML = cash;
  }
  $("#pro1").animate(
    {
      width: "0px",
    },
    0
  );
}
// port
const nameplural = {
  chef: "Chefs",
  bakery: "Bakeries",
  market: "Markets",
  factory: "Factories",
  industry: "Industries",
  company: "Corp.",
};
const pricetier = [
  "chef",
  "bakery",
  "market",
  "factory",
  "industry",
  "company",
];
const pricepair = { tef: "chef", tea: "bakery", je: "market" };
function upgradescale(upgrade, price, type) {
  console.log(type);
  console.log(upgrade);
  console.log(upgradeprices[upgrade]);
  cost = pricetier.indexOf(type);
  console.log(cost);
  nexttier = pricetier[(cost += 1)];
  console.log(nexttier);
  if (price >= 4) {
    upgradeprices[upgrade] = Math.ceil(upgradeprices[upgrade] / 1.5);
    console.log(upgradeprices[upgrade]);
    pricepair[upgrade] = nexttier;
    $("#" + upgrade).text(
      upgradeprices[upgrade] + " " + nameplural[pricepair[upgrade]]
    );
  }
  if (upgrade == "chef") {
    upgradeprices[upgrade] = 3;
    console.log(upgradeprices[upgrade]);
    pricepair[upgrade] = nexttier;
    $("#" + upgrade).text(
      upgradeprices[upgrade] + " " + nameplural[pricepair[upgrade]]
    );
  } else {
    upgradeprices[upgrade] += Math.ceil(upgradeprices[upgrade] / 1.5);
    console.log(upgradeprices[upgrade]);
    $("#" + upgrade).text(
      upgradeprices[upgrade] + " " + nameplural[pricepair[upgrade]]
    );
  }
}
//
function upgradecheck() {
  if (upgrades.tef >= 1) {
    if (upgrades.tef == 1) {
      maxsell = 50;
    }
    if (upgrades.tef == 2) {
      maxsell = 100;
    }
    if (upgrades.tef == 2) {
      maxsell = 300;
    }
    if (upgrades.tef == 3) {
      maxsell = 750;
    }
    if (upgrades.tef == 4) {
      maxsell = 2000;
    }
    if (upgrades.tef == 5) {
      maxsell = 6000;
    }
  }
  if (upgrades.tea >= 1) {
    if (upgrades.tea == 1) {
      sellrate = 4000;
    }
    if (upgrades.tea == 2) {
      sellrate = 3500;
    }
    if (upgrades.tea == 2) {
      sellrate = 2500;
    }
    if (upgrades.tea == 3) {
      sellrate = 2000;
    }
    if (upgrades.tea == 4) {
      sellrate = 1000;
    }
  }
  if (upgrades.je >= 1) {
    if (upgrades.je == 1) {
      croissant.value = 3;
    }
    if (upgrades.je == 2) {
      croissant.value = 4;
    }
    if (upgrades.je == 3) {
      croissant.value = 5;
    }
    if (upgrades.je == 4) {
      croissant.value = 6;
    }
    if (upgrades.je == 5) {
      croissant.value = 10;
    }
  }
  if (upgrades.jv >= 1) {
    if (upgrades.je == 1) {
      croissant.value = 3;
    }
    if (upgrades.je == 2) {
      croissant.value = 4;
    }
    if (upgrades.je == 3) {
      croissant.value = 5;
    }
    if (upgrades.je == 4) {
      croissant.value = 6;
    }
    if (upgrades.je == 5) {
      croissant.value = 10;
    }
  }
}
function levelchange(u) {
  classlevel = "#" + u + "level";
  console.log(classlevel);
  $(classlevel).text(romanize(upgrades[u]));
  $(classlevel).removeClass();
  $(classlevel).addClass("l" + upgrades[u]);
  $(classlevel).addClass("level");
  console.log(romanize(upgrades[u]));
}
function buyupgrade(upgrade, currency, price) {
  console.log(unlocks[currency]);
  if (unlocks[currency] >= price) {
    unlocks[currency] -= price;
    upgrades[upgrade] += 1;
    power = unlockpower[currency];
    croissant.production -= Number(power) * price;
    document.getElementById(currency).innerHTML = unlocks[currency];
    levelchange(upgrade);
    upgradescale(upgrade, price, currency);
    upgradecheck();
    list = upgradeffect[upgrade];
    index = list.indexOf($("." + upgrade + "stat").text());
    console.log(index + "fda");
    $("." + upgrade + "stat").text(upgradeffect[upgrade][(index += 1)]);
    if (upgrades[upgrade] == 5) {
      classbutton = "." + upgrade + "-button";
      $("#" + upgrade).text("MAX");
      $("#" + upgrade).addClass("max");
      $(classbutton).attr("disabled", "true");
    }
  }
}

function produce() {
  $("#pro2").animate(
    {
      width: "100%",
    },
    producerate
  );
  croissant.amount += croissant.production;
  croissantdisplay.innerHTML = croissant.amount;
  $("#pro2").animate(
    {
      width: "0px",
    },
    0
  );
}
function clicked() {
  croissant.amount += 1;
  croissantdisplay.innerHTML = croissant.amount;
}

function buy(price, unlock, stat) {
  if (cash >= price) {
    $("#pro2").removeAttr("style").css("display", "block");
    $("#pro2bar").removeAttr("style").css("display", "block");
    amount = document.getElementById(unlock).innerHTML;
    amountnum = Number(amount);
    amountnum += 1;
    document.getElementById(unlock).innerHTML = amountnum;
    console.log(unlock + amountnum + amount);
    croissant.production += stat;
    cash -= price;
    unlock;
    unlocks[unlock] += 1;
    cashdisplay.innerHTML = cash;
    amountchange();
  } else {
  }
}
function amountchange() {
  document.getElementById("bakeryamount").innerHTML = 5 - unlocks.chef;
  document.getElementById("marketamount").innerHTML = 10 - unlocks.bakery;
  document.getElementById("factoryamount").innerHTML = 15 - unlocks.market;
  document.getElementById("industryamount").innerHTML = 25 - unlocks.factory;
  document.getElementById("companyamount").innerHTML = 50 - unlocks.industry;
}
