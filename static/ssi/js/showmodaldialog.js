(function() {
    window.spawn = window.spawn || function(gen) {
        function continuer(verb, arg) {
            var result;
            try {
                result = generator[verb](arg);
            } catch (err) {
                return Promise.reject(err);
            }
            if (result.done) {
                return result.value;
            } else {
                return Promise.resolve(result.value).then(onFulfilled, onRejected);
            }
        }
        var generator = gen();
        var onFulfilled = continuer.bind(continuer, 'next');
        var onRejected = continuer.bind(continuer, 'throw');
        return onFulfilled();
    };
    window.showModalDialog2 = window.showModalDialog || function(url, arg, opt, target_no, jump_url) {
        url = url || ''; //URL of a dialog
        arg = arg || null; //arguments to a dialog
        opt = opt || 'dialogWidth:300px;dialogHeight:200px'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles
        var caller = showModalDialog2.caller.toString();
        var dialog = document.body.appendChild(document.createElement('dialog'));
        dialog.setAttribute('style', opt.replace(/dialog/gi, ''));
        dialog.innerHTML = '<a href="#" id="dialog-close" style="position: absolute; top: 0; right: 4px; font-size: 20px; color: #000; text-decoration: none; outline: none;">X</a><iframe id="dialog-body" src="' + url + '" style="border: 0; width: 100%; height: 100%;"></iframe>';
        document.getElementById('dialog-body').contentWindow.dialogArguments = arg;
        document.getElementById('dialog-close').addEventListener('click', function(e) {
            e.preventDefault();
            dialog.close();
        });
        dialog.showModal();
        //if using yield
        if(caller.indexOf('yield') >= 0) {
            return new Promise(function(resolve, reject) {
                dialog.addEventListener('close', function() {
                    var returnValue = document.getElementById('dialog-body').contentWindow.returnValue;
                    document.body.removeChild(dialog);
                    resolve(returnValue);
                });
            });
        }
        //if using eval
        target_no = target_no - 1;
        if(target_no < 0) target_no = 0;
        var isNext = false;
        var isNext_Stop = false;
        var nextStmts = caller.split('\n').filter(function(stmt) {
            if(isNext || stmt.indexOf('showModalDialog Start') >= 0) {
                if(isNext && stmt.indexOf('showModalDialog End') >= 0) {
                    isNext_Stop = true;
                    return isNext = true;
                } else {
                    if(isNext_Stop) {
                        return isNext = false;
                    } else {
                        if(target_no == 0) {
                            return isNext = true;
                        } else {
                            target_no = target_no - 1;
                            return isNext = false;
                        }
                    }
                }
            }
            return false;
        });
        dialog.addEventListener('close', function() {
            var returnValue = document.getElementById('dialog-body').contentWindow.returnValue;
            document.body.removeChild(dialog);
            nextStmts[1] = nextStmts[1].replace(/(window\.)?showModalDialog2\(.*\)/g, JSON.stringify(returnValue));
            //eval('{\n' + nextStmts.join('\n'));
            eval(nextStmts.join('\n'));
        });
        throw 'Execution stopped until showModalDialog is closed';
    };
})();

//-------------------------------------------------------------------------------------
// モーダルダイアログの表示位置（左上座標）の取得
//-------------------------------------------------------------------------------------
function get_showModalDialog_top_left_param(height, width){
	var param = "",
		border = 5,
		taskbar = 40, // windows taskbar
		header = 20,
		w = width,
		h = height,
		x = 0,
		y = 0;

	x = window.screenX + (screen.width / 2) - (w / 2) - (border * 2);
	y = window.screenY + (screen.height / 2) - (h / 2) - taskbar - border;

	return("dialogtop=" + y + "px;" + "dialogleft=" + x + "px")
}