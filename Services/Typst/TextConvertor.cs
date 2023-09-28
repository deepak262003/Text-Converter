
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using Typst;

namespace PdfViewer.Services.Typst
{
    class TextConvertor
    {

            public string _text = "hello how are your";

            

            public void SetText(string text)
            {
                _text = text;
            }

            public string GetPdfBase64EncString()
            {
              TypstCreate typst = new TypstCreate(_text);

              string typstPdfBase64Enc = typst.CreatePdf();
              return typstPdfBase64Enc;
            }

            public string GetImageJsonString(String format)
            {
             TypstCreate typst = new TypstCreate(_text);
             string imageJson = typst.CreateImage(format);
             return imageJson;
             }
    }
        }

    




