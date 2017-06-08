// JavaScript Document
jquery = jQuery.noConflict();
jquery(document).ready(function(){
	
  jquery('input').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue',
    increaseArea: '20%' // optional
  });
});