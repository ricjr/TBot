var Orders = {};
Orders.market = 'btc_brl';
Orders.values = {'asks':[],'bids':[]};
Orders.lastPrice = 0;
Orders.apiBase = 'https://braziliex.com/api/v1/public/';
Orders.serviceName = 'orderbook/';
Orders.serviceNameLastPrice = 'ticker/';


Orders.goUp = function(){
	
	var sum = 0; Orders.values.asks.forEach(function(i){sum+=i.price * i.amount;});
	var ma = sum/Orders.values.asks.length;
	
	sum = 0; Orders.values.bids.forEach(function(i){sum+=i.price * i.amount;});
	var mb = sum/Orders.values.bids.length;
	
	return (ma-Orders.lastPrice)>(mb-Orders.lastPrice);
}

Orders.goDown = function(){
	return !Orders.goUp();
}

Orders.load = function(market){
	
	var url = Orders.apiBase + Orders.serviceName + Orders.market;
	
	Orders.getRequest(url, function () {
	  Orders.values = JSON.parse(this.responseText);
	});
	
	Orders.getLastPrice();
}

Orders.getLastPrice = function(){
	var url = Orders.apiBase + Orders.serviceNameLastPrice + Orders.market;
	
	Orders.getRequest(url, function () {
	  Orders.lastPrice = JSON.parse(this.responseText).last;
	});
}

Orders.getRequest = function(url, callback){
	
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", callback);
	oReq.open("GET", url);
	oReq.send();
}