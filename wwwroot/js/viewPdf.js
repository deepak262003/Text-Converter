function createBlobUrl(data, format) {
    console.log(format);

    const binary = atob(data);

    const uint8Array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        uint8Array[i] = binary.charCodeAt(i);
    }
    
    const blob = new Blob([uint8Array], { type: `${(format=="pdf")?"application":"image"}/${format}` });

    const url = URL.createObjectURL(blob);

    return url;
}
async function openPdf(data,format) {
    var newTab = window.open("");

    let url = createBlobUrl(data,format);

    console.log(url);

    newTab.document.write(

        "<html><head><title>Pdf viewer</title></head><body><iframe title='MY title'  width='100%' height='100%' src='" + url + "'></iframe></body></html>"

    );
}

async function openImage(data, format ,id) {
    //var newTab = window.open("");

    let url = createBlobUrl(data, format);

    console.log(url);

    const imgElement = document.getElementById(id);
    console.log(imgElement);

    if (imgElement) {
        imgElement.src = url;
    } else {
        console.log("error");
    }

    /*newTab.document.write(

        "<html><head><title>Pdf viewer</title></head><body><img  width=200px' height='200px' src='" + url + "'></img></body></html>"

    );*/
}

 function openEditor(PdfGenerator) {


        init();
        function init() {
            const editor = document.getElementById('textedit');
            const flask = new CodeFlask(editor, { language: 'css', lineNumbers: true  });

            console.log("hello");
            flask.onUpdate((code) => {
                console.log(code);
                PdfGenerator.invokeMethodAsync("textUpdate", code);
            });
        }

}

 function openImage(list, format) {
    var Urls = [];
    for (let i = 0; i < list.length; i++) {
        console.log(list[i].number);
        let data = list[i].data;
        let url = createBlobUrl(data, format);
        Urls.push(url);
    }
    console.log(Urls);
    return Urls;
}

async function viewImage(data, format) {
    var newTab = window.open("");

    console.log(data);

    newTab.document.write(

        "<html><head><title>Pdf viewer</title></head><body><center><img  width=500px' height='600px' style='margin:auto;border:2px solid black' src='" + data + "'></img></center></body></html>"

    );
}

async function viewsvg(data) {
    var newTab = window.open("");

    console.log(data);

    newTab.document.write(

        "<html><head><title>Pdf viewer</title></head><body><center><iframe  width=500px' height='600px' style='margin:auto;border:2px solid black' src='" + data + "'></iframe></center></body></html>"

    );
}