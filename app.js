$(document).ready(() => {

  function checkToken() {
    const accessToken = localStorage.accessToken
    if (accessToken) {
      $('#dasboard').removeClass('hide')
      $('#login').addClass('hide')
    }else{
      $('#login').removeClass('hide')
      $('#dasboard').addClass('hide')
    }
  }

  function doLogout() {
    localStorage.removeItem('accessToken')
  }


  function doLogIn() {
    console.log("masuk do login");
    const url = "http://localhost:3000/user/login";

    const email = $("#email").val();
    const password = $("#password").val();

    $.ajax({
      url,
      method: "POST",
      data: {
        email,
        password,
      },
    })
    .done((response) => {
      localStorage.accessToken = response.accessToken
      checkToken()
    })
    .fail((jqXHR, textStatus, errorThrown)=>{
      console.error(jqXHR, textStatus, errorThrown);
    })
  }

  $("form#formLogin").submit((event) => {
    event.preventDefault();
    doLogIn();
  });
  $('#logout').click(()=>{
    doLogout()
    checkToken()
  })
});
