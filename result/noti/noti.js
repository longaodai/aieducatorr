$(function () {
  var salesPopUp =
    '<section class="sales-social-proof">' +
    '<div class="sales-notification">' +
    '<div class="sales-notification-container row ">' +
    '<div class="sales-notification-content-wrapper col-md-12 mt-2">' +
    '<img id="js-product-image" src="" class="img-fluid d-block mx-auto noti-image">' +
    '<p class="sales-notification-content">Someone from <span id="js-store-branch"></span></p> <p>recently bought <a id="js-product-name" href=""></a></p>' +
    '<small><span id="time"></span> minutes ago &nbsp;<i class="fa fa-check-circle"></i> Verified by <a class="poweredby" href="https://wisernotify.com" target="_blank">wisernotify</a></small>' +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div class="sales-custom-close"></div>' +
    "</div>" +
    "</section>";

  $(salesPopUp).appendTo("body");

  function randData() {

    var timeVal = Math.floor(20 * Math.random());
    $("#time").text(timeVal);

    var locArray = [];
    fetch("https://store-zby41x9gmk.mybigcommerce.com/content/suburbs.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        $.each(myJson, function (i, val) {
          $.each(val, function (k, v) {
            locArray.push(v);

            var randomLocation =
              locArray[Math.floor(Math.random() * locArray.length)];

            $("#js-store-branch").text(
              randomLocation[1] +
              ", " +
              randomLocation[2] +
              " " +
              randomLocation[0]
            );
          });
        });
      })
      .catch(function (err) {
        console.log("error: " + err);
      });
  }




  var trans = {
    transaction: [
      {
        product: "AI Educator",
        imglink:
          "https://aieducatorr.com/special/images/notificatin.png",
        productlink:
          "#"
      }
    ]
  };



  var counter = Math.floor(Math.random() * 5);

  var rand = Math.round(Math.random() * (10000 - 3000)) + 3000;

  // (function loop() {

  // setTimeout(function () {
  //     $(".sales-social-proof").toggle("fast");
  //   }, 2000);


  setTimeout(notifier, rand);
  setInterval(notifier, 40000);
  // })();

  function notifier() {

    randData();
    //$(".sales-social-proof").toggle("fast");
    $(".sales-social-proof").toggle("slow", function () {
      //alert(rand);
      counter++
      // console.log(counter);

      if (counter == 5) {
        counter = 0;
        rand = 50000;//Math.round(Math.random() * (5000 - 3000)) + 3000;
      }

      if (trans.transaction[counter]) {
        $("#js-product-image").attr("src", trans.transaction[counter].imglink);
        $("#js-product-name").text(trans.transaction[counter].product);
        $("#js-product-name").attr("href", trans.transaction[counter].productlink);
      }
    });

    setTimeout(notifierclose, 10000);
    //loop();
  }

  function notifierclose() {
    $(".sales-social-proof").toggle("slow");
  }

  $(".sales-custom-close").click(function () {
    $(".sales-social-proof").toggle("slow");
  });
});