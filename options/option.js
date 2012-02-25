var ls = localStorage;

//Default AA RegExp
var reg = [
	'　　＼|　　／|＼　　|／　　|￣￣|\\\|　　|　　\\\||　 \\\(|[ 　]∧|[＿￣]{3,}\\\|',
	'┏┓|┗┛|━━━',
	'([ 　"-*,./:-<@\]-`]{3,}["-*,./:-<@\]-`{-~／].*){2}',
	'[蠶笵醴蹟黼鬱黌麌鬣蠻鼎面髟米]{3,}',
	'[>%-]{3,}.+[#>]{3,}'
	].join("\n");

var lsDefault = {
	// LocalStorageName : [ElementId, DefaultValue]
	//AA
	'linesAA'	:	['#lines_aa',3],
	'cssPost'	:	['#css_post',('font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif; font-size: 10px; line-height: 1.2;').split('; ').join(';\n')],
	'cssComment'	:	['#css_comment',('font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif; font-size: 8px; line-height: 1.2;').split('; ').join(';\n')],
	'AARegExp'	:	['#aa_reg',reg],
		
	//Shrink break
	'useShrink'	:	['#use_shrink',1],
	'linesShrink'	:	['#lines_shrink',3],
	'repStr'	:	['#repstr','<br><span style="color: #ccc">...</span><br>'],
		
	//Shibakari
	'useShibakari'	:	['#use_shibakari',1],
	'innerShibakari'	:	['#inner_shibakari',1],
	'charsShibakari'	:	['#chars_shibakari',3],
	'repShibakari'	:	['#rep_shibakari','......']
}

function saveValues(def){
	for(var lsName in def){
		switch (def[lsName][1]){
			case 1:
			case 0:
				var ele = document.querySelector(def[lsName][0]);
				if(ele.checked) {
					ls[lsName] = 1;
				}else{
					ls[lsName] = 0;
				}
				break;
			default:
				var ele = document.querySelector(def[lsName][0]);
				if(ele.value){
					ls[lsName] = ele.value;
				}else{
					ls[lsName] = def[lsName][1];
				}
				break;
		}
	}
}

// Save
function saveOptions() {
	saveValues(lsDefault);
	
  var status = document.querySelector('#save_button');
  status.innerHTML = 'Options Saved.';
  setTimeout(function() {
    status.innerHTML = 'Save';
  }, 3000);
}

function restoreValues(def){
	for(var lsName in def){
		switch (def[lsName][1]){
			case 1:
			case 0:
				var ele = document.querySelector(def[lsName][0]);
				if(ls[lsName] != 0){
  				ls[lsName] = 1;
  				ele.checked = true;
				}
				break;
			default:
				var ele = document.querySelector(def[lsName][0]);
				ele.value = ls[lsName];
				break;
		}
	}
}

// Restores
function restoreOptions() {
	restoreValues(lsDefault);
}