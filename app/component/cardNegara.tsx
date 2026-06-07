"use client";

import { useState, useMemo } from "react";
import { Search, ChevronRight } from "lucide-react";

type Country = {
  name: string;
  code: string;
  capital: string;
  region: string;
};

// 193 negara anggota PBB — { nama, kode (ISO alpha-2), ibu kota, benua }
const COUNTRIES: Country[] = [
  { name: "Afghanistan", code: "AF", capital: "Kabul", region: "Asia" },
  { name: "Albania", code: "AL", capital: "Tirana", region: "Eropa" },
  { name: "Algeria", code: "DZ", capital: "Algiers", region: "Afrika" },
  { name: "Andorra", code: "AD", capital: "Andorra la Vella", region: "Eropa" },
  { name: "Angola", code: "AO", capital: "Luanda", region: "Afrika" },
  { name: "Antigua and Barbuda", code: "AG", capital: "Saint John's", region: "Amerika" },
  { name: "Argentina", code: "AR", capital: "Buenos Aires", region: "Amerika" },
  { name: "Armenia", code: "AM", capital: "Yerevan", region: "Asia" },
  { name: "Australia", code: "AU", capital: "Canberra", region: "Oseania" },
  { name: "Austria", code: "AT", capital: "Vienna", region: "Eropa" },
  { name: "Azerbaijan", code: "AZ", capital: "Baku", region: "Asia" },
  { name: "Bahamas", code: "BS", capital: "Nassau", region: "Amerika" },
  { name: "Bahrain", code: "BH", capital: "Manama", region: "Asia" },
  { name: "Bangladesh", code: "BD", capital: "Dhaka", region: "Asia" },
  { name: "Barbados", code: "BB", capital: "Bridgetown", region: "Amerika" },
  { name: "Belarus", code: "BY", capital: "Minsk", region: "Eropa" },
  { name: "Belgium", code: "BE", capital: "Brussels", region: "Eropa" },
  { name: "Belize", code: "BZ", capital: "Belmopan", region: "Amerika" },
  { name: "Benin", code: "BJ", capital: "Porto-Novo", region: "Afrika" },
  { name: "Bhutan", code: "BT", capital: "Thimphu", region: "Asia" },
  { name: "Bolivia", code: "BO", capital: "Sucre", region: "Amerika" },
  { name: "Bosnia and Herzegovina", code: "BA", capital: "Sarajevo", region: "Eropa" },
  { name: "Botswana", code: "BW", capital: "Gaborone", region: "Afrika" },
  { name: "Brazil", code: "BR", capital: "Brasília", region: "Amerika" },
  { name: "Brunei", code: "BN", capital: "Bandar Seri Begawan", region: "Asia" },
  { name: "Bulgaria", code: "BG", capital: "Sofia", region: "Eropa" },
  { name: "Burkina Faso", code: "BF", capital: "Ouagadougou", region: "Afrika" },
  { name: "Burundi", code: "BI", capital: "Gitega", region: "Afrika" },
  { name: "Cabo Verde", code: "CV", capital: "Praia", region: "Afrika" },
  { name: "Cambodia", code: "KH", capital: "Phnom Penh", region: "Asia" },
  { name: "Cameroon", code: "CM", capital: "Yaoundé", region: "Afrika" },
  { name: "Canada", code: "CA", capital: "Ottawa", region: "Amerika" },
  { name: "Central African Republic", code: "CF", capital: "Bangui", region: "Afrika" },
  { name: "Chad", code: "TD", capital: "N'Djamena", region: "Afrika" },
  { name: "Chile", code: "CL", capital: "Santiago", region: "Amerika" },
  { name: "China", code: "CN", capital: "Beijing", region: "Asia" },
  { name: "Colombia", code: "CO", capital: "Bogotá", region: "Amerika" },
  { name: "Comoros", code: "KM", capital: "Moroni", region: "Afrika" },
  { name: "Congo (Republic)", code: "CG", capital: "Brazzaville", region: "Afrika" },
  { name: "Costa Rica", code: "CR", capital: "San José", region: "Amerika" },
  { name: "Côte d'Ivoire", code: "CI", capital: "Yamoussoukro", region: "Afrika" },
  { name: "Croatia", code: "HR", capital: "Zagreb", region: "Eropa" },
  { name: "Cuba", code: "CU", capital: "Havana", region: "Amerika" },
  { name: "Cyprus", code: "CY", capital: "Nicosia", region: "Eropa" },
  { name: "Czechia", code: "CZ", capital: "Prague", region: "Eropa" },
  { name: "DR Congo", code: "CD", capital: "Kinshasa", region: "Afrika" },
  { name: "Denmark", code: "DK", capital: "Copenhagen", region: "Eropa" },
  { name: "Djibouti", code: "DJ", capital: "Djibouti", region: "Afrika" },
  { name: "Dominica", code: "DM", capital: "Roseau", region: "Amerika" },
  { name: "Dominican Republic", code: "DO", capital: "Santo Domingo", region: "Amerika" },
  { name: "Ecuador", code: "EC", capital: "Quito", region: "Amerika" },
  { name: "Egypt", code: "EG", capital: "Cairo", region: "Afrika" },
  { name: "El Salvador", code: "SV", capital: "San Salvador", region: "Amerika" },
  { name: "Equatorial Guinea", code: "GQ", capital: "Malabo", region: "Afrika" },
  { name: "Eritrea", code: "ER", capital: "Asmara", region: "Afrika" },
  { name: "Estonia", code: "EE", capital: "Tallinn", region: "Eropa" },
  { name: "Eswatini", code: "SZ", capital: "Mbabane", region: "Afrika" },
  { name: "Ethiopia", code: "ET", capital: "Addis Ababa", region: "Afrika" },
  { name: "Fiji", code: "FJ", capital: "Suva", region: "Oseania" },
  { name: "Finland", code: "FI", capital: "Helsinki", region: "Eropa" },
  { name: "France", code: "FR", capital: "Paris", region: "Eropa" },
  { name: "Gabon", code: "GA", capital: "Libreville", region: "Afrika" },
  { name: "Gambia", code: "GM", capital: "Banjul", region: "Afrika" },
  { name: "Georgia", code: "GE", capital: "Tbilisi", region: "Asia" },
  { name: "Germany", code: "DE", capital: "Berlin", region: "Eropa" },
  { name: "Ghana", code: "GH", capital: "Accra", region: "Afrika" },
  { name: "Greece", code: "GR", capital: "Athens", region: "Eropa" },
  { name: "Grenada", code: "GD", capital: "Saint George's", region: "Amerika" },
  { name: "Guatemala", code: "GT", capital: "Guatemala City", region: "Amerika" },
  { name: "Guinea", code: "GN", capital: "Conakry", region: "Afrika" },
  { name: "Guinea-Bissau", code: "GW", capital: "Bissau", region: "Afrika" },
  { name: "Guyana", code: "GY", capital: "Georgetown", region: "Amerika" },
  { name: "Haiti", code: "HT", capital: "Port-au-Prince", region: "Amerika" },
  { name: "Honduras", code: "HN", capital: "Tegucigalpa", region: "Amerika" },
  { name: "Hungary", code: "HU", capital: "Budapest", region: "Eropa" },
  { name: "Iceland", code: "IS", capital: "Reykjavik", region: "Eropa" },
  { name: "India", code: "IN", capital: "New Delhi", region: "Asia" },
  { name: "Indonesia", code: "ID", capital: "Jakarta", region: "Asia" },
  { name: "Iran", code: "IR", capital: "Tehran", region: "Asia" },
  { name: "Iraq", code: "IQ", capital: "Baghdad", region: "Asia" },
  { name: "Ireland", code: "IE", capital: "Dublin", region: "Eropa" },
  { name: "Israel", code: "IL", capital: "Jerusalem", region: "Asia" },
  { name: "Italy", code: "IT", capital: "Rome", region: "Eropa" },
  { name: "Jamaica", code: "JM", capital: "Kingston", region: "Amerika" },
  { name: "Japan", code: "JP", capital: "Tokyo", region: "Asia" },
  { name: "Jordan", code: "JO", capital: "Amman", region: "Asia" },
  { name: "Kazakhstan", code: "KZ", capital: "Astana", region: "Asia" },
  { name: "Kenya", code: "KE", capital: "Nairobi", region: "Afrika" },
  { name: "Kiribati", code: "KI", capital: "Tarawa", region: "Oseania" },
  { name: "Kuwait", code: "KW", capital: "Kuwait City", region: "Asia" },
  { name: "Kyrgyzstan", code: "KG", capital: "Bishkek", region: "Asia" },
  { name: "Laos", code: "LA", capital: "Vientiane", region: "Asia" },
  { name: "Latvia", code: "LV", capital: "Riga", region: "Eropa" },
  { name: "Lebanon", code: "LB", capital: "Beirut", region: "Asia" },
  { name: "Lesotho", code: "LS", capital: "Maseru", region: "Afrika" },
  { name: "Liberia", code: "LR", capital: "Monrovia", region: "Afrika" },
  { name: "Libya", code: "LY", capital: "Tripoli", region: "Afrika" },
  { name: "Liechtenstein", code: "LI", capital: "Vaduz", region: "Eropa" },
  { name: "Lithuania", code: "LT", capital: "Vilnius", region: "Eropa" },
  { name: "Luxembourg", code: "LU", capital: "Luxembourg", region: "Eropa" },
  { name: "Madagascar", code: "MG", capital: "Antananarivo", region: "Afrika" },
  { name: "Malawi", code: "MW", capital: "Lilongwe", region: "Afrika" },
  { name: "Malaysia", code: "MY", capital: "Kuala Lumpur", region: "Asia" },
  { name: "Maldives", code: "MV", capital: "Malé", region: "Asia" },
  { name: "Mali", code: "ML", capital: "Bamako", region: "Afrika" },
  { name: "Malta", code: "MT", capital: "Valletta", region: "Eropa" },
  { name: "Marshall Islands", code: "MH", capital: "Majuro", region: "Oseania" },
  { name: "Mauritania", code: "MR", capital: "Nouakchott", region: "Afrika" },
  { name: "Mauritius", code: "MU", capital: "Port Louis", region: "Afrika" },
  { name: "Mexico", code: "MX", capital: "Mexico City", region: "Amerika" },
  { name: "Micronesia", code: "FM", capital: "Palikir", region: "Oseania" },
  { name: "Moldova", code: "MD", capital: "Chișinău", region: "Eropa" },
  { name: "Monaco", code: "MC", capital: "Monaco", region: "Eropa" },
  { name: "Mongolia", code: "MN", capital: "Ulaanbaatar", region: "Asia" },
  { name: "Montenegro", code: "ME", capital: "Podgorica", region: "Eropa" },
  { name: "Morocco", code: "MA", capital: "Rabat", region: "Afrika" },
  { name: "Mozambique", code: "MZ", capital: "Maputo", region: "Afrika" },
  { name: "Myanmar", code: "MM", capital: "Naypyidaw", region: "Asia" },
  { name: "Namibia", code: "NA", capital: "Windhoek", region: "Afrika" },
  { name: "Nauru", code: "NR", capital: "Yaren", region: "Oseania" },
  { name: "Nepal", code: "NP", capital: "Kathmandu", region: "Asia" },
  { name: "Netherlands", code: "NL", capital: "Amsterdam", region: "Eropa" },
  { name: "New Zealand", code: "NZ", capital: "Wellington", region: "Oseania" },
  { name: "Nicaragua", code: "NI", capital: "Managua", region: "Amerika" },
  { name: "Niger", code: "NE", capital: "Niamey", region: "Afrika" },
  { name: "Nigeria", code: "NG", capital: "Abuja", region: "Afrika" },
  { name: "North Korea", code: "KP", capital: "Pyongyang", region: "Asia" },
  { name: "North Macedonia", code: "MK", capital: "Skopje", region: "Eropa" },
  { name: "Norway", code: "NO", capital: "Oslo", region: "Eropa" },
  { name: "Oman", code: "OM", capital: "Muscat", region: "Asia" },
  { name: "Pakistan", code: "PK", capital: "Islamabad", region: "Asia" },
  { name: "Palau", code: "PW", capital: "Ngerulmud", region: "Oseania" },
  { name: "Panama", code: "PA", capital: "Panama City", region: "Amerika" },
  { name: "Papua New Guinea", code: "PG", capital: "Port Moresby", region: "Oseania" },
  { name: "Paraguay", code: "PY", capital: "Asunción", region: "Amerika" },
  { name: "Peru", code: "PE", capital: "Lima", region: "Amerika" },
  { name: "Philippines", code: "PH", capital: "Manila", region: "Asia" },
  { name: "Poland", code: "PL", capital: "Warsaw", region: "Eropa" },
  { name: "Portugal", code: "PT", capital: "Lisbon", region: "Eropa" },
  { name: "Qatar", code: "QA", capital: "Doha", region: "Asia" },
  { name: "Romania", code: "RO", capital: "Bucharest", region: "Eropa" },
  { name: "Russia", code: "RU", capital: "Moscow", region: "Eropa" },
  { name: "Rwanda", code: "RW", capital: "Kigali", region: "Afrika" },
  { name: "Saint Kitts and Nevis", code: "KN", capital: "Basseterre", region: "Amerika" },
  { name: "Saint Lucia", code: "LC", capital: "Castries", region: "Amerika" },
  { name: "Saint Vincent and the Grenadines", code: "VC", capital: "Kingstown", region: "Amerika" },
  { name: "Samoa", code: "WS", capital: "Apia", region: "Oseania" },
  { name: "San Marino", code: "SM", capital: "San Marino", region: "Eropa" },
  { name: "São Tomé and Príncipe", code: "ST", capital: "São Tomé", region: "Afrika" },
  { name: "Saudi Arabia", code: "SA", capital: "Riyadh", region: "Asia" },
  { name: "Senegal", code: "SN", capital: "Dakar", region: "Afrika" },
  { name: "Serbia", code: "RS", capital: "Belgrade", region: "Eropa" },
  { name: "Seychelles", code: "SC", capital: "Victoria", region: "Afrika" },
  { name: "Sierra Leone", code: "SL", capital: "Freetown", region: "Afrika" },
  { name: "Singapore", code: "SG", capital: "Singapore", region: "Asia" },
  { name: "Slovakia", code: "SK", capital: "Bratislava", region: "Eropa" },
  { name: "Slovenia", code: "SI", capital: "Ljubljana", region: "Eropa" },
  { name: "Solomon Islands", code: "SB", capital: "Honiara", region: "Oseania" },
  { name: "Somalia", code: "SO", capital: "Mogadishu", region: "Afrika" },
  { name: "South Africa", code: "ZA", capital: "Pretoria", region: "Afrika" },
  { name: "South Korea", code: "KR", capital: "Seoul", region: "Asia" },
  { name: "South Sudan", code: "SS", capital: "Juba", region: "Afrika" },
  { name: "Spain", code: "ES", capital: "Madrid", region: "Eropa" },
  { name: "Sri Lanka", code: "LK", capital: "Sri Jayawardenepura Kotte", region: "Asia" },
  { name: "Sudan", code: "SD", capital: "Khartoum", region: "Afrika" },
  { name: "Suriname", code: "SR", capital: "Paramaribo", region: "Amerika" },
  { name: "Sweden", code: "SE", capital: "Stockholm", region: "Eropa" },
  { name: "Switzerland", code: "CH", capital: "Bern", region: "Eropa" },
  { name: "Syria", code: "SY", capital: "Damascus", region: "Asia" },
  { name: "Tajikistan", code: "TJ", capital: "Dushanbe", region: "Asia" },
  { name: "Tanzania", code: "TZ", capital: "Dodoma", region: "Afrika" },
  { name: "Thailand", code: "TH", capital: "Bangkok", region: "Asia" },
  { name: "Timor-Leste", code: "TL", capital: "Dili", region: "Asia" },
  { name: "Togo", code: "TG", capital: "Lomé", region: "Afrika" },
  { name: "Tonga", code: "TO", capital: "Nuku'alofa", region: "Oseania" },
  { name: "Trinidad and Tobago", code: "TT", capital: "Port of Spain", region: "Amerika" },
  { name: "Tunisia", code: "TN", capital: "Tunis", region: "Afrika" },
  { name: "Turkey", code: "TR", capital: "Ankara", region: "Asia" },
  { name: "Turkmenistan", code: "TM", capital: "Ashgabat", region: "Asia" },
  { name: "Tuvalu", code: "TV", capital: "Funafuti", region: "Oseania" },
  { name: "Uganda", code: "UG", capital: "Kampala", region: "Afrika" },
  { name: "Ukraine", code: "UA", capital: "Kyiv", region: "Eropa" },
  { name: "United Arab Emirates", code: "AE", capital: "Abu Dhabi", region: "Asia" },
  { name: "United Kingdom", code: "GB", capital: "London", region: "Eropa" },
  { name: "United States", code: "US", capital: "Washington, D.C.", region: "Amerika" },
  { name: "Uruguay", code: "UY", capital: "Montevideo", region: "Amerika" },
  { name: "Uzbekistan", code: "UZ", capital: "Tashkent", region: "Asia" },
  { name: "Vanuatu", code: "VU", capital: "Port Vila", region: "Oseania" },
  { name: "Venezuela", code: "VE", capital: "Caracas", region: "Amerika" },
  { name: "Vietnam", code: "VN", capital: "Hanoi", region: "Asia" },
  { name: "Yemen", code: "YE", capital: "Sana'a", region: "Asia" },
  { name: "Zambia", code: "ZM", capital: "Lusaka", region: "Afrika" },
  { name: "Zimbabwe", code: "ZW", capital: "Harare", region: "Afrika" },
];

