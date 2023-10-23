
using Microsoft.VisualBasic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Typst;

namespace PdfViewer.Services.Typst
{
    class TextConvertor
    {

            public string _text = "hello how are your";
            public List<String>? _imageBase64;
            public string? _imageData { get; set; } = "empty";
        
            public string _debug = "debug";


        public void SetText(string text)
            {
                _text = text;
            }

            public void AddData(List<String> items)
            {
              _imageBase64 = items;
            if (items.Count!=0)
            {
                _imageData = string.Join(" ", _imageBase64);
            }
            else
            {
                _imageData = "empty";
            }
            }

            public void RemoveData()
            {
                _imageBase64.Clear(); 
            }
            
            public String GetData()
            {
               return _text;
            }
           
           

            public string GetPdfBase64EncString()
            {
            unsafe
            {
                TypstCreate typst = new TypstCreate(_text);
                _debug = typst._debug;
                try
                {
                     string typstPdfBase64Enc = typst.CreatePdf(_imageData);
                     return typstPdfBase64Enc;
                }
                catch(Exception ex)
                {
                    _debug = ex.Message;
                    return _debug; 
                }
            }
            }

            public string GetImageJsonString(String format)
            {
            unsafe
            {
                TypstCreate typst = new TypstCreate(_text);
                _debug = typst._debug;
                try
                {
                    string imageJson = typst.CreateImage(format, _imageData);
                    return imageJson;
                }
                catch (Exception ex)
                {
                    _debug = ex.Message;
                    return _debug;
                }
            }
             }
    }
        }

    




