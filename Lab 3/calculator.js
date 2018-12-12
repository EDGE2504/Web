//Global variables
var results = document.getElementById("display");
var inputs = ["","",""];
var values = [];
var funOn = 0;
var dotOn = 0;
// Arithmetic functions
var add = function(a, b) {return a + b;}
var subtract = function(a, b) {return a - b;}
var multiply = function(a, b) {return a * b;}
var divide = function(a, b) {return a / b;}
var fsqrt = function(a) {return Math.sqrt(a);}
var degree = function(a, b) {return Math.pow(a,b);} 
var equals = function() {
	if (inputs[1] === "+") {
		var sum = add(parseFloat(inputs[0]), parseFloat(inputs[2]));
		clear();	
		values.push(sum);
		Send(sum);
	}
	else if (inputs[1] === "-") {
		var difference = subtract(parseFloat(inputs[0]), parseFloat(inputs[2]));
		clear();	
		values.push(difference)
		Send(difference);
	}
	else if (inputs[1] === "*") {
		var product = multiply(parseFloat(inputs[0]), parseFloat(inputs[2]));
		clear();	
		values.push(product);
		Send(product);
	}
	else if (inputs[1] === "/") {
		var quotient = divide(parseFloat(inputs[0]), parseFloat(inputs[2]));
		clear();
		values.push(quotient);
		Send(quotient);
	}
	else if (inputs[1] ==="^") {
		var degrees = degree(parseFloat(inputs[0]), parseFloat(inputs[2]));
		clear();
		values.push(degrees);
		Send(degrees);
	}
	display();
}

// Functions for storing and displaying user input
var update = function(value) {
	inputs.push(value);
	inputs.shift();
}
var clear = function() {
	inputs = ["","",""];
	values = [];
	display();
}
var display = function() {
	results.innerHTML = inputs.join(" ") + " " + values.join("");
}

// Event listeners for mouse input
for (var i = 0; i < 10; i++) {
	document.getElementById(i).addEventListener("click", function() {
		if(values.length < 18){
		values.push(this.innerHTML);
		display();
		}
	});
}
document.getElementById(10).addEventListener("click", function() {
	if(dotOn == 0) 
		{
		values.push(this.innerHTML);
		display();
		dotOn = 1;
		}
	});
for (var i = 11; i < 16; i++) {
	document.getElementById(i).addEventListener("click", function() {
		if(funOn == 1) 
		{
			update(values.join(""));
			values = [];
			equals();
		}
		update(values.join(""));
		update(this.innerHTML);
		values = [];
		funOn = 1;
		dotOn = 0;
		display();
	});
}
document.getElementById(18).addEventListener("click", function(){
	if(funOn == 1) 
		{
			update(values.join(""));
			values = [];
			equals();
			funOn = 0;
		}
	update(values.join(""));
	values = [];
	var ssqrt = fsqrt(parseFloat(inputs[2]));
	clear();
	values.push(ssqrt);
	Send(ssqrt);
	display();
});
document.getElementById(16).addEventListener("click", function(){
	update(values.join(""));
	values = [];
	equals();
	funOn = 0;
	dotOn = 0;
});
document.getElementById(17).addEventListener("click", function(){ clear(); });

document.getElementById(19).addEventListener("click",function(){ get('prev.txt'); });
function Send(value){
	if (!isNaN(value)){
		var req = new XMLHttpRequest();
		req.open("POST", 'prev.php', true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send("param="+ value);	
	}
}
function get(url) {								
  return new Promise(function(succeed, fail) {
	var req = new XMLHttpRequest();
	req.open("GET", url,true);
	req.addEventListener("load", function() {
	  if (req.status < 400)
		succeed(res(req.responseText));
	  else
		fail(new Error("Request failed: " + req.statusText));
	});
	req.addEventListener("error", function() {
	  fail(new Error("Network error"));
	});
	req.send();
  });
}
function res(val){
			values = [];
			values.push(val);
			display();
}
