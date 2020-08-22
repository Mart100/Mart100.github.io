"use strict";

$(function () {
  //titleFun()
  //rainbowBackground()
  subscribe();
  console.log('Ehhh');
});

function titleFun() {
  var stateL = 0;
  var stateR = 2;
  var states = ['_--', '-_-', '--_', '-_-'];
  setInterval(function () {
    $('title').html(states[stateL] + ' Mart ' + states[stateR]);
    stateL++;
    stateR++;
    if (stateL > 3) stateL = 0;
    if (stateR > 3) stateR = 0;
  }, 350);
}

function rainbowBackground() {
  var min = 10;
  var max = 50;
  var color = {
    r: 30,
    g: 30,
    b: 30
  };
  var crrntCol = 'r';
  setInterval(function () {
    if (crrntCol == 'r') {
      color.r++;
      if (color.r > max) crrntCol = 'g';
      if (color.g > min) color.g--;
      if (color.b > min) color.b--;
    }

    if (crrntCol == 'g') {
      color.g++;
      if (color.g > max) crrntCol = 'b';
      if (color.b > min) color.b--;
      if (color.r > min) color.r--;
    }

    if (crrntCol == 'b') {
      color.b++;
      if (color.b > max) crrntCol = 'r';
      if (color.r > min) color.r--;
      if (color.g > min) color.g--;
    }

    $('body').css('background-color', "rgb(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")"));
  }, 100);
}

function subscribe() {
  // subscribe button click
  $('#subscribe').on('click', function () {
    var email = $('#newsletter > input').val();
    $.get('https://news-letter.herokuapp.com/email', email, function (response) {
      console.log(response);
      var del = false;

      if (response == 'SUCCESS') {
        $('#newsletter > p').html('Succesfully subscribed to the newsletter!. Check email for a verification email');
        del = true;
      } else if (response == 'EMAIL_DUPLICATE') {
        $('#newsletter > p').html('This email is already subscribed!');
        del = true;
      } else if (response == 'INVALID_EMAIL') {
        $('#newsletter > p').html('Hmm. This email doesnt seem to be valid. Refresh and try again!');
        del = false;
      }

      if (del) {
        $('#subscribe').remove();
        $('#newsletter > input').remove();
      }
    });
  });
}