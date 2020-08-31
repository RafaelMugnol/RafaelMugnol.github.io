var baseUrl = 'https://mail-marketing-dot-grendene-digital-commerce.rj.r.appspot.com';

function handleSubmit() {
  event.preventDefault();

  axios.post(baseUrl + '/getToken', null, {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJncmVuZGVuZV9pbm92YWNhb0BncmVuZGVuZS5jb20uYnIiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE2MjM5NjI0MzAsImlhdCI6MTU5MjQyNjQzMH0.zOS8ADR4Qau2zEnS4AW1bokJxuQ9ZXTLF2FnjmoQCv0',
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      sendLead(response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function sendLead(token) {
  var email = document.getElementById("txtEmail").value;
  var size = document.getElementById("slcSize").value;
  var brands = $('#slcBrands').multipleSelect('getSelects').join();

  var data = {
    email: email,
    footNumber: size,
    siteid: "LojaGrendene",
    brands: brands
  };

  axios.put(baseUrl + '/mailmarketing', data, {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      document.getElementById("form").style.display = "none";
      document.getElementById("divSuccess").style.display = "block";
    })
    .catch(function (error) {
      console.log(error);
    });
}

//http://multiple-select.wenzhixin.net.cn/examples#i18n.html#view-source
$(function() {
  $('#slcBrands').multipleSelect({
    multiple: true,
    formatSelectAll () {
      return '[Todas marcas]';
    },
    formatAllSelected () {
      return 'Todas marcas';
    },
    formatCountSelected (count, total) {
      return count + ' selecionadas';
    },
    width: 195,
    multipleWidth: 150,
    dropWidth: 150,
    position: 'top'
  })
})