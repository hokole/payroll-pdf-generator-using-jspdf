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

rate.addEventListener("change", rateCalc);

hours.addEventListener("change", hoursCalc);

yeartodate.addEventListener("change", regytdCalc);

medytd.addEventListener('change', medytdCalc);

ssytd.addEventListener('change', ssytdCalc);

function rateCalc(e) {
    let value = e.target.value; //get dollar amount
    if (value[0] == '$') {
        value = value.replace('$', '');
    }
    if (hours.value != null || hours.value != '') {
        total = parseFloat(value) * parseFloat(hours.value);
        currentTotal.value = total;
        med.value = medCalc(total);
        ss.value = ssCalc(total);
        cg.value = total;
        cdv = medCalc(total) + ssCalc(total);
        cd.value = cdv;
        cnp.value = total - cdv;
    }

}

function hoursCalc(e) {
    let value = e.target.value;
    if (parseFloat(value)) {
        if (rate.value != null || rate.value != '') {
            total = parseFloat(value) * parseFloat(removesign(rate.value));
            currentTotal.value = total;
            med.value = medCalc(total);
            ss.value = ssCalc(total);
            cg.value = total;
            cdv = medCalc(total) + ssCalc(total);
            cd.value = cdv;
            cnp.value = total - cdv;
        }
    }
}

function regytdCalc(e) {
    let value = e.target.value;
    yeartodate.value = parseFloat(value) + parseFloat(currentTotal.value);
    ytdgross.value = yeartodate.value;
}

function medytdCalc(e) {
    let value = e.target.value;
    medytd.value = parseFloat(value) + parseFloat(med.value);
    if (ssytd.value != null || ssytd.value != '') {
        ytdded.value = parseFloat(medytd.value) + parseFloat(ssytd.value);
        ytdnp.value = parseFloat(ytdgross.value) - parseFloat(ytdded.value);
    }
}

function ssytdCalc(e) {
    let value = e.target.value;
    ssytd.value = parseFloat(value) + parseFloat(ss.value);
    if (medytd.value != null || medytd.value != '') {
        ytdded.value = parseFloat(medytd.value) + parseFloat(ssytd.value);
        ytdnp.value = parseFloat(ytdgross.value) - parseFloat(ytdded.value);
    }
}



function removesign(e) {
    if (e[0] == '$') {
        return e.replace('$', '');
    }
}

function medCalc(e) {
    medicare = e * 0.0145;
    return medicare;
}

function ssCalc(e) {
    socials = e * 0.062;
    return socials;
}