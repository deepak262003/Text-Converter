var zipBlob = "empty";
function createBlobUrl(data, format) {
    console.log(format);
    console.log(data);
    try {
       var binary = atob(data);
    }
    catch (err) {
        //const error = JSON.parse(data);
        const obj =  data.substring(data.indexOf("message")+10, data.indexOf("trace")-3);
        //const error = JSON.parse(obj);
        alert("compilation failed : " + obj);
        return "error";
    }

    const uint8Array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        uint8Array[i] = binary.charCodeAt(i);
    }
    
    const blob = new Blob([uint8Array], { type: `${(format=="pdf")?"application":"image"}/${format}` });

    const url = URL.createObjectURL(blob);

    return url;
}
async function openPdf(data,format,isDownload) {
    let url = createBlobUrl(data, format);
    if (url == "error") {
        alert("error generating pdf...");
    }
    else {
        var newTab = window.open("");
        console.log(url);
        if (isDownload == "True") {
            triggerDownload(url, "pdf");
        }
        newTab.document.write(

            "<html><head><title>Pdf viewer</title></head><body><iframe title='MY title'  width='100%' height='100%' src='" + url + "'></iframe></body></html>"

        );
    }
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

function openImage(list, format, isDownload ,err) {
    var Urls = [];
    if (list != null) {
        for (let i = 0; i < list.length; i++) {
            console.log(list[i].number);
            let data = list[i].data;
            let url = createBlobUrl(data, format);

            Urls.push(url);
        }
        console.log(Urls);
        if (isDownload == "True") {
            getBlobFromUrls(Urls, format)
        }
        return Urls;
    }
    else {
        const obj = err.substring(err.indexOf("message") + 10, err.indexOf("trace") - 3);
        //const error = JSON.parse(obj);
        alert("compilation failed : " + obj);
        alert(`error generating ${format}...`);
        return null;
    }
}

async function viewImage(data, format,isDownload) {
    var newTab = window.open("");

    console.log(data);
    if (isDownload == "True") {
        triggerDownload(data, "png");
    }
    newTab.document.write(

        "<html><head><title>Pdf viewer</title></head><body style='background-color:#242222'><center><img  width=500px' height='600px' style='margin:auto;border-radius:8px' src='" + data + "'></img></center></body></html>"

    );
}

async function viewsvg(data,isDownload) {
    var newTab = window.open("");
    console.log(data);
    if (isDownload == "True") {
        triggerDownload(data, "svg");
    }
    newTab.document.write(

        "<html><head><title>Pdf viewer</title></head><body><center><iframe  width=700px' height='600px' style='margin:auto;border-radius:8px' src='" + data + "'></iframe></center></body></html>"

    );
}

function triggerDownload(data, format){
    const downloadLink = document.createElement("a");
    downloadLink.href = data;
    downloadLink.download = "image." + format;
    downloadLink.click();
}

async function getBlobFromUrls(blobUrls,format) {
    var blobs = [];  
        for (const url of blobUrls) {
            const response = await fetch(url);
            const blob = await response.blob();
            blobs.push(blob);
        }
        console.log(blobs);
        createZipFile(blobs,format);

}

async function createZipFile(blobs,format) {
    const zip = new JSZip();
    console.log(blobs.length);
    
        for (let i = 0; i < blobs.length; i++) {
            const fileName = `image${i + 1}.${(format==="png")?"png":"svg"}`;
            zip.file(fileName, blobs[i]);
        }
        zipBlob = await zip.generateAsync({ type: 'blob' });
        zipUrl = URL.createObjectURL(zipBlob);
        //console.log(zipBlob);
        console.log(zipUrl);
        triggerDownload(zipUrl, "zip");
    
}

function printf(message) {
    console.log(message);
}

function alertMessage(message) {
    alert(message);
    console.log(message);
}
