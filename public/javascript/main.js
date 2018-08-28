function refreshPage() {
    window.location.reload();
}


function showQuote(id, message){
    document.getElementById(id).innerHTML = message;
}

function zoomUp() {
    document.write("<img align='center' src=\"./images/image3.jpg\" width=\"500\" height=\"450\">" + "<br><br>" +
                   "<div style=\"color:#0000FF\">This done only for demonstration purposes.</div>"+
                   "<button class = \"btn\" onclick=\"refreshPage()\">Go Back</button>");
}