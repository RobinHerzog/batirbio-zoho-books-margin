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
      console.log("setInterval");
      const qt = [];
      const rate_item = [];
      const rate_purchase_2 = [];
      const rate_sold = [];
      const total = [];
      let SumPrixVente = 0;
      const item = Array.from(
        document.querySelectorAll(".line-item-body > tr")
      );

      item.forEach(function(e, index) {
        if (e.classList.contains("line-item-column-Header")) {
          rate_purchase_2.push(null);
          qt.push(null);
          rate_item.push(null);
          rate_sold.push(null);
        } else {
          rate_purchase_2.push(
            e.querySelector("td:nth-child(3) input").value || "0"
          );
          qt.push(e.querySelector(".qty-field").value);
          rate_item.push(e.querySelector(".item-rate input").value);

          let prixVente = e
            .querySelector(".item-amount")
            .innerText.replace(/,/g, ".")
            .replace(/ /g, "");

          rate_sold.push(parseFloat(prixVente));
          SumPrixVente += parseFloat(prixVente);
        }
      });

      for (indexTotal = 0; indexTotal <= rate_purchase_2.length; indexTotal++) {
        if (rate_purchase_2[indexTotal]) {
          total.push(rate_purchase_2[indexTotal] * qt[indexTotal]);
        }
      }

      rate_purchase_2.forEach(function(element, index) {
        if (rate_purchase_2) {
          var tx_marque = 1 - rate_purchase_2[index] / rate_item[index];
          var indexElement = index + 1;

          const query = document.querySelector(
            ".line-item-body > tr.new-line-item:not(.line-item-column-Header):nth-child(" +
              indexElement +
              ") > td:nth-child(4) input"
          );

          if (query) {
            query.value = Number(tx_marque * 100).toFixed(2) + "%";
          }
        }
      });

      const sumPrixAchat = total.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) + parseFloat(currentValue)
      );

      console.log("sumPrixAchat", sumPrixAchat);
      console.log("SumPrixVente", SumPrixVente);

      let adjustment = parseFloat(
        document
          .querySelector(".label-editable .col-md-4 input")
          .value.replace(/ /g, "")
      );

      if (isNaN(adjustment)) {
        adjustment = 0;
      }

      const discount = document
        .querySelector(
          ".total-section div:nth-child(2) > div.total-amount span"
        )
        .innerText.replace(/ /g, "");

      console.log("discount", Math.abs(parseFloat(discount)));
      console.log("adjustment", adjustment);

      let newValue = Number(
        SumPrixVente -
          parseFloat(sumPrixAchat) -
          Math.abs(parseFloat(discount)) +
          adjustment
      ).toFixed(2);

      if (adjustment >= 0) {
        newValue = Number(
          SumPrixVente -
            parseFloat(sumPrixAchat) -
            Math.abs(parseFloat(discount)) +
            Math.abs(adjustment)
        ).toFixed(2);
      }
      if (adjustment < 0) {
        newValue = Number(
          SumPrixVente -
            parseFloat(sumPrixAchat) -
            Math.abs(parseFloat(discount)) -
            Math.abs(adjustment)
        ).toFixed(2);
      }

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
    if (document.querySelector("#marge"))
      document.getElementById("marge").remove();
  }
}

hack();

window.onpopstate = function(event) {
  console.log("Update page");
  hack();
};
