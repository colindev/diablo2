/**
  * @brief	符石控制類別
  * @author	colin1124x@gmail.com
  * @date	2011/11/28
 */
(function(namespace){
	var main = namespace.Rune = function(o)
	{
		this.o = o;
	}
	main.prototype = {
		toString : function()
		{
			return '<span class="'+this.o.e+'">' + this.o.e + ' ' + this.o.c + '('+this.o.num+')</span>';
		}
	}
	main.SEARCH_NUM = 1;
	main.SEARCH_CWORD = 2;
	main.SEARCH_EWORD = 3;
	main.data = {
		1:{num:1, e:'El',c:'艾爾'}, 2:{num:2, e:'Eid', c:'艾德'}, 3:{num:3, e:'Tir', c:'特爾'}, 4:{num:4, e:'Nef', c:'那夫'}, 5:{num:5, e:'Eth', c:'愛斯'},
		6:{num:6, e:'Ith', c:'伊司'}, 7:{num:7, e:'Tal', c:'塔爾'}, 8:{num:8, e:'Ral', c:'拉爾'}, 9:{num:9, e:'Ort', c:'歐特'}, 10:{num:10, e:'Thul', c:'書爾'},
		11:{num:11, e:'Amn', c:'安姆'}, 12:{num:12, e:'Sol', c:'索爾'}, 13:{num:13, e:'Shael', c:'夏'}, 14:{num:14, e:'Dol', c:'多爾'}, 15:{num:15, e:'Hel', c:'海爾'},
		16:{num:16, e:'Io', c:'破'}, 17:{num:17, e:'Lum', c:'盧姆'}, 18:{num:18, e:'Ko', c:'科'}, 19:{num:19, e:'Fal', c:'法爾'}, 20:{num:20, e:'Lem', c:'藍姆'},
		21:{num:21, e:'Pul', c:'普爾'}, 22:{num:22, e:'Um', c:'烏姆'}, 23:{num:23, e:'Mal', c:'馬爾'}, 24:{num:24, e:'Ist', c:'伊司特'}, 25:{num:25, e:'Gul', c:'古爾'},
		26:{num:26, e:'Vex', c:'伐克斯'}, 27:{num:27, e:'Onm', c:'歐姆'}, 28:{num:28, e:'Lo', c:'羅'}, 29:{num:29, e:'Sur', c:'瑟'}, 30:{num:30, e:'Ber', c:'貝'},
		31:{num:31, e:'Jah', c:'喬'}, 32:{num:32, e:'Cham', c:'查姆'}, 33:{num:33, e:'Zod', c:'薩德'}
	};
	main.searchBy = function(type, val)
	{
		switch (type)
		{
			case main.SEARCH_NUM:
				for (var x in main.data)
				{
					var o = main.data[x];
					if (o.num == val) {return o;}
				}
			case main.SEARCH_CWORD:
				for (var x in main.data)
				{
					var o = main.data[x];
					if (o.c == val) {return o;}
				}
			case main.SEARCH_EWORD:
				for (var x in main.data)
				{
					var o = main.data[x];
					if (o.e == val) {return o;}
				}
			default:return null;
		}
	}
	main.synthesis = {
		1:[], 2:[1,1,1], 3:[2,2,2], 4:[3,3,3], 5:[4,4,4], 6:[5,5,5], 7:[6,6,6], 8:[7,7,7], 9:[8,8,8], 10:[9,9,9],
		11:[10,10,10,'Topaz_Chipped'], 12:[11,11,11,'Amethyst_Chipped'], 13:[12,12,12,'Sapphire_Chipped'], 
		14:[13,13,13,'Ruby_Chipped'], 15:[14,14,14,'Emerald_Chipped'], 16:[15,15,15,'Diamond_Chipped'], 
		17:[16,16,16,'Topaz_Flawed'], 18:[17,17,17,'Amethyst_Flawed'], 19:[18,18,18,'Sapphire_Flawed'], 
		20:[19,19,19,'Ruby_Flawed'], 21:[20,20,20,'Emerald_Flawed'], 22:[21,21,'Diamond_Flawed'], 
		23:[22,22,'Topaz_Normal'], 24:[23,23,'Amethyst_Normal'], 25:[24,24,'Sapphire_Normal'],
		26:[25,25,'Ruby_Normal'], 27:[26,26,'Emerald_Normal'], 28:[27,27,'Diamond_Normal'],
		29:[28,28,'Topaz_Flawless'], 30:[29,29,'Amethyst_Flawless'], 31:[30,30,'Sapphire_Flawless'],
		32:[31,31,'Ruby_Flawless'], 33:[32,32,'Emerald_Flawless']
	};
	main.getSynthesisByNum = function(num)
	{
		return main.synthesis[num];
	}
	main.effect = {
		1:{weapon:'+50 攻擊準確率,+1 照亮範圍', armor:'+15 防禦,+1 照亮範圍', helmet:'+15 防禦,+1 照亮範圍', shield:'+15 防禦,+1 照亮範圍', require:11}, 
		2:{weapon:'+175% 對不死系生物傷害, +50 對不死系生物準確率', armor:'15%減緩精力消耗', helmet:'15%減緩精力消耗', shield:'+7%格擋率', require:11}, 
		3:{weapon:'+2點法力在每殺死一名敵人之後取得', armor:'+2點法力在每殺死一名敵人之後取得', helmet:'+2點法力在每殺死一名敵人之後取得', shield:'+2點法力在每殺死一名敵人之後取得', require:13},
		4:{weapon:'擊退', armor:'+30 對飛射性武器防禦', helmet:'+30 對飛射性武器防禦', shield:'+30 對飛射性武器防禦', require:13}, 
		5:{weapon:'-25%目標防禦力', armor:'法力重生+15%', helmet:'法力重生+15%', shield:'法力重生+15%', require:15}, 
		6:{weapon:'+9 最大傷害值', armor:'15% 受損的生命轉移至法力', helmet:'15% 受損的生命轉移至法力', shield:'15% 受損的生命轉移至法力', require:15},
		7:{weapon:'+75毒素傷害,持續5秒', armor:'+30%毒素抵抗', helmet:'+30%毒素抵抗', shield:'+35%毒素抗性', require:17}, 
		8:{weapon:'增加5-30點火焰傷害', armor:'+30%火焰抵抗', helmet:'+30%火焰抵抗', shield:'+35%火焰抗性', require:19}, 
		9:{weapon:'增加1-50閃電傷害', armor:'+30%閃電抵抗', helmet:'+30%閃電抵抗', shield:'+35%閃電抵抗', require:21},
		10:{weapon:'增加3-14冰冷傷害,凍結目標3秒', armor:'+30%冰冷抵抗', helmet:'+30%冰冷抵抗', shield:'+35%冰冷抵抗', require:23}, 
		11:{weapon:'7% 偷取生命', armor:'攻擊者受到傷害14點', helmet:'攻擊者受到傷害14點', shield:'攻擊者受到傷害14點', require:25}, 
		12:{weapon:'+9 最小傷害值', armor:'減少傷害7點', helmet:'減少傷害7點', shield:'減少傷害7點', require:27},
		13:{weapon:'20% 增加攻擊速度', armor:'20%快速再度攻擊', helmet:'20%快速再度攻擊', shield:'20%快速再度格擋', require:29}, 
		14:{weapon:'成功擊中有25%機率使怪物逃跑', armor:'恢復生命+7', helmet:'恢復生命+7', shield:'恢復生命+7', require:31}, 
		15:{weapon:'需求-20%', armor:'需求-15%', helmet:'需求-15%', shield:'需求-15%', require:0},
		16:{weapon:'+10 體力', armor:'+10 體力', helmet:'+10 體力', shield:'+10 體力', require:35}, 
		17:{weapon:'+10 精力', armor:'+10 精力', helmet:'+10 精力', shield:'+10 精力', require:37}, 
		18:{weapon:'+10 敏捷', armor:'+10 敏捷', helmet:'+10 敏捷', shield:'+10 敏捷', require:39},
		19:{weapon:'+10 力量', armor:'+10 力量', helmet:'+10 力量', shield:'+10 力量', require:41}, 
		20:{weapon:'75% 額外金錢從怪物身上取得', armor:'50% 額外金錢從怪物身上取得', helmet:'50% 額外金錢從怪物身上取得', shield:'50% 額外金錢從怪物身上取得', require:43}, 
		21:{weapon:'+75% 對惡魔系怪物傷害,+100對惡魔系怪物準確率', armor:'+30% 增加防禦', helmet:'+30% 增加防禦', shield:'+30% 增加防禦', require:45},
		22:{weapon:'25% 撕裂傷口機會', armor:'全面抗性+15%', helmet:'全面抗性+15%', shield:'全面抗性+22%', require:47}, 
		23:{weapon:'防止怪物治療', armor:'法術傷害減少7', helmet:'法術傷害減少7', shield:'法術傷害減少7', require:49}, 
		24:{weapon:'30%更佳機率取得魔法物品', armor:'25% 更佳機率取得魔法物品', helmet:'25% 更佳機率取得魔法物品', shield:'25% 更佳機率取得魔法物品', require:51},
		25:{weapon:'20% 額外的攻擊準確率加成', armor:'+5% 最大毒素抗性', helmet:'+5% 最大毒素抗性', shield:'+5% 最大毒素抗性', require:53}, 
		26:{weapon:'7% 偷取法力', armor:'+5% 最大火焰抗性', helmet:'+5% 最大火焰抗性', shield:'+5% 最大火焰抗性', require:55}, 
		27:{weapon:'+50% 增強傷害', armor:'+5% 最大冰冷抗性', helmet:'+5% 最大冰冷抗性', shield:'+5% 最大冰冷抗性', require:57},
		28:{weapon:'20% 致命一擊機率', armor:'+5% 最大閃電抗性', helmet:'+5% 最大閃電抗性', shield:'+5% 最大閃電抗性', require:59}, 
		29:{weapon:'目標盲目', armor:'+5% 法力上限值', helmet:'+5% 法力上限值', shield:'+50 法力', require:61}, 
		30:{weapon:'20% 造成壓碎性打擊機率', armor:'傷害減少8%', helmet:'傷害減少8%', shield:'傷害減少8%', require:63},
		31:{weapon:'忽視目標防禦', armor:'+5%生命上限', helmet:'+5%生命上限', shield:'+50 生命', require:65}, 
		32:{weapon:'凍結目標', armor:'無法冰凍', helmet:'無法冰凍', shield:'無法冰凍', require:67}, 
		33:{weapon:'無法破壞', armor:'無法破壞', helmet:'無法破壞', shield:'無法破壞', require:69}
	}
	main.getEffectByNum = function(num)
	{
		return main.effect[num];
	}
})(self.diablo2 = self.diablo2 || {});