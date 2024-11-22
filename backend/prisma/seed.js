const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hospitals = [
  {
    name: "AIIMS (Main)",
    address: "Ansari Nagar, Ring Road",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110029", 
    phone: "25494264, 26589766",
    email: "info@aiims.edu",
    website: "www.aiims.edu",
    capacity: 646
  },
  {
    name: "Armed Forces Transfusion Centre",
    address: "Delhi Cantonment",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110010",
    phone: "25681883, 9313341700",
    email: "info@aftc.gov.in",
    website: null,
    capacity: 1409
  },
  {
    name: "AIIMS Cardio-Neuro Centre",
    address: "Ansari Nagar, Ring Road",
    city: "New Delhi",
    state: "Delhi", 
    zipCode: "110029",
    phone: "26593625, 26594831, 26588700, 9810131836",
    email: "info@aiims.edu",
    website: "www.aiims.edu",
    capacity: 1204
  },
  {
    name: "Ram Manohar Lohia Hospital",
    address: "Baba Kharak Singh Marg",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110001",
    phone: "23404291, 9810626226",
    email: "info@rmlh.nic.in", 
    website: null,
    capacity: 768
  },
  {
    name: "ESI Hospital",
    address: "Basai Darapur",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110015",
    phone: "25174843, 9811158040",
    email: "info@esic.nic.in",
    website: null,
    capacity: 1597
  },
  {
    name: "Northern Railway Hospital",
    address: "Basant Lane",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110001",
    phone: "23747989, 23744150, 23744170, 9810501844",
    email: "info@nrh.railnet.gov.in",
    website: null,
    capacity: 1270
  },
  {
    name: "Safdarjung Hospital",
    address: "Ansari Nagar",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110029",
    phone: "2616478, 26195060, 26168470",
    email: "info@vmmc-sjh.nic.in",
    website: null,
    capacity: 692
  },
  {
    name: "Sucheta Kriplani Hospital",
    address: "Shaheed Bhagat Singh Marg, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110001",
    phone: "23408271, 9818359888",
    email: "info@lhmc-hosp.gov.in",
    website: null,
    capacity: 982
  },
  {
    name: "Deen Dayal Upadhyay Hospital",
    address: "Hari Nagar",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110064",
    phone: "25129345 ext-511, 514, 9818145784",
    email: "info@ddu.delhi.gov.in",
    website: null,
    capacity: 1226
  },
  {
    name: "GB Pant Hospital",
    address: "1, Jawahar Lal Nehru Marg",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110002",
    phone: "23234242, 23235059, 23232011, 9891511151, 9718599003",
    email: "info@gbpant.delhi.gov.in",
    website: null,
    capacity: 756
  },
  {
    name: "Guru Tegh Bahadur Hospital",
    address: "Shahdara",
    city: "Delhi",
    state: "Delhi",
    zipCode: "110095",
    phone: "22130973, 20515815",
    email: "info@gtbh.delhi.gov.in",
    website: null,
    capacity: 1227
  },
  {
    name: "Lok Nayak Hospital",
    address: "1, Jawahar Lal Nehru Marg",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110002",
    phone: "23231023, 9868998933",
    email: "info@lnjp.delhi.gov.in",
    website: null,
    capacity: 737
  }
];

async function main() {
  for (const hospital of hospitals) {
    await prisma.hospital.create({
      data: hospital
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
