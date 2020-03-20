let BusReflector = function () {

    this.address = false;
    this.port = false;
    this.ws = false;
    this.subscribers = {};
    this.__CONSTRUCTOR__ = function (addr, port) {
   }
  
    this.parseASCIICmd = function(rawCmd){
        return rawCmd.trim().split("\n");
    };

    this.subscribe=function(cmd,_callback){

        if (typeof this.subscribers[cmd] === 'undefined'){
            this.subscribers[cmd]=[];
        }
        this.subscribers[cmd].push(_callback);
    }

    this.connect = function (addr='localhost',port=9999){
        this.address = addr;
        this.port = port;
 
        if (this.address === false || this.port === false) return false;

        let address = `ws://${this.address}:${this.port}/`;
        this.ws = new WebSocket(address);

        let _this = this;


        function onOpen() {

            console.log(`ws://${_this.address}:${_this.port}/ ==> Connected`);
        }
        this.ws.removeEventListener('open', onOpen);
        this.ws.addEventListener('open', onOpen);

        function onClose() {

            console.log(`ws://${_this.address}:${_this.port}/ <== Disconected`);
        }
        this.ws.removeEventListener('close', onClose);
        this.ws.addEventListener('close', onClose);

        function onMessage(e) {

            console.log(`ws://${_this.address}:${_this.port}/ === ${e.data}`);
            if(typeof _this.subscribers.all !== 'undefined'){
                for(let i= _this.subscribers.all.length-1;i>=0;i--){
                    _this.subscribers.all[i](e.data);
                }
            }
        }
        this.ws.removeEventListener('message', onMessage);
        this.ws.addEventListener('message', onMessage);

        return true;
    };

    this.disconnect =function(){

        this.ws.close();
    };
    this.send = function (cmd) {
        if (this.ws && this.ws.readyState == 1) {
            
            console.log(`ws://${this.address}:${this.port}/ ==> ${cmd}`);
            this.ws.send(cmd);
        } else {

            console.log(`ws://${this.address}:${this.port}/ ERROR> ${cmd}`);
            return false;
        }
        return true;
    };

    this.__CONSTRUCTOR__();
};