/**
  * @brief	頁面系統檔
  * @author	colin1124x@gmail.com
  * @date	2011/11/28
 */
(function(){
	System = function() {}
	System._search_rune_num = [];
	System._search_item_type = [];
	System.setBtnActive = function(arr, jq_node)
	{
		var num = jq_node.data('num');
		if (jq_node.hasClass('active'))
		{
			jq_node.removeClass('active');
			for (var i=arr.length-1; i>=0; i--)
			{
				if (arr[i] == num) {arr.splice(i, 1);}
			}
		}
		else
		{
			jq_node.addClass('active');
			arr[arr.length] = num;
		}
	}
	System.searchItemByItemTypes = function()
	{
		var arr = [];
		//武器
		if (diablo2.in_array('weapon', System._search_item_type))
		{
			for (var x in diablo2.Weapon.data)
			{
				arr[arr.length] = new diablo2.Item(diablo2.Weapon.data[x]);
			}
		}
		//鎧甲
		if (diablo2.in_array('armor', System._search_item_type))
		{
			for (var x in diablo2.Armor.data)
			{
				arr[arr.length] = new diablo2.Item(diablo2.Armor.data[x]);
			}
		}
		//頭盔
		if (diablo2.in_array('helmet', System._search_item_type))
		{
			for (var x in diablo2.Helmet.data)
			{
				arr[arr.length] = new diablo2.Item(diablo2.Helmet.data[x]);
			}
		}
		//盾
		if (diablo2.in_array('shield', System._search_item_type))
		{
			for (var x in diablo2.Shield.data)
			{
				arr[arr.length] = new diablo2.Item(diablo2.Shield.data[x]);
			}
		}
		return arr;
	}
	System.searchByRuneIntersection = function()
	{
		var arr = [];
		if (diablo2.in_array('weapon', System._search_item_type))
		{
			arr = arr.concat(diablo2.searchByRuneIntersection(diablo2.Weapon.data, diablo2.SEARCH_RUNE_NUM, System._search_rune_num));
		}
		if (diablo2.in_array('armor', System._search_item_type))
		{
			arr = arr.concat(diablo2.searchByRuneIntersection(diablo2.Armor.data, diablo2.SEARCH_RUNE_NUM, System._search_rune_num));
		}
		if (diablo2.in_array('helmet', System._search_item_type))
		{
			arr = arr.concat(diablo2.searchByRuneIntersection(diablo2.Helmet.data, diablo2.SEARCH_RUNE_NUM, System._search_rune_num));
		}
		if (diablo2.in_array('shield', System._search_item_type))
		{
			arr = arr.concat(diablo2.searchByRuneIntersection(diablo2.Shield.data, diablo2.SEARCH_RUNE_NUM, System._search_rune_num));
		}
		for (var i=0,L=arr.length; i<L; i++)
		{
			arr[i] = new diablo2.Item(arr[i]);
		}
		return arr;
	}
	System.colorKeyWord = function(arr_item, arr_re)
	{
		  for (var i=arr_item.length-1; i>=0; i--)
		  {
			  for (var j=arr_re.length-1; j>=0; j--)
			  {
				  var re = arr_re[j];
				  arr_item[i] = arr_item[i].toString().replace(re, '>$1<font class="key-word-find">$2</font>$3<');
			  }
		  }
	}
	System.search = function()
	{
		var arr = [];
		if (0 == System._search_rune_num.length)
		{
			arr = System.searchItemByItemTypes();
		}
		else
		{
			arr = System.searchByRuneIntersection();
		}
		cookie_diablo.set('val', System.keyWordInput.val());
		cookie_diablo.set('runes', System._search_rune_num.join(','));
		cookie_diablo.set('items', System._search_item_type.join(','));
		cookie_diablo.store();
		var str_key_word = System.keyWordInput.val().replace(/^\s*|\s*$/, '');
		var arr_key_word = str_key_word.split(/\s*,\s*/);
		if (arr_key_word.length && arr_key_word[0])
		{
			var collection_item = [];
			var collection_re = [];
			for (var i=0, L=arr_key_word.length; i<L; i++)
			{
				key_word = arr_key_word[i].replace(/([+%\(\)\[\]\.\|])/g, '\\$1');
				if (!key_word) {continue;}
				var re = new RegExp('>([^<>]*?)('+key_word+')([^<>]*?)<', 'ig');
				collection_re[collection_re.length] = re;
				for (var j=arr.length-1; j>=0; j--)
				{
					arr[j] = arr[j].toString();
					//if (re.test(arr[j])) //值得研究 如有兩個以上會遺漏最後一個
					if (arr[j].match(re))
					{
						var _item = arr.splice(j, 1);
						collection_item[collection_item.length] = _item;
					}
				}
			}
			System.colorKeyWord(collection_item, collection_re)
			arr = collection_item;
		}
		System.display.html(arr.join('\n'));
		return;
	}
	System.createRuneBtn = function(obj_rune)
	{
		var tooltip = [];
		var synthesis = diablo2.Rune.getSynthesisByNum(obj_rune.num);
		for (var i=0,L=synthesis.length; i<L; i++)
		{
			var _item = synthesis[i];
			var _o = diablo2.Rune.searchBy(diablo2.Rune.SEARCH_NUM, _item);
			if (_o)
			{
				tooltip[tooltip.length] = "<span class='"+_o.e+"'></span>";
			}
			else
			{
				tooltip[tooltip.length] = "<span class='"+_item+"'></span>";
			}
		}
		var effect = diablo2.Rune.getEffectByNum(obj_rune.num);
		tooltip[tooltip.length] = "<p>武器:"+effect.weapon+"</p>"
		tooltip[tooltip.length] = "<p>裝甲:"+effect.armor+"</p>"
		tooltip[tooltip.length] = "<p>頭盔:"+effect.helmet+"</p>"
		tooltip[tooltip.length] = "<p>盾:"+effect.shield+"</p>"
		tooltip[tooltip.length] = "<p>等級需求:"+effect.require+"</p>"
		
		
		var span = $('<span class="'+obj_rune.e+'" tooltip="'+tooltip.join('')+'">'+ obj_rune.e + ' ' + obj_rune.c + '('+obj_rune.num+')</span>');
		span.data('num', obj_rune.num);
		System.box.append(span);
		span.bind('click', function()
		{
			var me = $(this);
			System.setBtnActive(System._search_rune_num, me);
			System.search();
		});
	}
	System.createFullRuneBtn = function()
	{
		for (var x in diablo2.Rune.data)
		{
			System.createRuneBtn(diablo2.Rune.data[x]);
		}
	}
	//*********************************************//
	var cookie_diablo = new Cookie('diablo');
	System.box = $('#box_rune');
	System.display = $('#display');
	System.keyWordInput = $('#key_word');
	System.keyWordInput.val(cookie_diablo.get('val'));

	System.keyWordInput.bind('change', function(){System.search();})
	System.keyWordInput.parent().parent().bind('submit', function(){System.search();return false;})
	System.createFullRuneBtn();
	$('#box_rune span').tooltip();
	$('.weapon, .armor, .helmet, .shield').each(function(){
		var me = $(this)
		me.data('num', me.attr('class'));
		me.bind('click', function(){
			var _me = $(this);
			System.setBtnActive(System._search_item_type, _me);
			System.search();
		});
		$(cookie_diablo.get('items').split(/,/)).each(function(){
			if (this == me.attr('class'))
			{
				System._search_item_type[System._search_item_type.length] = this;
				System.setBtnActive(System._search_item_type, me);
			}
		});
	});
	System.search();
})();