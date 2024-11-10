const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seed = async () => {
  try {
    const donations = await prisma.donation.createMany({
      data: [
        { userId: 1, donationDate: new Date('2024-10-01'), donationType: 'Blood', amount: 500, location: 'Hospital A', status: 'successful', bloodType: 'O+', campaign: 'Campaign A' },
        { userId: 2, donationDate: new Date('2024-10-05'), donationType: 'Plasma', amount: 600, location: 'Hospital B', status: 'successful', bloodType: 'A-', campaign: 'Campaign B' },
        { userId: 3, donationDate: new Date('2024-10-10'), donationType: 'Blood', amount: 500, location: 'Hospital C', status: 'successful', bloodType: 'B+', campaign: 'Campaign C' },
        { userId: 4, donationDate: new Date('2024-10-12'), donationType: 'Plasma', amount: 600, location: 'Hospital D', status: 'pending', bloodType: 'AB+', campaign: 'Campaign D' },
        { userId: 5, donationDate: new Date('2024-10-14'), donationType: 'Blood', amount: 500, location: 'Hospital E', status: 'failed', bloodType: 'O-', campaign: 'Campaign E' },
        { userId: 6, donationDate: new Date('2024-10-16'), donationType: 'Plasma', amount: 600, location: 'Hospital F', status: 'successful', bloodType: 'A+', campaign: 'Campaign F' },
        { userId: 7, donationDate: new Date('2024-10-18'), donationType: 'Blood', amount: 500, location: 'Hospital G', status: 'successful', bloodType: 'B-', campaign: 'Campaign G' },
        { userId: 8, donationDate: new Date('2024-10-20'), donationType: 'Plasma', amount: 600, location: 'Hospital H', status: 'successful', bloodType: 'O+', campaign: 'Campaign H' },
        { userId: 9, donationDate: new Date('2024-10-22'), donationType: 'Blood', amount: 500, location: 'Hospital I', status: 'pending', bloodType: 'AB-', campaign: 'Campaign I' },
        { userId: 10, donationDate: new Date('2024-10-25'), donationType: 'Plasma', amount: 600, location: 'Hospital J', status: 'successful', bloodType: 'A-', campaign: 'Campaign J' },
        { userId: 11, donationDate: new Date('2024-10-30'), donationType: 'Blood', amount: 500, location: 'Hospital K', status: 'successful', bloodType: 'O+', campaign: 'Campaign K' },
        { userId: 12, donationDate: new Date('2024-11-01'), donationType: 'Plasma', amount: 600, location: 'Hospital L', status: 'successful', bloodType: 'B+', campaign: 'Campaign L' },
        { userId: 13, donationDate: new Date('2024-11-03'), donationType: 'Blood', amount: 500, location: 'Hospital M', status: 'failed', bloodType: 'A-', campaign: 'Campaign M' },
        { userId: 14, donationDate: new Date('2024-11-05'), donationType: 'Plasma', amount: 600, location: 'Hospital N', status: 'successful', bloodType: 'AB+', campaign: 'Campaign N' },
        { userId: 15, donationDate: new Date('2024-11-08'), donationType: 'Blood', amount: 500, location: 'Hospital O', status: 'pending', bloodType: 'B-', campaign: 'Campaign O' },
        { userId: 16, donationDate: new Date('2024-11-10'), donationType: 'Plasma', amount: 600, location: 'Hospital P', status: 'successful', bloodType: 'O+', campaign: 'Campaign P' },
        { userId: 17, donationDate: new Date('2024-11-12'), donationType: 'Blood', amount: 500, location: 'Hospital Q', status: 'successful', bloodType: 'A+', campaign: 'Campaign Q' },
        { userId: 18, donationDate: new Date('2024-11-15'), donationType: 'Plasma', amount: 600, location: 'Hospital R', status: 'successful', bloodType: 'AB-', campaign: 'Campaign R' },
        { userId: 19, donationDate: new Date('2024-11-18'), donationType: 'Blood', amount: 500, location: 'Hospital S', status: 'pending', bloodType: 'O-', campaign: 'Campaign S' },
        { userId: 20, donationDate: new Date('2024-11-20'), donationType: 'Plasma', amount: 600, location: 'Hospital T', status: 'successful', bloodType: 'B+', campaign: 'Campaign T' }
      ],
    });

    console.log('Donation records created successfully!');
  } catch (error) {
    console.error('Error creating donation records:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
