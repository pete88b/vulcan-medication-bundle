function useExampleValues(api_base, subject, headers) {
    document.getElementById("api_base").value = api_base;
    document.getElementById("subject").value = subject;
    document.getElementById("headers").value = (headers) ? headers : '';
}

function addSourceTextToClipboardListener(id, url, source) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('click', () => {
            const text = document.getElementById(source).textContent;
            navigator.clipboard.writeText(text).then(function() {
                        window.open(url);
                    }, function() {
                        console.log('clipboard write failed')
                        window.open(url);
                    });
        });
    }
}

addSourceTextToClipboardListener("openFhirValidator", "https://inferno.healthit.gov/validator/", "medication_bundle");
addSourceTextToClipboardListener("openFhirValidator2", "https://inferno.healthit.gov/validator/", "statusFilterNegatedList");
addSourceTextToClipboardListener("openTransformBundle", "https://mylinks-prod-sdtmtool.azurewebsites.net/TransformBundle", "medication_bundle");

function resizeOnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}
let textarea=document.getElementById('headers')
textarea.setAttribute('style', 'height:' + (textarea.scrollHeight) + 'px; overflow-y:hidden;');
textarea.addEventListener('input', resizeOnInput, false);

if (document.getElementById("convert_to_cdisc")) {
    document.getElementById("convert_to_cdisc").addEventListener('click', () => {
        const bundle = document.getElementById("medication_bundle").textContent;
        const url = 'https://mylinks-prod-sdtmtool.azurewebsites.net/TransformBundle/Process';
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                window._e = e;
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                console.log('convert to CDISC failed ...'); // TODO: proper messages
            }
        })
        xhr.send(bundle);
    });
}

function statusFilterStep1() {
    const bundle = document.getElementById("medication_bundle").textContent;
    const url = 'status_filter';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.addEventListener('readystatechange', function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("statusFilterStep2").style.display = 'inline';
            document.getElementById("validateNegatedList").style.display = 'block';
            const p = document.getElementById("statusFilterNegatedList");
            p.style.display = 'block';
            p.innerText = xhr.responseText;
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            console.log('status filter step 1 failed ...'); // TODO: proper messages
        }
    })
    xhr.send(bundle);
}

function statusFilterStep2() {
    alert("Sorry - we've not done this bit yet");
}