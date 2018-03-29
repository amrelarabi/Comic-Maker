
/** 
 * PLUGINS
**/ 

colorSelector = $("#color").spectrum({
    color: "#f00"
});

/** 
 * HELPERS
**/ 

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
        //etc
        return true;
    }
    return false;
}

function closeActivePhotoBox(){
	// Disable InsertButton
	$("#insert-button").addClass('disabled');
	$("#insert-button").prop('disabled', true);
	// hide the active box
	$('.active-box-picture').toggleClass("hidden");
	$('.active-box-picture').toggleClass("active-box-picture");
}

function createImage(source) {
    var pastedImage = new Image();
    pastedImage.onload = function() {

    }
    pastedImage.src = source;
    $("#work-space").html(pastedImage);
}

function insertPhoto(myfile) {
	if (myfile != false){
		// when click insert
		$("#insert-button").click(function(){
			
			createImage(myfile.src);
			
			
		});
	}
}


function deleteElement(obj){
	toDeleteElement = "#"+$(obj).parent().data("control");
	$(toDeleteElement).parent().remove();
}


function deleteTextElement(obj){
	$(obj).parent().parent().remove();
}

var layers = [];

function newLayer(id){
	$layers = $("#layers-list");
	layers.push(id);
	$layers.append('<div class="row '+id+'">'+
	'<div class="col-sm-3">'+
		'<div class="item">'+
			'<span class="name">'+
				id +
			'</span><!-- .name -->'+
		'</div><!-- .item -->'+
	'</div><!-- .col -->'+
	'<div class="col-sm-9">'+
		'<div class="delete pull-right">'+
			'<img src="assets/svg/delete.svg" alt="trash" data-delete="'+id+'" onclick="deleteLayer(this)" />'+
		'</div>'+
	'</div>'+
'</div><!-- .row -->');
}


function deleteLayer(obj){
	id = $(obj).data("delete");
	// remove from layers list
	$(id).remove();
	// remove from workspace
	// get type text or image
	last_index = id.indexOf("_");
	type = id.substring(0,last_index);
	
	toDeleteElement = "#"+id;

	if(type == "text"){
		$(toDeleteElement).remove();
		$("."+id).remove();
	}
	
	if(type == "photo") {
		$(toDeleteElement).remove();
		$("."+id).remove();
	}
	
}


// image data to be insert
var input = "";
function ableButton(file){
	input = file;
	// remove disable button
	$("#insert-button").removeClass('disabled');
	$("#insert-button").prop('disabled', false);
}

// upload photo
var counter = 0;
function readURL() {
	var reader = "";
	var txt = "";
	if (input.files && input.files[0]) {
		var extension = getExtension(input.files[0].name);

		if (isImage(extension)) {

				counter+=1;
				
				reader = new FileReader();

				reader.onload = function (e) {
					
					$("#work-content").append(
						
						'<div style="display:inline-block" class="photo ui-widget-content element photo_element">'+
						'<div class="element-control" data-control="photo_'+counter+'">' +
						"<span class='edit-element' onClick='editElement(this)'><img src='assets/svg/pencil.svg' alt='edit'/></span>"+
						"<span class='delete-element'  onClick='deleteElement(this)'><img src='assets/svg/delete.svg' alt='delete'/></span>"+
						"</div>"+
						"<img id='photo_"+counter+"' class='inserted-img' src='"+e.target.result+"' alt='uploaded photo'> "+
						'</div>'
					);
					// add layers list
					id = "photo_"+counter;
					newLayer(id);
				  $( function() {
					$(".photo").draggable();
					$(".photo .inserted-img").resizable();
				  });
					
				   var $el = $('#myFile');
				   $el.wrap('<form>').closest('form').get(0).reset();
				   $el.unwrap();
					
					closeActivePhotoBox();
					
				};

				reader.readAsDataURL(input.files[0]);
				
		}
		else {
			// disable insert button
			$("#insert-button").addClass('disabled');
			$("#insert-button").prop('disabled', true);

			// show error message
			txt+= "Please select a valid photo";
		}
	}
	document.getElementById("file-info").innerHTML = txt;
}


