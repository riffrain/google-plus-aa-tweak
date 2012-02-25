var ls = localStorage;

//Default AA RegExp
var reg = [
	'　　＼|　　／|＼　　|／　　|￣￣|\\\|　　|　　\\\||　 \\\(|[ 　]∧|[＿￣]{3,}\\\|',
	'┏┓|┗┛|━{3,}',
	'([ 　"-*,./:-<@\]-`]{3,}["-*,./:-<@\]-`{-~／].*){2}',
	'[蠶笵醴蹟黼鬱黌麌鬣蠻鼎面髟米]{3,}',
	'[>%-]{3,}.+[#>]{3,}'
	].join("\n");

var lsDefault = {
	// LocalStorageName : DefaultValue
	//AA
	'linesAA'	:	3,
	'cssPost'	:	('font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif; font-size: 10px; line-height: 1.2;').split('; ').join(';\n'),
	'cssComment'	:	('font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif; font-size: 8px; line-height: 1.2;').split('; ').join(';\n'),
	'AARegExp'	:	reg,
		
	//Shrink break
	'useShrink'	:	1,
	'linesShrink'	:	3,
	'repStr'	:	'<br><span style="color: #ccc">...</span><br>',
		
	//Shibakari
	'useShibakari'	:	1,
	'innerShibakari'	:	0,
	'charsShibakari'	:	3,
	'repShibakari'	:	'......'
}

function setDefaultValues(def){
	for (var e in def){
		if(!ls[e]){
			ls[e] = def[e];
			
		//以下前のバージョンを使用していた場合の対策
		}else if(ls[e] == "enable"){
			ls[e] = 1;
		}else if(ls[e] == "disable"){
			ls[e] = 0;
		}
	}
}

setDefaultValues(lsDefault);