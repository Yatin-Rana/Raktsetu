import React, { useState } from 'react';

const FAQCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <button
        className="flex justify-between items-center w-full text-left p-4 rounded-lg hover:bg-gray-100 transition duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 p-4 text-gray-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Anyone in good health, at least 16 or 17 years old (depending on local regulations), and weighing at least 110 pounds (50 kg) may be eligible to donate blood."
    },
    {
      question: "What are the benefits of donating blood?",
      answer: "Donating blood can save lives, help patients in need, and contribute to community health. It also provides donors with health screenings and a sense of fulfillment."
    },
    {
      question: "Is donating blood safe?",
      answer: "Yes, blood donation is very safe. All equipment used is sterile and disposed of after a single use."
    },
    {
      question: "How long does the donation process take?",
      answer: "The entire process, including registration, screening, and refreshments, typically takes about an hour. The actual blood draw usually lasts only 8-10 minutes."
    },
    {
      question: "How often can I donate blood?",
      answer: "In most countries, you can donate whole blood every 8 to 12 weeks. The frequency may vary for other types of donations like platelets or plasma."
    },
    {
      question: "Do I need to know my blood type to donate?",
      answer: "No, you don't need to know your blood type to donate. Your blood will be typed after donation."
    },
    {
      question: "Can I donate if I'm taking medication?",
      answer: "Many medications are acceptable for blood donation. However, some may require a waiting period. Consult with the blood center staff about your specific medications."
    },
    {
      question: "What should I do before donating blood?",
      answer: "Make sure to eat a healthy meal and drink plenty of water before your appointment. Avoid fatty foods and alcohol."
    },
    {
      question: "Can I exercise after donating blood?",
      answer: "It's advisable to avoid strenuous physical activity or heavy lifting for the rest of the day after donating blood."
    },
    {
      question: "What happens to my blood after donation?",
      answer: "Your donated blood is tested for safety, separated into components (red cells, plasma, platelets), and distributed to hospitals as needed."
    },
    {
      question: "Can I donate blood after receiving a COVID-19 vaccine?",
      answer: "Yes, in most cases you can donate blood after receiving a COVID-19 vaccine. There's typically no waiting period required."
    },
    {
      question: "Do I get paid for donating blood?",
      answer: "In most countries, blood donation is voluntary and unpaid to ensure the safety of the blood supply."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8">
          Blood Donation FAQs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <FAQCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