/**
function upload(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
						
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
					var extension = getExtension(file.name);
					if (isImage(extension)) {
						txt += "name: " + file.width + "<br>";

						if ('size' in file) {
							txt += "size: " + file.size + " bytes <br>";
						}
						
						// remove disable button
						$("#insert-button").removeClass('disabled');
						$("#insert-button").prop('disabled', false);

						insertPhoto(file);
					}
					else {
						
						// disable insert button
						$("#insert-button").addClass('disabled');
						$("#insert-button").prop('disabled', true);
						
						// show error message
						txt+= "Please select a valid photo";
					}
				}
            }
			
        }
    } 
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("file-info").innerHTML = txt;
}
**/

/**
 * ADD SECTION
**/

$(".add-item").click(function(event){
	
	// get the the data box which point to the right box of icon
	var box = $(this).data("box") ;
	
	// remove the current active window
	$('.active-box').addClass("hidden");
	$(".active-box").removeClass("active-box");	
	
	$("#update-text").parent().html('<button id="insert-text" onClick="insertText()">ok</button>');
	
	// show the new window and make it active box
	$(box).removeClass("hidden");
	$(box).addClass("active-box");

});

// close icon
$(".close-box").click(function(){
	// close the icon
	$(this).parent().addClass("hidden");
});

/**
 * PICTURE
 */

$('.action-icon').click(function(){
	
	// hide the current active box or the parent box
	$('.active-box').addClass('hidden');
	
	// get the target box
	var box = $(this).data('box');
	
	// show the target box
	$(box).toggleClass("hidden");
	$(box).toggleClass("active-box-picture");
	
	// cancel when click cancel
	$("#cancel-insertion").click(function(){
		closeActivePhotoBox();
	});

});

$( function() {
	$( ".box" ).draggable();
});

/**
 * LAYOUT
 */

$(".close-window").click(function(){
	$("#work-space").addClass("hidden");
});

$('#set-dimensions').click(function(){
	

	var width = $("#width").val();
	var height = $("#height").val();
	
	$("#work-space").removeClass("hidden");

	$("#work-content").css({width:width,height:height});
	$("#work-space").css({width:width});
	
	$("#layout-box").removeClass("active-box");
	$("#layout-box").addClass("hidden");
	
	
	
	$(".control-widow").show();
	
	
	$(".work-space").draggable({
		  handle: ".control-widow"
	});

	
});

function download() {
    var dt = canvas.toDataURL();
    this.href = dt; //this may not work in the future..
}

document.getElementById('download-button').addEventListener('click', download, false);



// save convert to canvas
var buffer_context = "";
$("#save").click(function(){
	$("#save-box").toggleClass("hidden");
	var buffer = document.getElementById("final");
	
	buffer.width = $("#work-content").width();
	buffer.height = $("#work-content").height();
	
	buffer_context = buffer.getContext("2d");
	
	// The Main Background Color
	buffer_context.beginPath();
	buffer_context.rect(0, 0, buffer.width, buffer.height);
	buffer_context.fillStyle = "white";
	buffer_context.fill();
	
	// Convert the photo elements
	$(".photo_element").each(function(i, obj){
		// Get The Position
		x = $(obj).css('left');
		y = $(obj).css('top');
		// Get The Size
		width = $(obj).css('width');
		height = $(obj).css('height');
		index = i + 1;
		img = document.getElementById("photo_"+index);
		buffer_context.drawImage(img, parseInt(x) , parseInt(y),parseInt(width),parseInt(height));
	});
	
	// Convert the text elements
	$(".text-element").each(function(i,obj){
		text = $(obj).find(".text-content").text();

		// Get The Position
		x = $(obj).css('left');
		y = $(obj).css('top');
		size = $(obj).css("font-size");
		style = $(obj).css("font-style");
		color = $(obj).css("color");
		family = $(obj).css("font-family");
		line = $(obj).css("line-height");
		stroke = $(obj).css("text-shadow");
		textAlign = $(obj).css("text-align");
		
		buffer_context.font = size+" "+family;
		buffer_context.strokeStyle="black";
		buffer_context.textAlign = textAlign;
		
		buffer_context.textBaseline = "top";
		if (stroke != "none"){
			buffer_context.strokeText(text,parseInt(x),parseInt(y));
		}
		buffer_context.fillStyle  = color;
		buffer_context.fillText(text,parseInt(x),parseInt(y));

	});
	
	var buffer_img = new Image();
    buffer_img.src = buffer.toDataURL("image/png");
    
    $('#output').html('<img src="' + buffer_img.src + '" alt="Canvas Image" />');
	
	// cancel when click cancel
	$("#download-button").click(function(){
		
		$("#download-button").attr("href",buffer_img.src);
		
		$("#save-box").toggleClass("hidden");
	});
	
	// cancel when click cancel
	$("#cancel-save").click(function(){
		$("#save-box").addClass("hidden");
	});

});

