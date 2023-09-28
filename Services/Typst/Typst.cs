
using System.Runtime.InteropServices;
using System.Text;
using CsBindgen;


namespace Typst
{
    class TypstCreate
    {

		private string textBse64Enc;
		private string outputFormat = "";
		private string pdfBase64Enc = "";
        private string imageJsonString = "";
		
        public TypstCreate(string typstText)
        {
            textBse64Enc = Base64Encode(typstText);

		}
		
		public String CreatePdf()
		{
            this.outputFormat = "pdf";
            unsafe 
            {
                fixed (byte* p = Encoding.ASCII.GetBytes(this.textBse64Enc), q = Encoding.ASCII.GetBytes(this.outputFormat))
                {   
                    var ptrTxt = NativeMethods.TypstCreate(p,q);
                     

                	pdfBase64Enc = Marshal.PtrToStringUTF8(new IntPtr(ptrTxt));


                }
            }
            
			return pdfBase64Enc;
            
        }	

        public String CreateImage(string outputFormat)
		{
            
            this.outputFormat = outputFormat;
            unsafe 
            {
                fixed (byte* p = Encoding.ASCII.GetBytes(this.textBse64Enc), q = Encoding.ASCII.GetBytes(this.outputFormat))
                {   
                    var ptrTxt = NativeMethods.TypstCreate(p,q);
                     

                	imageJsonString = Marshal.PtrToStringUTF8(new IntPtr(ptrTxt));


                }
            }
            
			return imageJsonString;
            
            
        }	
        public static string Base64Encode(string plainText) 
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData) 
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

    }

    

}
