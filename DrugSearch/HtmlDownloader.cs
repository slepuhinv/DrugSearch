using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DrugSearch
{
    public static class HtmlDownloader
    {
        public static async Task<string> Download(string urlAddress)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(urlAddress);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                Stream receiveStream = response.GetResponseStream();
                StreamReader readStream = null;

                if (response.CharacterSet == null)
                {
                    readStream = new StreamReader(receiveStream);
                }
                else
                {
                    readStream = new StreamReader(receiveStream, Encoding.GetEncoding(response.CharacterSet));
                }

                string data = await readStream.ReadToEndAsync();

                response.Close();
                readStream.Close();

                return data;
            }
            throw new InvalidOperationException($"Can't download page from '{urlAddress}'");
        }
    }
}