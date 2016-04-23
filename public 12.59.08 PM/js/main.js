var curTask=-1;
var curProject=-1;


function toggleTaskDiv(id){
	var doc = document.getElementById('divtask');
	if(doc !== undefined ){
		if(doc.style.display === 'none' || curProject !== id){
			doc.style.display = 'block';
			curProject = id;
		} else {
			doc.style.display = 'none';
			curTask = id;
		}
	}
}

function toggleDetailDiv(id){
	var doc = document.getElementById('divdetail');
	if(doc !== undefined ){
		if(doc.style.display === 'none'){
			doc.style.display = 'block';
			curTask = id;
			document.getElementById('mask').style.display = 'block';
		} else {
			doc.style.display = 'none';
			curTask = id;
			document.getElementById('mask').style.display = 'none';
		}
	}
}