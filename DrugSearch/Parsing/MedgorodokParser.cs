using CsQuery;
using System.Collections.Generic;

namespace DrugSearch.Parsing
{
    public class AptekaDrugInfo
    {
        public string AptekaName { get; set; }
        public string Address { get; set; }
        public string WorkingHours { get; set; }
        public string Phones { get; set; }
        public string UpdateDate { get; set; }
        public string Price { get; set; }

    }
    public static class MedgorodokParser
    {
        public static IEnumerable<AptekaDrugInfo> Parse(string html)
        {
            var dom = CQ.Create(html);

            foreach (var row in dom[".apothecas-addresses-list-item"])
            {
                var rowDom = CQ.Create(row);

                var aptekaName = rowDom[".apothecas-addresses-list-item-name-field a"].Text();
                var workingHours = rowDom[".apothecas-addresses-list-item-name-time"].Text().Trim();
                var address = rowDom[".apothecas-addresses-list-item-contacts-address"].Text();
                var phones = rowDom[".apothecas-addresses-list-item-contacts-phones"].Text();
                var updateDate = rowDom[".apothecas-addresses-list-item-update"].Text();
                var price = rowDom[".apothecas-addresses-list-item-price span"].Text();

                yield return new AptekaDrugInfo()
                {
                    AptekaName = aptekaName,
                    WorkingHours = workingHours,
                    Address = address,
                    Phones = phones,
                    UpdateDate = updateDate,
                    Price = price
                };
            }
        }
    }
}