function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (c: string) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

const REGIONS = ["Semua", "Asia", "Eropa", "Afrika", "Amerika", "Oseania"];

export default function CardNegara() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("Semua");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COUNTRIES.filter((c) => {
      const matchRegion = region === "Semua" || c.region === region;
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q);
      return matchRegion && matchQuery;
    });
  }, [query, region]);

  return (
    <div className="relative w-full min-h-screen text-slate-100 p-4 md:p-8 bg-transparent">
      {/* Atmosfer / efek grid dekoratif (opsional) */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(16,185,129,0.08), transparent 28%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(59,130,246,0.08), transparent 24%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-8xl">
        {/* Search bar */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari negara atau ibu kota..."
              className="w-full rounded-xl border border-white/10 bg-gray-950/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400/50 focus:bg-gray-950/80"
            />
          </div>
        </div>

        {/* Filter region */}
        <div className="flex flex-wrap gap-2 mb-8">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                region === r
                  ? "bg-emerald-500 text-emerald-950"
                  : "border border-white/10 bg-gray-950/60 text-slate-300 hover:bg-white/10"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Grid kartu */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-slate-500">
            Tidak ada negara yang cocok dengan pencarianmu.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((c) => (
              <button
                key={c.code}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gray-950/40 p-5 text-left transition hover:border-emerald-400/30 hover:bg-gray-950/60"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-3xl leading-none select-none">
                    {flagEmoji(c.code)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-lg font-semibold text-slate-100">
                      {c.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                      <span className="truncate">{c.capital}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400/80">{c.region}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-400" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}