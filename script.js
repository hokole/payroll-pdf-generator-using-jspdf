function convertHTMLtoPDF() {
    window.jsPDF = window.jspdf.jsPDF;

    var doc = new jsPDF();

    // Source HTMLElement or a string containing HTML.
    var elementHTML = document.getElementById("divID");

    doc.html(elementHTML, {
        callback: function (doc) {
            // Save the PDF
            doc.save('sample-document.pdf');
        },
        x: 0,
        y: 0,
        width: 175, //target width in the PDF document
        windowWidth: 675 //window width in CSS pixels
    });
}

const rate = document.getElementById("rate");
const hours = document.getElementById("hours");
const yeartodate = document.getElementById("yeartodate");
const med = document.getElementById('medicare');
const ss = document.getElementById('ss');
const cg = document.getElementById('currentgross');
const cd = document.getElementById('currentded');
const cnp = document.getElementById('currentnp');
const currentTotal = document.getElementById('currentTotal');
const medytd = document.getElementById("medicareytd");
const ssytd = document.getElementById("ssytd");
const ytdgross = document.getElementById('ytdgross');
const ytdded = document.getElementById('ytdded');
const ytdnp = document.getElementById('ytdnp');
const fedtax = document.getElementById('fedtax');
const fedytd = document.getElementById('fedytd');
var checkFedTax = document.getElementById("checkFedTax");

rate.addEventListener("change", rateCalc);

hours.addEventListener("change", hoursCalc);

yeartodate.addEventListener("change", regytdCalc);

medytd.addEventListener('change', medytdCalc);

ssytd.addEventListener('change', ssytdCalc);

fedtax.addEventListener('change', fedtaxCalc);

fedytd.addEventListener('change', fedytdCalc);

currentTotal.addEventListener('change', currenttotalCalc);

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


function currenttotalCalc(e) {
    let value = e.target.value;
    if (rate.value == 'SALARY') {
        if (parseFloat(value) || Number.isInteger(value)) {
            currentTotal.value = USDollar.format(parseFloat(value));
        }
        cg.value = currentTotal.value;
        med.value = USDollar.format(medCalc(value));
        ss.value = USDollar.format(ssCalc(value));
        fedtax.value = USDollar.format(fedCalc(value));
        cd.value = USDollar.format(medCalc(value) + ssCalc(value) + fedCalc(value));
        cdvctt = parseFloat(value) - medCalc(value) - ssCalc(value) - fedCalc(value);
        cnp.value = USDollar.format(cdvctt);
    }
}

function rateCalc(e) {
    let value = e.target.value; //get dollar amount
    if (value == parseFloat(value)) {
        rate.value = USDollar.format(value);
        if (hours.value != null || hours.value != '') {
            total = parseFloat(value) * parseFloat(hours.value);
            Calc();
        }
    }

}

function hoursCalc(e) {
    let value = e.target.value;
    if (parseFloat(value)) {
        if (rate.value != null || rate.value != '') {
            total = parseFloat(value) * parseFloat(removesign(rate.value));
            Calc();
        }
    }
}

function fedtaxCalc(e) {
    let value = e.target.value;
    fedtax.value = USDollar.format(value);
}

function regytdCalc(e) {
    let value = e.target.value;
    yeartodate.value = USDollar.format(parseFloat(value) + parseFloat(removesign(currentTotal.value)));
    ytdgross.value = yeartodate.value;
}

function medytdCalc(e) {
    let value = e.target.value;
    medytd.value = USDollar.format(parseFloat(value) + parseFloat(removesign(med.value)));
    if (ssytd.value != null || ssytd.value != '') {
        deductCalc();
    } else if ((ssytd.value != null || ssytd.value != '') && (fedytd.value != null || fedytd.value != '')) {
        ytdCalcWFed();
    }
}

function ssytdCalc(e) {
    let value = e.target.value;
    ssytd.value = USDollar.format(parseFloat(value) + parseFloat(removesign(ss.value)));
    if (medytd.value != null || medytd.value != '') {
        deductCalc();
    } else if ((medytd.value != null || medytd.value != '') && (fedytd.value != null || fedytd.value != '')) {
        ytdCalcWFed();
    }
}

function fedytdCalc(e) {
    let value = e.target.value;
    fedytd.value = USDollar.format(parseFloat(value) + parseFloat(removesign(fedtax.value)));
    if ((medytd.value != null || medytd.value != '') && (ssytd.value != null || ssytd.value != '') && (fedytd.value != null || fedytd.value != '')) {
        ytdCalcWFed();
    }
    deductCalc();
}

function ytdCalcWFed() {
    ytdded.value = USDollar.format(parseFloat(removesign(medytd.value)) + parseFloat(removesign(ssytd.value)) + parseFloat(fedytd.value));
    ytdnp.value = USDollar.format(parseFloat(removesign(ytdgross.value)) - parseFloat(removesign(ytdded.value)));
}

function medCalc(e) {
    medicare = e * 0.0145;
    return medicare;
}

function ssCalc(e) {
    socials = e * 0.062;
    return socials;
}

function fedCalc(e) {
    fed = e * 0.08;
    return fed;
}

function Calc() {
    currentTotal.value = USDollar.format(total);
    med.value = USDollar.format(medCalc(total));
    ss.value = USDollar.format(ssCalc(total));
    fedtax.value = USDollar.format(fedCalc(total));
    cg.value = USDollar.format(total);

    if (checkFedTax.checked == true) {
        cdv = medCalc(total) + ssCalc(total) + fedCalc(total);
    } else {
        cdv = medCalc(total) + ssCalc(total);
        fedtax.value = null;
        fedytd.value = null;
    }
    cd.value = USDollar.format(cdv);
    cnp.value = USDollar.format(total - cdv);
}

function deductCalc() {
    if (fedtax.value == null || fedtax.value == '') {
        ytdded.value = USDollar.format(parseFloat(removesign(medytd.value)) + parseFloat(removesign(ssytd.value)));
        ytdnp.value = USDollar.format(parseFloat(removesign(ytdgross.value)) - parseFloat(removesign(ytdded.value)));
        
        
    } else {
        ytdded.value = USDollar.format(parseFloat(removesign(medytd.value)) + parseFloat(removesign(ssytd.value)) + parseFloat(removesign(fedytd.value)));
        ytdnp.value = USDollar.format(parseFloat(removesign(ytdgross.value)) - parseFloat(removesign(ytdded.value)));
    }
}

function removesign(e) {
    result = e.replace(/\$/g, '');
    result = result.replaceAll(',', '');
    return result;
}