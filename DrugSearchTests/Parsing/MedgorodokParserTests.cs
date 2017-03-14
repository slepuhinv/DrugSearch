using Microsoft.VisualStudio.TestTools.UnitTesting;
using DrugSearch.Parsing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugSearch.Parsing.Tests
{
    [TestClass()]
    public class MedgorodokParserTests
    {
        [TestMethod()]
        public void ParseTest()
        {
            var html = @"
<tr class=""apothecas-addresses-list-item"" data-district=""3"" data-worktime=""0"" style=""display: table-row;"">
    <td class=""apothecas-addresses-list-item-name"">
        <div class=""apothecas-addresses-list-item-name-field"">
            <a href=""/enterprise/apteka-a2-krestinskogo-59-1-enterprise-2055263.html"">Аптека А2 (Крестинского 59/1)</a>
        </div>
        <div class=""apothecas-addresses-list-item-name-time"">
            <img alt="""" src=""/assets/img/icons/time-green.png""> 08:00-23:00
        </div>
    </td>
    <td class=""apothecas-addresses-list-item-contacts"">
        <div class=""apothecas-addresses-list-item-contacts-address"">ул. Крестинского, д. 59/1</div>
            <div class=""apothecas-addresses-list-item-contacts-phones"">+7 912 204-00-03</div>
    </td>
    <td class=""apothecas-addresses-list-item-update"" title=""1"">09-03-2017</td>
    <td class=""apothecas-addresses-list-item-price""><span>248.00</span> р.</td>
</tr>
";
            var aptekaInfo = MedgorodokParser.Parse(html);

            Assert.IsTrue(aptekaInfo.Count() == 1);
            var firstElement = aptekaInfo.First();
            Assert.AreEqual("Аптека А2 (Крестинского 59/1)", firstElement.AptekaName);
            Assert.AreEqual("ул. Крестинского, д. 59/1", firstElement.Address);
            Assert.AreEqual("+7 912 204-00-03", firstElement.Phones);
            Assert.AreEqual("08:00-23:00", firstElement.WorkingHours);
            Assert.AreEqual("09-03-2017", firstElement.UpdateDate);
            Assert.AreEqual("248.00", firstElement.Price);
        }

        [TestMethod()]
        public void ParseTest2()
        {
            var html = HtmlDownloader.Download("http://www.medgorodok.ru/drugs/aspirin-tabl-500-mg-n10-bajer-bitterfeld-gmbh-germaniya-drugs-21184.html");
            html.Wait();

            var result = MedgorodokParser.Parse(html.Result);
        }



    }
}