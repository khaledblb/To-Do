var tasks = [];//array to Hold Tasks
var task = { id:"", 
			 discription:"",
			 date:""
		   }; //defintion of Task object

document.getElementById("saveBtn").addEventListener("click" ,()=>{ //listener to save button
	var date = document.getElementById("dateInput").value;
	var discription = document.getElementById("input").value;
	
	//validation
	if(date == "" || discription == ""){
		alert("plese make sure you enter data");
		return;
	}
	
	//getting task from user into tmp Task
	var tmp ={ 
		id : "0",
	  	discription : discription,
		date : date
	};
	//Saving The Task
	saveData(tmp);
	//Doing some effect
	fadeIn('s'+tmp.id);	
});

function showTasks(){
	//showing Tasks from localStorage
	var tasks = new Array(0);
	tasks = localStorage.getItem("tasks");
		if(tasks != null){
			var tbody = document.getElementById("tbody");
			tbody.innerHTML ="";
			//for loop to show all the Tasks
			for(var i=0; i < (JSON.parse(tasks)).length ; i++){
				 task = JSON.parse(tasks)[i];
				 var divOpening = '<div class="task" id="s'+task.id+'">';
       			 var x =`<span class='close glyphicon glyphicon-remove' onclick="removeObj(${task.id})" ;'></span>`;
       			 var dec = `<div class="desdiv">${task.discription}</div>` ;
       			 var date = `<p class="datediv">${task.date}</p>` ;
       			 var divCloseing = '</div>';
				 tbody.innerHTML+=`${divOpening}${x}${dec}${date}${divCloseing}`;
			}
		
		}
	}

function saveData(obj){
	//getting tasks from localStorage into json
	var json = localStorage.getItem("tasks");
	var tmpObj=[];
	if(json === ''){
		//if tasks is empty
		obj.id = "1";	
		tmpObj.push(obj);
		localStorage.setItem("tasks",JSON.stringify(tmpObj));
		showTasks();
	}
	else{
		tasks = JSON.parse(json);
		id = tasks.length;
		obj.id = `${++id}`;
		tasks.push(obj);
		localStorage.setItem("tasks",JSON.stringify(tasks));
		showTasks();
	}

}

function onLoad(){
	//an onLoad function to validate that if there is tasks in the localStorage
		tasks = localStorage.getItem("tasks");
	if(tasks!="[]"&&tasks!=null&&tasks!="")
		showTasks();
	else
		//if there is no Tasks initilize the localStorage
		localStorage.setItem("tasks",[]);
}

function removeObj(idObj){
	//remove object
	fadeOut("s"+idObj);
	tasks = localStorage.getItem("tasks");
	if(JSON.parse(tasks).length==1){
		localStorage.setItem("tasks",[]);
		onLoad();
	}else{
	var arr = JSON.parse(tasks);
	arr.splice(idObj-1,1);
	localStorage.setItem("tasks",JSON.stringify(arr));
	onLoad();
		}
		}

function fadeIn(elemnt){
	var task = document.getElementById(elemnt);
	task.style.animation = "fadeIn 5s";
}

function fadeOut(elemnt){
	var task = document.getElementById(elemnt);
	task.style.animation = "fadeOut 5s";
}