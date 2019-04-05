'use strict';

function generateURL(gender, trans) {
    var url = 'http://whatsyourgender.com?';
    url = url + 'gender=' + gender;
    url = url + '&trans=' + trans;
    return url;
}

function clearDisplay() {
    var display = document.getElementById('gender-url');
    var children = display.children;
    if (children && children.length > 0) {
        var length = children.length;
        for (var i = 0; i < length; ++i) {
            display.children[0].remove();
        }
    }
}

function attachGenerateHandler() {
    document.getElementById('generate').addEventListener('click', function(e) {
        e.preventDefault();

        // clear display
        clearDisplay();

        // extract user-supplied data
        var gender, trans, error = false, genderError, transError;

        var form = e.target.form;

        gender = encodeURI(form[0].value.toLowerCase());
        trans = encodeURI(form[1].value.toLowerCase());

        if (!gender || gender == '') {
            genderError = document.createElement('p');
            genderError.innerText = "Please enter some value for the question \"What is your gender?\"";
            error = true;
        }
        if (!trans || trans == '--') {
            transError = document.createElement('p');
            transError.innerText = "Please select an option for the question \"Do you wish to identify yourself as transgender?\"";
            error = true;
        }

        if (error) {
            var display = document.getElementById('gender-url');
            genderError && display.appendChild(genderError);
            transError && display.appendChild(transError);
            return false;
        }

        // generate URL
        var url = generateURL(gender, trans);

        // display URL on screen
        var display = document.getElementById('gender-url');
        for (var i = 0; i < display.children.length; ++i) {
            display.children[i].remove();
        }
        var anchor = document.createElement('a');
        anchor.setAttribute('href', url);
        anchor.innerText = url;
        display.appendChild(anchor);

        return false;
    });
}

function attachClearHandler() {
    document.getElementById('clear').addEventListener('click', function(e) {
        e.preventDefault();

        // extract user-supplied data
        var gender, trans;

        var form = e.target.form;

        gender = form[0];
        trans = form[1];

        // set values to empty string or default option
        gender.value = '';
        trans.value = '--';

        return false;
    });
}
