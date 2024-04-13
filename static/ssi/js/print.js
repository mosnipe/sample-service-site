function setLinkText(setElem , linkText){
		document.getElementById(setElem).innerHTML = linkText;
		document.getElementById(setElem).style.backgroundImage = "none";
		document.getElementById(setElem).style.paddingLeft = "0px";
}

function print_mode(){
	var str_link_text = "通常ページへ戻る";
	//要素が存在すればinnerHTML、無ければ''を代入
	var printlink1 = document.getElementById("print_mode_link") ? document.getElementById("print_mode_link").innerHTML : '';
	//
	if(printlink1 == str_link_text){
		location.reload(false);
	}else{
		if(printlink1 != '')setLinkText("print_mode_link",str_link_text);
		var cs = document.createElement("link");
		cs.rel="stylesheet";
		cs.href="/ssi/css/print-preview.css";
		cs.type="text/css";
		document.getElementsByTagName('head')[0].appendChild(cs);
	}
	window.scrollTo(0,0);
}