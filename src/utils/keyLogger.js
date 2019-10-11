
//This function will receive one variable maintaining logs of that particular
//input which will be initialised as follows
// var keyLogs = ["*"];
// var input = document.getElementById("input");
// input.addEventListener('keyup',keylogger(input,keyLogs));

function keylogger(input,oldLogs){
    return function(event){
        let value = input.value;
        var keylogs = oldLogs;
        var lastStar;
        for(var i=0; i< keyLogs.length ; i++){
            if(keyLogs[i] == "*"){
              lastStar = i;
            }
        }
     
            if(event.keyCode == "8" || event.keyCode =="46"){
                if(lastStar == keylogs.length -1){
                    console.log("doNothing");
                }else{
                    keylogs[lastStar+ 2 ] = "*";
                    document.getElementById("demo").innerHTML+= '\n' + keyLogs;
                    console.log(keyLogs);
                }
            }else{
                keylogs[lastStar+1] = value;
                document.getElementById("demo").innerHTML+= '\n' + keyLogs;
                console.log("step-2 "+keyLogs);
            }
        oldLogs = keyLogs;
        console.log(oldLogs);
        return keylogs;
    }
}