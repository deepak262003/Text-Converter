// <auto-generated>
// This code is generated by csbindgen.
// DON'T CHANGE THIS DIRECTLY.
// </auto-generated>
#pragma warning disable CS8500
#pragma warning disable CS8981
using System;
using System.Runtime.InteropServices;


namespace CsBindgen
{
    internal static unsafe partial class NativeMethods
    {
        const string __DllName = "typst_lib";



        [DllImport(__DllName, EntryPoint = "TypstCreate", CallingConvention = CallingConvention.Cdecl, ExactSpelling = true)]
        public static extern byte* TypstCreate(byte* typst_source, byte* output_format);


    }



}
    