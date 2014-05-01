// this src/idmap/document.jsx
// A simple fuction for creating a new doc with some basic settings
//
var doc_builder = function(){
  var doc = null;
  if(settings.new_document){
    doc = app.documents.add({
      documentPreferences:{
        pageWidth: settings.docWidth,
        pageHeight: settings.docHeight,
        facingPages:false
        }});
  }else{
    doc = app.activeDocument;
    if(app.documents.length === 0){
      alert("Hm. You need to have a document or set the settings to new_document.\n Right now it seems like you set the settings.new_document to false but don't have any open document. How should i draw something for you? Onto a coster?");
    }
    return "no document available";
    // here should be a check if the pagesize fits our map
  }
  return doc;
};

