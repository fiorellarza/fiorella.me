//= require_tree .

$(document).ready(function() {
  $.ajax({
    type: "POST",
    url: "https://medium.com/@damirkotoric/latest?format=json",
    data: { "patientID" : 1 },
    dataType: "json",
    success: function(jsonData) {
      alert(jsonData)
    },
    error: function() {
      //alert("Error loading")
    }
  })
})