/**
 * TEXT
 */

var textCounter = 0;
function insertText(){	
	// Increase counter
	textCounter = textCounter + 1;
	
	// Remove old element flag
	$(".current-text-element").removeClass("current-text-element");
	
	// Close the window
	$("#text-box").addClass("hidden");
	
	
	// Get the text value
	text = $("#text-area").val();
	
	// Get the color of text
	color = $(".sp-preview-inner").css("background-color");
	
	// Get the font style
	style = $("#style").val();
	
	// Get the font size
	size = $("#size").val();
	if($.isNumeric(size)){
		size = $("#size").val()+"px";
	}
	
	// Get alignment
	alignment = $("#text-box .active-alignment").data("alginment");
	
	// Stroke
	if ($('#stroke').is(":checked")){
		stroke = "true";
	}else{
		stroke = "false";
	}

	
	// Add text to the work space
	$("#work-content").append(
		"<div class='text-element current-text-element element' id='text_"+textCounter+"'>"+
		'<div class="element-control" >' +
						"<span class='edit-element' onClick='editTextElement(this)'><img src='assets/svg/pencil.svg' alt='edit'/></span>"+
						"<span class='delete-element'  onClick='deleteTextElement(this)'><img src='assets/svg/delete.svg' alt='delete'/></span>"+
						"</div>"+
		"<div class='text-content'>"+text+"</div>"+
		"</div>"
	);
	
	// Add to layers list
	id = "text_"+textCounter;
	newLayer(id);

		
	// Change the font options according to selected
	$(".current-text-element").css({color:color,fontStyle:style,fontSize:size,textAlign:alignment});
	if (stroke=="true"){
		$(".current-text-element").css({"text-shadow":"-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000"});
	}else{
		$(".current-text-element").css({"text-shadow":"none"});
	}
	// Make the text dragable
	$( function() {
		$(".text-element").draggable();
	});
}

/**
 * CONTROL ELEMENT
 */


function updateTextElement(id){

	// Get the id of element to update
	id = $("#"+id);
	text = id.find(".text-content").text();
	color = id.css("color");
	style = id.css("font-style");
	size = parseInt(id.css("font-size"));
	family = id.css("font-family");
	alignment = id.css("text-align");
	
	// Update forms
	$("#text-box #text-area").val(text);
	$("#text-box #font").val(family);
	$("#text-box #size").val(size);
	$("#text-box #style").val(style);
	$("#text-box .sp-preview-inner").css({backgroundColor:color});
	$("#text-box .alignment-icon[data="+alignment+"]");

}

function editTextElement(obj){
	// remove the current active window
	$('.active-box').addClass("hidden");
	$(".active-box").removeClass("active-box");
	
	// show the new window and make it active box
	$("#text-box").removeClass("hidden");
	$("#text-box").addClass("active-box");

	// Get id of element to edit
	id = $(obj).parent().parent().attr("id");
	
	$("#insert-text").parent().html('<button id="update-text" data-update='+id+' onClick="updateText(this)">update</button>');
	
}

function updateText(id){
	id = "#"+$(id).data("update");
	id = $(id);
	text = $("#text-box #text-area").val();
	font = $("#text-box #font").val();
	size = $("#text-box #size").val();
	style = $("#text-box #style").val();
	color = $("#text-box .sp-preview-inner").css("background-color");
	alignment = $("#text-box .active-alignment").data("alginment");
	
	// Stroke
	if ($('#stroke').is(":checked")){
		stroke = "true";
	}else{
		stroke = "false";
	}

	
	id.find(".text-content").text(text);
	id.css({"color":color});
	id.css({"text-align":alignment});
	id.css({"font-style":style});
	if (stroke == "true"){
		id.css({"text-shadow":"-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000"});
	} else {
		id.css({"text-shadow":"none"});
	}

	if($.isNumeric(size)){
		id.css({"font-size":size+"px"});;
	} else {
		id.css({"font-size":size});
	}
	id.css({"font-family":font});
	
	$("#text-box").addClass("hidden");
	$("#text-box").removeClass("active-box");
	$("#insert-text").parent().html('<button id="insert-text">OK</button>');
	
	updateTextElement(id);
	
}


$("#text-box .alignment-icon").click(function(){
	$("#text-box .active-alignment").removeClass("active-alignment");
	$(this).addClass("active-alignment");
});
