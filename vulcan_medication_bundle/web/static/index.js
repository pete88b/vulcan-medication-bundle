function useExampleValues(api_base, subject) {
    document.getElementById("api_base").value = api_base;
    document.getElementById("subject").value = subject;
}

function addBundleToClipboardListener(id, url) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('click', () => {
            const text = document.getElementById("medication_bundle").textContent;
            navigator.clipboard.writeText(text).then(function() {
                        window.open(url);
                    }, function() {
                        console.log('clipboard write failed')
                        window.open(url);
                    });
        });
    }
}

addBundleToClipboardListener("openFhirValidator", "https://inferno.healthit.gov/validator/");
addBundleToClipboardListener("openTransformBundle", "https://mylinks-prod-sdtmtool.azurewebsites.net/TransformBundle");

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

