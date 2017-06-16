/**
  * @brief	暗黑2查詢系統主類別
  * @author	colin1124x@gmail.com
  * @date	2011/11/28
 */
(function(){
	diablo2 = function(){}
	diablo2.in_array = function(val, arr)
	{
		for (var i=0,L=arr.length; i<L; i++)
		{
			if (arr[i] == val) {return true;}
		}
		return false;
	}
	diablo2.SEARCH_RUNE_NUM = 1;
	diablo2.SEARCH_TYPE = 2;
	diablo2.SEARCH_SORCKET = 3;
	diablo2.searchBy = function(data, type, val)
	{
		var _data = [];
		switch (type)
		{
			case diablo2.SEARCH_RUNE_NUM:
				for (var x in data)
				{
					var o = data[x];
					if (diablo2.in_array(val, o.rune)) {_data[_data.length] = o;}
				}
				break;
			case diablo2.SEARCH_TYPE:
				for (var x in data)
				{
					var o = data[x];
					var re = new RegExp(val);
					if (re.test(val)) {_data[_data.length] = o;}
				}
				break;
			case diablo2.SEARCH_SORCKET:
				for (var x in data)
				{
					var o = data[x];
					if (val == o.rune.length) {_data[_data.length] = o;}
				}
				break;
			default:;
		}
		return _data;
	}
	diablo2.searchByRuneIntersection = function(data, type, arr_val)
	{
		var _data = [];
		for (var i=0,L=arr_val.length; i<L; i++)
		{
			var num = arr_val[i];
			if (0==i)
			{
				_data = diablo2.searchBy(data, type, num);
			}
			else
			{
				for (var j=_data.length-1; j>=0; j--)
				{
					if (!diablo2.in_array(num, _data[j].rune))
					{
						_data.splice(j, 1);
					}
				}
			}
		}
		return _data;
	}
	diablo2.Item = function(o)
	{
		this.o = o;
	}
	diablo2.Item.prototype.toString = function()
	{
		var str = ['<div class="item">'];
		var runes = [];
		for (var i=0,L=this.o.rune.length; i<L; i++)
		{
			runes[runes.length] = new diablo2.Rune(diablo2.Rune.searchBy(diablo2.Rune.SEARCH_NUM, this.o.rune[i]));
		}
		str[str.length] = '<h3>'+this.o.name+'</h3>';
		str[str.length] = '<span class="rune">'+runes.join(' ')+'</span>';
		str[str.length] = '<span class="type">'+this.o.type.replace(/\s*(\d)\s*Socket/i, '\n$1')+'</span>';
		str[str.length] = '<span class="property">'+this.o.property.join('\n')+'</span>';
		str[str.length] = '</div>';
		return str.join('\n');
	}
})();