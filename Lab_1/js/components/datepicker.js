$(function () {
    $("#datepicker1").datepicker();
    $("#datepicker2").datepicker();
});
function compareDates() {
    var d1 = $("#datepicker1").datepicker('getDate');
    var d2 = $("#datepicker2").datepicker('getDate');
    if (d1 < d2) {
        alert("data pierwsza jest wcześniej od drugiej");
    }
    if (d1 == d2) {
        alert("daty takie same");
    }
}