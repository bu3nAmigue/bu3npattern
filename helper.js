var modal = document.getElementById("showInfo");
var tweetM =  document.getElementById("twitterWrapper");
var btn = document.getElementById("btn");
var tweetB =  document.getElementById("tweetB");
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];


window.isPlay = false;
modal.style.display="none";
tweetM.style.display="none";


btn.onclick = function() {
    modal.style.display = "block"
}

tweetB.onclick = function() {
    tweetM.style.display = "block"
}


span.onclick = function() {
    modal.style.display = "none";
}
span2.onclick = function() {

    tweetM.style.display="none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        tweetM.style.display="none";
    }

}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/png'});
}

var screenshot =  document.getElementById("screenshot");
screenshot.onclick = function(event){
    var aCanvas = document.getElementById("glCanvas"),
        ctx =  aCanvas.getContext("webgl2", {preserveDrawingBuffer: true});
    ;
    aCanvas.toBlob( function(blob)
                    {
                        var d = new Date();
                        var fName = d.getFullYear()+"_"+d.getMonth()+"_"+d.getDate()+"_"+
                            d.getHours()+"_"+d.getMinutes()+"_"+d.getSeconds();

                        saveAs(blob, "bu3npattern"+fName+".png");
                    });

};

$('#tweet').click(function(){
    postCanvasToURL();
});

// Initialize OAuth with key
OAuth.initialize('L8S3QSenzZyJF6_NM19pwhHyHEw');

function postCanvasToURL() {
      // Convert canvas image to Base64
      var img = snap.toDataURL();
      // Convert Base64 image to binary
      var file = dataURItoBlob(img);
      // Open a tweet popup and autopopulate with data
      OAuth.popup("twitter").then(function(result) {
          var data = new FormData();
          // Tweet text
          data.append('status', "I just took an Elfie! devteaminc.github.io/elfie @devteaminc #elfie");
          // Binary image
          data.append('media[]', file, 'elfie.png');
          // Post to Twitter as an update with media
          return result.post('/1.1/statuses/update_with_media.json', {
              data: data,
              cache: false,
              processData: false,
              contentType: false
          });
      // Success/Error Logging
      }).done(function(data){
          var str = JSON.stringify(data, null, 2);
          $('#result').html("Success\n" + str).show()
      }).fail(function(e){
          var errorTxt = JSON.stringify(e, null, 2)
          $('#result').html("Error\n" + errorTxt).show()
      });
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}
