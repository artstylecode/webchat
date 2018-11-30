function Timer(args)
{
	this.timespan = args.timespan;
	this.callBack = args.callBack;
	this._timer;
};

Timer.prototype.start = function()
{
	this._timer = setInterval(this.callBack, this.timespan);
}

Timer.prototype.pause = function()
{

};
Timer.prototype.stop = function()
{
	clearInterval(this._timer);
};