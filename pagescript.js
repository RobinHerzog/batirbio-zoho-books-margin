(function() {
  var node = document.createElement("style");
  document.body.appendChild(node);
  window.addStyleString = function(str) {
    node.innerHTML = str;
  };
})();

function hack() {
  if (document.location.href.indexOf("inventory") !== -1) {
    addStyleString(`
    .col-md-6 {
        width: 100% !important;
    }

    textarea.form-control {
        height: 400px !important;
    } 

    `);
  } else {
    addStyleString(`
    .col-md-6 {
        width: 50% !important;
    }

    .textarea.form-control {
        height: auto !important;
    } 

    `);
  }

  if (
    document.location.href.indexOf("edit") !== -1 &&
    document.location.href.indexOf("quotes") !== -1 &&
    typeof document.querySelectorAll(".qty-field") !== "undefined"
  ) {
    setInterval(() => {
      var qt = Array.from(document.querySelectorAll(".qty-field")).map(
        item => item.value
      );

      var rate_purchase = Array.from(
        document.querySelectorAll(
          ".line-item-body > tr > td:nth-child(3) input"
        )
      ).map(item => item.value);

      var total = [];

      rate_purchase.forEach(function(element, index) {
        total.push(rate_purchase[index] * qt[index]);
      });

      var rate_item = Array.from(
        document.querySelectorAll(".item-rate input")
      ).map(item => item.value);

      rate_item.forEach(function(element, index) {
        var tx_marque = 1 - rate_purchase[index] / rate_item[index];
        var i = index + 1;
        document.querySelector(
          ".line-item-body > tr:nth-child(" + i + ") > td:nth-child(4) input"
        ).value = Number(tx_marque * 100).toFixed(2) + "%";
      });

      const sum = total.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) + parseFloat(currentValue)
      );

      const discount = document.querySelector(
        ".total-section div:nth-child(2) > div.total-amount span"
      ).innerText;

      const newValue = Number(
        parseFloat(sum) - Math.abs(parseFloat(discount))
      ).toFixed(2);

      document.getElementById("marge").innerHTML = newValue;
      document.querySelector(".cf-item input").value = newValue;
    }, 2500);

    if (!document.querySelector("#marge")) {
      var wrapper = document.createElement("div");

      wrapper.innerHTML =
        '<div id="marge" style="min-width:150px;font-size: 20px;padding: 5px;position:fixed;right:20px;bottom:100px;background:#fff;display: flex;align-items: center;border: 1px solid #eee;justify-content: center;text-align: center;">Loading...</div>';

      document.body.appendChild(wrapper);
    }
  } else {
    if (typeof document.querySelector("#marge") !== "undefined")
      document.getElementById("marge").remove();
  }
}

hack();

window.onpopstate = function(event) {
  hack();
};
