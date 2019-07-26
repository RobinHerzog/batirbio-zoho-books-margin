if (document.location.href.indexOf("edit") !== -1) {
  setInterval(() => {
    const sum = Array.from(document.querySelectorAll(".item-cf  .cf-field"))
      .map(item => item.value)
      .reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) + parseFloat(currentValue)
      );

    const discount = document.querySelector(
      ".total-section div:nth-child(2) > div.total-amount span"
    ).innerText;

    document.getElementById("marge").innerHTML = Number(
      parseFloat(sum) - Math.abs(parseFloat(discount))
    ).toFixed(2);
  }, 2000);

  var wrapper = document.createElement("div");

  wrapper.innerHTML =
    '<div id="marge" style="width:150px;/* height:30px; */font-size: 20px;padding: 5px;position:fixed;right:20px;bottom:100px;background:#fff;display: flex;align-items: center;border: 1px solid #eee;justify-content: center;text-align: center;">Loading...</div>';

  document.body.appendChild(wrapper);
}
