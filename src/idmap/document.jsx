// this src/idmap/document.jsx
// A simple fuction for creating a new doc with some basic settings
//
var doc_builder = function(){
  var doc = null;
  if(settings.new_document){
    doc = app.documents.add({
      documentPreferences:{
        pageWidth:360,
        pageHeight:180,
        facingPages:false
        }});
  }else{
    doc = app.activeDocument;
    // here should be a check if the pagesize fits our 2:1
    // equirectangular
  }
  return doc;
};