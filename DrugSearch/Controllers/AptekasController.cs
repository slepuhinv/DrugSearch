using DrugSearch.Parsing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace DrugSearch.Controllers
{
    public class AptekasQuery
    {
        public string Url { get; set; }
    }

    public class AptekasController : ApiController
    {
        // GET: api/Apthekas
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Apthekas/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Aptekas
        public async Task<IEnumerable<AptekaDrugInfo>> Post([FromBody]AptekasQuery query)
        {
            var html = await HtmlDownloader.Download("http://www.medgorodok.ru" + query.Url);
            var data = MedgorodokParser.Parse(html);
            return data;
        }

        // PUT: api/Apthekas/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Apthekas/5
        public void Delete(int id)
        {
        }
    }
}
