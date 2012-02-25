/*

	 Google+ AA Tweak[Chrome Extention Ver.]

*/
var STREAM_ID = '#contentPane';	//Stream ID
var ELEMENTS = {
	'Post': '.rXnUBd',
	'Comment': '.kH',
	'Url': '.s-r-Ge-ec',	//URL Preview
	'Reshare': '.Wt>div',
	'Lightbox': '.Up1GYd'
}

var FLAGS = {
	'Tweak': 'aa-tweak',
	'Post': 'aa-tweak-post',
	'Comment': 'aa-tweak-comment'
}

var com_wrapper_start = "<div class='aa-tweak-comment'>";
var com_wrapper_end = '</div>';

function setValues(ls){
	use_shrink_br = ls['useShrink'];
	use_shibakari = ls['useShibakari'];
	shibakari_in_aa = ls['innerShibakari'];
	rep_shibakari = ls['repShibakari'];
	rep_sb = ls['repStr'];
	
	//半角用
	regexp_shibakari_hankaku = new RegExp();
	var reg = '(?:[^(?:(?:ftp|https?):\/\/.)]\n?w{' + ls['charsShibakari'] + ',}[^a-vA-VX-Zx-z0-9/.%#~+*&?!=\|.-])';
	regexp_shibakari_hankaku.compile(reg,'i');
	//全角用
	regexp_shibakari_zenkaku = new RegExp();
	reg = '(?:ｗ{' + ls['charsShibakari'] + ',})';
	regexp_shibakari_zenkaku.compile(reg,'gi');

	regexp_sb = new RegExp();
	ls['linesShrink']++;
	reg = '(?:[ 　]*(\n)?<br>){'+ ls['linesShrink'] + ',}';
	regexp_sb.compile(reg,'g');

	regexp_lines = new RegExp();
	reg = '(?:.+?<br>){' + ls['linesAA'] + ',}';
	regexp_lines.compile(reg,'g');
	
	regexp_aa = new RegExp();
	reg = '(?:' + ls['AARegExp'].split('\n').join(')|(?:') + ')';
	regexp_aa.compile(reg,'g');
	
	css = {
		'.aa-tweak-post' : ls['cssPost'].split('\n').join(''),
		'.aa-tweak-comment' : ls['cssComment'].split('\n').join('')
	};
	s = document.styleSheets[0];
	for (var e in css){
	  s.insertRule(e + '{' + css[e] + '}', s.cssRules.length);
	}
	
	delete ls;
	delete reg;
	delete css;
	
}

function Shibakari(str){
	//全角
	str = str.replace(regexp_shibakari_zenkaku, rep_shibakari);
	
	//半角
	while(str.match(regexp_shibakari_hankaku)){
		var m = str.match(regexp_shibakari_hankaku);
		var s1 = m[0];
		if(s1[0].match(/w/i)){
			var s2 = "";
		}else{
			var s2 = s1[0];
		}
		if(s1.slice(-1).match(/w/i)){
			s2 += rep_shibakari;
		}else{
			s2 += rep_shibakari + s1.slice(-1);
		}
		
		str = str.replace(s1, s2);
	}

	return str;
}

function AATweak(target){
	var e = document.querySelectorAll(target);
	var el = e.length;
  	for(var i=0; i<el; i++){
  		var classname = e[i].className;
		if(classname.indexOf(FLAGS['Tweak']) == -1){
			var innerhtml = e[i].innerHTML;
			var innertext = e[i].innerText;
			//AA
			if(innerhtml.match(regexp_lines) && innertext.match(regexp_aa)){
				if(target === ELEMENTS['Comment']){
	   		 		innerhtml = com_wrapper_start + innerhtml + com_wrapper_end;
					classname += ' ' + FLAGS['Comment'];
				}else{
		    		classname += ' ' + FLAGS['Post'];
		    	}
			}
			
			//改行省略
			if(use_shrink_br == 1){
				innerhtml = innerhtml.replace(regexp_sb, rep_sb);
			}
			//芝刈
			if(((classname.indexOf(FLAGS['Post']) == -1 || classname.indexOf(FLAGS['Comment']) == -1)|| shibakari_in_aa)
				&& use_shibakari == 1){
				innerhtml = Shibakari(innerhtml);
			}
			
			e[i].className = classname + ' ' + FLAGS['Tweak'];
	    	e[i].innerHTML = innerhtml;
		}
	}
}

var timer = 0;
var nodeTarget = document.querySelector(STREAM_ID);
if (!nodeTarget) nodeTarget = document.body;

function updateStream(){
	if (timer) return;
	timer = setTimeout(function () {
		for (var c in ELEMENTS){
	  	AATweak(ELEMENTS[c]);
		}
		timer = 0;
	}, 300);
}

//イベント設定
function registrationEvents(){
	//一応初回用
	updateStream();
	nodeTarget.addEventListener('DOMNodeInserted', function (){
		updateStream();
	});
}

// Load Settings
chrome.extension.sendRequest({'getOptions':true}, setValues);

setTimeout(registrationEvents(), 300);
