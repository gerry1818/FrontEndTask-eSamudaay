//This function called when keyup event happen in the search box.
function change() {
   
    var name = $(".myFilter").val();
    var element = document.getElementById("data");
    element.innerHTML = '';
    
    $.ajax({
        type: "GET",
        url: "https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?page=1&limit=10&name=" + name,
        dataType: "json",
        success: function (result, status, xhr) {
            for (var i = 0; i < result.length; i++) {
                var obj = result[i];
                var body;
                var months = countMonth(obj.bornAt);
                body = '<div class="row"> <div class="column" style="background-color:#ccc;"> <h2>' + obj.name + '</h2> <p>Age: ' + months + ' months</p></div></div>';
                $("#data").append(body);
            }

        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });

}

//loadData from paggination page change
function loadData(page){
    var element = document.getElementById("data");
    element.innerHTML = '';
    $.ajax({
        type: "GET",
        url: "https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?page="+page+"&limit=10",
        dataType: "json",
        success: function (result, status, xhr) {
            for (var i = 0; i < result.length; i++) {
                var obj = result[i];
                var body;
                var months = countMonth(obj.bornAt);
                body = '<div class="row"> <div class="column" style="background-color:#ccc;"> <h2>' + obj.name + '</h2> <p>Age: ' + months + ' months</p></div></div>';
                $("#data").append(body);

            }

        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });
}

$(document).ready(function () {
    $('.pagination').twbsPagination({
        totalPages: 9,//total pages
        visiblePages: 3,//Visible pages on paggination
        onPageClick: function (event, page) {
            loadData(page);
        }
    });

});

//sorting data by age
function sort() {
    var element = document.getElementById("data");
    element.innerHTML = '';
    $.ajax({
        type: "GET",
        url: "https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?page=1&limit=10&sortBy=bornAt&order=desc",
        dataType: "json",
        success: function (result, status, xhr) {
            for (var i = 0; i < result.length; i++) {
                var obj = result[i];
                var body;
                var months = countMonth(obj.bornAt);
                body = '<div class="row"> <div class="column" style="background-color:#ccc;"> <h2>' + obj.name + '</h2> <p>Age: ' + months + ' months</p></div></div>';
                $("#data").append(body);

            }

        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });
}

//calculate Age
function countMonth(t1) {
    var d1 = new Date(t1);
    var d2 = new Date();
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months;
}
