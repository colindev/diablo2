/**
  * @date  2011/12
  * @brief Cookie 存取類別
  * @email colin1124x@gmail.com
*/
(function(){
	Cookie = function(name)
	{
		this.$name = name;
		Cookie.getAll();
	}
	Cookie._data = null;
	Cookie.re_cookie_mod = /[^;]+/g;
	Cookie.re_cookies_find = /\s*([^=]+)\s*=\s*(.+)\s*/g;
	Cookie.parse_cookie = function()
	{
		Cookie._data = {};
		document.cookie.replace(Cookie.re_cookie_mod, function(m){
			if (!(/=/.test(m)))
			{
				Cookie._data[''] = Cookie.parse_prop(m);
			}
			else
			{
				m.replace(Cookie.re_cookies_find, function(m1,m2,m3){
					Cookie._data[m2] = Cookie.parse_prop(m3);
				});
			}
		});	
	}
	Cookie.$spliter = ':';
	Cookie.$spliter_prop = '&';
	Cookie.re_props_find = /\s*([^&\:]+)\s*\:\s*([^&\:]+)\s*/g;
	Cookie.parse_prop = function(str)
	{
		if (str.match(Cookie.re_props_find)) 
		{
			var props = {};
			str.replace(Cookie.re_props_find, function(m1,m2,m3){
				props[m2] = decodeURIComponent(m3);
			});
			return props;
		}
		else
		{
			return decodeURIComponent(str);
		}
	}
	var cache_all_cookie_obj = null;
	Cookie.getAll = function()
	{
		if (!Cookie._data) {Cookie.parse_cookie();}
		if (cache_all_cookie_obj) {return cache_all_cookie_obj;}
		cache_all_cookie_obj = [];
		for (var x in Cookie._data)
		{
			cache_all_cookie_obj[cache_all_cookie_obj.length] = new Cookie(x);
		}
		return cache_all_cookie_obj;
	}
	Cookie.cleanAll = function()
	{
		var _cookies = Cookie.getAll();
		for (var i=0,L= _cookies.length; i<L; i++)
		{
			_cookies[i].die();
		}
	}
	Cookie.prototype = {
		get : function(key)
		{//凡是找不到一律回傳空字串
			if ('undefined' != typeof key)
			{
				return (Cookie._data[this.$name] && (Cookie._data[this.$name] instanceof Object))? (Cookie._data[this.$name][key]||'') : '';
			}
			return Cookie._data[this.$name] || '';
		},
		set : function()
		{
			if (1 == arguments.length)
			{
				Cookie._data[this.$name] = arguments[0];
			}
			else if (2 == arguments.length)
			{
				if (!Cookie._data[this.$name] || !(Cookie._data[this.$name] instanceof Object))
				{
					Cookie._data[this.$name] = {};
				}
				Cookie._data[this.$name][arguments[0]] = arguments[1];
			}
			return this;
		},
		unset : function(key)
		{
			if (!(Cookie._data[this.$name] instanceof Object)) {return;}
			delete Cookie._data[this.$name][key];
			return this;
		},
		die : function(path, domain, secure)
		{
			this.store(0, path, domain, secure);
			return this;
		},
		store : function (time, path, domain, secure)
		{
			var cookieval = this.get();
			if (cookieval instanceof Object)
			{
				var _arr = [];
				for (var x in cookieval)
				{
					_arr[_arr.length] = x + Cookie.$spliter + encodeURIComponent(cookieval[x]);
				}
				cookieval = _arr.join(Cookie.$spliter_prop);
			}
			var cookie = this.$name + "=" +cookieval;
			if (time || time==0)
			{
				cookie += "; max-age=" + time;
			}
			if (path) {cookie += "; path=" + path;}
			if (domain) {cookie += "; domain=" + domain;}
			if (secure) {cookie += "; secure";}
			document.cookie = cookie;
			return this;
		},
		toString : function()
		{
			return '[Cookie Object]';
		}
	};
	Cookie.getNum = function()
	{
		if (!Cookie._data) {Cookie.parse_cookie();}
		var cnt = 0;
		for (var x in Cookie._data)
		{
			cnt++;
		}
		return cnt;
	}
})();